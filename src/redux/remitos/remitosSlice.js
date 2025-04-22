import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lista: [],
  seleccionado: null,
};

const remitosSlice = createSlice({
  name: 'remitos',
  initialState,
  reducers: {
    agregarRemito(state, action) {
      state.lista.push(action.payload);
    },
    eliminarRemito(state, action) {
      state.lista = state.lista.filter(r => r.id !== action.payload);
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
  agregarRemito,
  eliminarRemito,
  seleccionarRemito,
  limpiarSeleccion,
} = remitosSlice.actions;

export const selectRemitos = (state) => state.remitos.lista;

export default remitosSlice.reducer;
