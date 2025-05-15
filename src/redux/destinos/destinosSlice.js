import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lista: [
    {
      id: "0001",
      Pais: "Argentina",
      "Provincia/Estado": "Buenos Aires",
      Municipio: "Hurlingham",
      Localidad: "Hurlingham",
      CodigoPostal: "0135",
      Calle: "Avenida Gobernador Vergara",
      Altura: "1234",
    },
    {
      id: "0002",
      Pais: "Argentina",
      "Provincia/Estado": "Buenos Aires",
      Municipio: "Hurlingham",
      Localidad: "Hurlingham",
      CodigoPostal: "0135",
      Calle: "Avenida Roca",
      Altura: "2531",
    },
    {
      id: "0003",
      Pais: "Argentina",
      "Provincia/Estado": "Buenos Aires",
      Municipio: "Hurlingham",
      Localidad: "Hurlingham",
      CodigoPostal: "0135",
      Calle: "Avenida Gobernador Vergara",
      Altura: "7534",
    },
    {
      id: "0004",
      Pais: "Argentina",
      "Provincia/Estado": "Buenos Aires",
      Municipio: "Hurlingham",
      Localidad: "Hurlingham",
      CodigoPostal: "0135",
      Calle: "Avenida Jauretche",
      Altura: "456",
    },
    {
      id: "0005",
      Pais: "Argentina",
      "Provincia/Estado": "Buenos Aires",
      Municipio: "Hurlingham",
      Localidad: "Hurlingham",
      CodigoPostal: "0135",
      Calle: "Bustamante",
      Altura: "1696",
    },
    {
      id: "0006",
      Pais: "Argentina",
      "Provincia/Estado": "Buenos Aires",
      Municipio: "Hurlingham",
      Localidad: "Hurlingham",
      CodigoPostal: "0135",
      Calle: "Argerich",
      Altura: "976",
    },
    {
      id: "0007",
      Pais: "Argentina",
      "Provincia/Estado": "Buenos Aires",
      Municipio: "Hurlingham",
      Localidad: "Hurlingham",
      CodigoPostal: "0135",
      Calle: "Ricchieri",
      Altura: "1616",
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
