import { createSlice } from '@reduxjs/toolkit';

// Datos de ejemplo para estados de remito
const datosEstadosRemito = [
  { 
    id: '001', 
    nombre: 'Pendiente', 
    descripcion: 'Remito creado pero aún no procesado',
    estado: 'Activo',
    color: '#ff9800' // Naranja
  },
  { 
    id: '002', 
    nombre: 'En preparación', 
    descripcion: 'Mercadería siendo preparada para envío',
    estado: 'Activo',
    color: '#1976d2' // Azul
  },
  { 
    id: '003', 
    nombre: 'En tránsito', 
    descripcion: 'Mercadería en camino al destino',
    estado: 'Activo',
    color: '#8e24aa' // Violeta
  },
  { 
    id: '004', 
    nombre: 'Entregado', 
    descripcion: 'Mercadería entregada al destinatario',
    estado: 'Activo',
    color: '#43a047' // Verde
  },
  { 
    id: '005', 
    nombre: 'Cancelado', 
    descripcion: 'Remito cancelado',
    estado: 'Activo',
    color: '#e53935' // Rojo
  }
];

const initialState = {
  lista: datosEstadosRemito,
  seleccionado: null,
  filtros: {
    estado: '',
    nombre: ''
  }
};

const estadosRemitoSlice = createSlice({
  name: 'estadosRemito',
  initialState,
  reducers: {
    agregarEstadoRemito(state, action) {
      // Si no viene color, asignar uno por defecto
      const color = action.payload.color || '#607d8b'; // Gris por defecto
      const id = action.payload.id || Date.now().toString(); // Genera ID única si no viene
      state.lista.push({ ...action.payload, id, color });
    },
    eliminarEstadoRemito(state, action) {
      state.lista = state.lista.filter(e => e.id !== action.payload);
    },
    seleccionarEstadoRemito(state, action) {
      state.seleccionado = action.payload;
    },
    limpiarSeleccion(state) {
      state.seleccionado = null;
    },
    actualizarEstadoRemito(state, action) {
      const index = state.lista.findIndex(e => e.id === action.payload.id);
      if (index !== -1) {
        // Si no viene color, mantener el anterior
        const color = action.payload.color || state.lista[index].color || '#607d8b';
        state.lista[index] = { ...state.lista[index], ...action.payload, color };
      }
    },
    setFiltros(state, action) {
      state.filtros = { ...state.filtros, ...action.payload };
    },
    limpiarFiltros(state) {
      state.filtros = initialState.filtros;
    }
  },
});

export const {
  agregarEstadoRemito,
  eliminarEstadoRemito,
  seleccionarEstadoRemito,
  limpiarSeleccion,
  actualizarEstadoRemito,
  setFiltros,
  limpiarFiltros,
} = estadosRemitoSlice.actions;

export const selectEstadosRemito = (state) => state.estadosRemito.lista;
export const selectEstadoRemitoSeleccionado = (state) => state.estadosRemito.seleccionado;
export const selectFiltros = (state) => state.estadosRemito.filtros;

export default estadosRemitoSlice.reducer; 