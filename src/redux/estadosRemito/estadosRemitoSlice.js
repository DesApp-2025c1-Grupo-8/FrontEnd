import { createSlice } from '@reduxjs/toolkit';

// Datos de ejemplo para estados de remito
const datosEstadosRemito = [
  { 
    id: '001', 
    nombre: 'Pendiente', 
    descripcion: 'Remito creado pero aún no procesado',
    estado: 'Activo'
  },
  { 
    id: '002', 
    nombre: 'En preparación', 
    descripcion: 'Mercadería siendo preparada para envío',
    estado: 'Activo',

  },
  { 
    id: '003', 
    nombre: 'En tránsito', 
    descripcion: 'Mercadería en camino al destino',
    estado: 'Activo',

  },
  { 
    id: '004', 
    nombre: 'Entregado', 
    descripcion: 'Mercadería entregada al destinatario',
    estado: 'Activo',
  },
  { 
    id: '005', 
    nombre: 'Cancelado', 
    descripcion: 'Remito cancelado',
    estado: 'Activo'
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
      state.lista.push(action.payload);
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
        state.lista[index] = { ...state.lista[index], ...action.payload };
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