import { createSlice } from '@reduxjs/toolkit';
import VariosService from '../../services/VariosService.js';

const initialState = VariosService.listaReportes;

const reportesSlice = createSlice({
  name: 'reportes',
  initialState,
  reducers: {
    agregarReporte(state, action) {
      state.lista.push(action.payload);
    },
    editarReporte(state, action) {
      const { id, ...resto } = action.payload;
      const idx = state.lista.findIndex(r => r.id === id);
      if (idx !== -1) {
        state.lista[idx] = { ...state.lista[idx], ...resto };
      }
    },
    eliminarReporte(state, action) {
      state.lista = state.lista.filter(r => r.id !== action.payload);
    },
    copiarReporte(state, action) {
      const reporte = state.lista.find(r => r.id === action.payload);
      if (reporte) {
        const nuevo = { ...reporte, id: Math.random().toString(36).substr(2, 8) };
        state.lista.push(nuevo);
      }
    },
    limpiarReportes(state) {
      state.lista = [];
    },
  },
});

export const {
  agregarReporte,
  editarReporte,
  eliminarReporte,
  copiarReporte,
  limpiarReportes,
} = reportesSlice.actions;

export const selectReportes = (state) => state.reportes.lista;

export default reportesSlice.reducer;
