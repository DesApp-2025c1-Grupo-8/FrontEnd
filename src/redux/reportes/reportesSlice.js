import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lista: [
    {
      id: '0OA1D6',
      tipo: 'Volumen total de mercadería por cliente/período',
      fecha: '19-04-2025',
      parametros: 'Unilever de Argentina S.A. -- 03-2025',
    },
    {
      id: '0OA1D5',
      tipo: 'Distribución geográfica de orígenes y destinos',
      fecha: '17-04-2025',
      parametros: 'Global',
    },
    {
      id: '0OA1D4',
      tipo: 'Análisis de valor declarado por tipo de mercadería',
      fecha: '10-03-2025',
      parametros: 'Automotriz',
    },
    {
      id: '0OA1D3',
      tipo: 'Análisis de valor declarado por tipo de mercadería',
      fecha: '10-03-2025',
      parametros: 'Retail',
    },
    {
      id: '0OA1D2',
      tipo: 'Análisis de valor declarado por tipo de mercadería',
      fecha: '10-03-2025',
      parametros: 'Tecnología',
    },
  ],
};

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
