import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lista: [],
  seleccionado: null,
  loading: false,
  error: null,
};

const remitosSlice = createSlice({
  name: 'remitos',
  initialState,
  reducers: {
    setRemitos(state, action) {
      state.lista = action.payload || [];
    },
    agregarRemito(state, action) {
      state.lista.push(action.payload);
    },
    updateRemitoLocal(state, action) {
      const { numeroRemito, remito } = action.payload;
      const idx = state.lista.findIndex((r) => r.numeroRemito === numeroRemito);
      if (idx !== -1) state.lista[idx] = remito;
    },
    deleteRemitoLocal(state, action) {
      state.lista = state.lista.filter((r) => r.numeroRemito !== action.payload);
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    seleccionarRemito(state, action) {
      state.seleccionado = action.payload;
    },
    limpiarSeleccion(state) {
      state.seleccionado = null;
    },
  },
});

export const {
  setRemitos,
  agregarRemito,
  updateRemitoLocal,
  deleteRemitoLocal,
  setLoading,
  setError,
  seleccionarRemito,
  limpiarSeleccion,
} = remitosSlice.actions;

export const selectRemitos = (state) => state.remitos.lista;
export const selectRemitoSeleccionado = (state) => state.remitos.seleccionado;
export const selectRemitosLoading = (state) => state.remitos.loading;
export const selectRemitosError = (state) => state.remitos.error;

export default remitosSlice.reducer;
