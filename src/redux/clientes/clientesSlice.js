import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lista: [],
  seleccionado: null,
};

const clientesSlice = createSlice({
  name: 'clientes',
  initialState,
  reducers: {
    setClientes(state, action) {
      state.lista = action.payload;
    },
    agregarCliente(state, action) {
      state.lista.push(action.payload);
    },
    eliminarCliente(state, action) {
      state.lista = state.lista.filter(c => c.id !== action.payload);
    },
    seleccionarCliente(state, action) {
      state.seleccionado = action.payload;
    },
    limpiarSeleccion(state) {
      state.seleccionado = null;
    },
  },
});

export const {
  setClientes,
  agregarCliente,
  eliminarCliente,
  seleccionarCliente,
  limpiarSeleccion,
} = clientesSlice.actions;

export const selectClientes = (state) => state.clientes.lista;

export default clientesSlice.reducer;
