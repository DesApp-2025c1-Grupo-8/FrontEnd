import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lista: [
    {
      id: "0001",
      pais: "Argentina",
      provincia: "Buenos Aires",
      municipio: "Hurlingham",
      localidad: "Hurlingham",
      codigo_postal: "0135",
      calle: "Avenida Gobernador Vergara",
      altura: "1234",
    },
    {
      id: "0002",
      pais: "Argentina",
      "provincia": "Buenos Aires",
      municipio: "Hurlingham",
      localidad: "Hurlingham",
      codigo_postal: "0135",
      calle: "Avenida Roca",
      altura: "2531",
    },
    {
      id: "0003",
      pais: "Argentina",
      "provincia": "Buenos Aires",
      municipio: "Hurlingham",
      localidad: "Hurlingham",
      codigo_postal: "0135",
      calle: "Avenida Gobernador Vergara",
      altura: "7534",
    },
    {
      id: "0004",
      pais: "Argentina",
      "provincia": "Buenos Aires",
      municipio: "Hurlingham",
      localidad: "Hurlingham",
      codigo_postal: "0135",
      calle: "Avenida Jauretche",
      altura: "456",
    },
    {
      id: "0005",
      pais: "Argentina",
      "provincia": "Buenos Aires",
      municipio: "Hurlingham",
      localidad: "Hurlingham",
      codigo_postal: "0135",
      calle: "Bustamante",
      altura: "1696",
    },
    {
      id: "0006",
      pais: "Argentina",
      "provincia": "Buenos Aires",
      municipio: "Hurlingham",
      localidad: "Hurlingham",
      codigo_postal: "0135",
      calle: "Argerich",
      altura: "976",
    },
    {
      id: "0007",
      pais: "Argentina",
      "provincia": "Buenos Aires",
      municipio: "Hurlingham",
      localidad: "Hurlingham",
      codigo_postal: "0135",
      calle: "Ricchieri",
      altura: "1616",
    },
  ],
  seleccionado: null,
};

const destinosSlice = createSlice({
  name: "destinos",
  initialState,
  reducers: {
    agregarDestino(state, action) {
      state.lista.push(action.payload);
    },
    eliminarDestino(state, action) {
      state.lista = state.lista.filter((d) => d.id !== action.payload);
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
