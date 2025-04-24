import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lista: [],
};

const reportesSlice = createSlice({
  name: 'reportes',
  initialState,
  reducers: {
    agregarReporte(state, action) {
      state.lista.push(action.payload);
    },
    limpiarReportes(state) {
      state.lista = [];
    },
  },
});

export const {
  agregarReporte,
  limpiarReportes,
} = reportesSlice.actions;

export const selectReportes = (state) => state.reportes.lista;

export default reportesSlice.reducer;
