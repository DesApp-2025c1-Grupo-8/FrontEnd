import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lista: [],
  seleccionado: null,
  loading: false,
  error: null,
};

const destinosSlice = createSlice({
  name: "destinos",
  initialState,
  reducers: {
    setDestinos(state, action) {
      state.lista = action.payload || [];
    },
    addDestino(state, action) {
      state.lista.push(action.payload);
    },
    updateDestinoLocal(state, action) {
      const { id, destino } = action.payload;
      const idx = state.lista.findIndex((d) => d.id === id);
      if (idx !== -1) state.lista[idx] = destino;
    },
    deleteDestinoLocal(state, action) {
      state.lista = state.lista.filter((d) => d.id !== action.payload);
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    seleccionarDestino(state, action) {
      state.seleccionado = action.payload;
    },
    limpiarSeleccion(state) {
      state.seleccionado = null;
    },
  },
});

export const {
  setDestinos,
  addDestino,
  updateDestinoLocal,
  deleteDestinoLocal,
  setLoading,
  setError,
  seleccionarDestino,
  limpiarSeleccion,
} = destinosSlice.actions;

export const selectDestinos = (state) => state.destinos.lista;
export const selectDestinosLoading = (state) => state.destinos.loading;
export const selectDestinosError = (state) => state.destinos.error;

export default destinosSlice.reducer;
