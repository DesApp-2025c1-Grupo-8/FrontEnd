import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lista: [],
  seleccionado: null,
  loading: false,
  error: null,
};

const clientesSlice = createSlice({
  name: "clientes",
  initialState,
  reducers: {
    setClientes(state, action) {
      state.lista = action.payload || [];
    },
    agregarCliente(state, action) {
      state.lista.push(action.payload);
    },
    updateClienteLocal(state, action) {
      const { iuc, cliente } = action.payload;
      const idx = state.lista.findIndex((c) => c.IUC === iuc);
      if (idx !== -1) state.lista[idx] = cliente;
    },
    deleteClienteLocal(state, action) {
      state.lista = state.lista.filter((c) => c.IUC !== action.payload);
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
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
  updateClienteLocal,
  deleteClienteLocal,
  setLoading,
  setError,
  seleccionarCliente,
  limpiarSeleccion,
} = clientesSlice.actions;

export const selectClientes = (state) => state.clientes.lista;
export const selectClientesLoading = (state) => state.clientes.loading;
export const selectClientesError = (state) => state.clientes.error;

export default clientesSlice.reducer;
