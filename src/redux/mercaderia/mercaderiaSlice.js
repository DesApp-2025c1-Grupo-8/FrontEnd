import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lista: [],
  seleccionado: null,
};

const mercaderiaSlice = createSlice({
  name: 'mercaderia',
  initialState,
  reducers: {
    agregarItem(state, action) {
      state.lista.push(action.payload);
    },
    eliminarItem(state, action) {
      state.lista = state.lista.filter(m => m.id !== action.payload);
    },
    seleccionarItem(state, action) {
      state.seleccionado = action.payload;
    },
    limpiarSeleccion(state) {
      state.seleccionado = null;
    },
  },
});

export const {
  agregarItem,
  eliminarItem,
  seleccionarItem,
  limpiarSeleccion,
} = mercaderiaSlice.actions;

export const selectMercaderia = (state) => state.mercaderia.lista;

export default mercaderiaSlice.reducer;
