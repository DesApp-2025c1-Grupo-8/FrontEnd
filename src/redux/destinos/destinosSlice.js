import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lista: [],
  seleccionado: null,
};

const destinosSlice = createSlice({
  name: 'destinos',
  initialState,
  reducers: {
    agregarDestino(state, action) {
      state.lista.push(action.payload);
    },
    eliminarDestino(state, action) {
      state.lista = state.lista.filter(d => d.id !== action.payload);
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
  agregarDestino,
  eliminarDestino,
  seleccionarDestino,
  limpiarSeleccion,
} = destinosSlice.actions;

export const selectDestinos = (state) => state.destinos.lista;

export default destinosSlice.reducer;
