import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const buscarDirecciones = createAsyncThunk("direccion/buscarDirecciones", async (query, { rejectWithValue }) => {
  try {
    const timestamp = new Date().getTime()
    const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=40&countrycodes=ar&q=${encodeURIComponent(
      query,
    )}&_=${timestamp}`

    const response = await fetch(url, {
      headers: {
        "Accept-Language": "es"
      },
    })

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`)
    }

    const data = await response.json()

    // Filtramos resultados más relevantes
    return data.filter((item) =>
      ["highway", "place", "building", "residential", "house", "address"].includes(item.class),
    )
  } catch (error) {
    console.error("Error al buscar direcciones:", error)
    return rejectWithValue(error.message)
  }
})

const direccionesSlice = createSlice({
  name: "direccion",
  initialState: {
    sugerencias: [],
    estado: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    limpiarSugerencias: (state) => {
      state.sugerencias = []
      state.estado = "idle"
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(buscarDirecciones.pending, (state) => {
        state.estado = "loading"
        state.error = null
      })
      .addCase(buscarDirecciones.fulfilled, (state, action) => {
        state.estado = "succeeded"
        state.sugerencias = action.payload
      })
      .addCase(buscarDirecciones.rejected, (state, action) => {
        state.estado = "failed"
        state.error = action.payload || action.error.message
        state.sugerencias = []
      })
  },
})

export const { limpiarSugerencias } = direccionesSlice.actions
export default direccionesSlice.reducer
