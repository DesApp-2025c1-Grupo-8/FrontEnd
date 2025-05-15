import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lista: [
    {
      IUC: "0OA1D6",
      razonSocial: "Metalúrgica del Oeste S.A.",
      "CUIT/RUT": "20-12345678-9",
      tipo: "Estatal",
      direccion: "Av. Libertador 1234",
      telefono: "011-1234-5678",
      email: "uK2m0@example.com",
    },
    {
      IUC: "0OA1D5",
      razonSocial: "Distribuidora Norte S.A.",
      "CUIT/RUT": "20-23456789-0",
      tipo: "Privado",
      direccion: "Av. Libertador 2345",
      telefono: "011-2345-6789",
      email: "aGx0R@example.com",
    },
    {
      IUC: "0OA1D4",
      razonSocial: "Comercializadora Sur S.A.",
      "CUIT/RUT": "20-34567890-1",
      tipo: "Particular",
      direccion: "Av. Libertador 3456",
      telefono: "011-3456-7890",
      email: "fDm0U@example.com",
    },
    {
      IUC: "0OA1D3",
      razonSocial: "Industria Metalúrgica S.A.",
      "CUIT/RUT": "20-45678901-2",
      tipo: "Privado",
      direccion: "Av. Libertador 4567",
      telefono: "011-4567-8901",
      email: "8kVt5@example.com",
    },
    {
      IUC: "0OA1D2",
      razonSocial: "Comercializadora Central S.A.",
      "CUIT/RUT": "20-56789012-3",
      tipo: "Privado",
      direccion: "Av. Libertador 5678",
      telefono: "011-5678-9012",
      email: "7TQ0B@example.com",
    },
    {
      IUC: "0OA1D1",
      razonSocial: "Distribuidora del Sur S.A.",
      "CUIT/RUT": "20-67890123-4",
      tipo: "Estatal",
      direccion: "Av. Libertador 6789",
      telefono: "011-6789-0123",
      email: "mV9tD@example.com",
    },
  ],

  seleccionado: null,
};

const clientesSlice = createSlice({
  name: "clientes",
  initialState,
  reducers: {
    setClientes(state, action) {
      state.lista = action.payload;
    },
    agregarCliente(state, action) {
      state.lista.push(action.payload);
    },
    eliminarCliente(state, action) {
      state.lista = state.lista.filter((c) => c.IUC !== action.payload);
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
