import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import estadosRemitoService from '../../services/EstadosRemitoService.js';

// Async thunks para conectar con el backend
export const fetchEstadosRemito = createAsyncThunk(
  'estadosRemito/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      console.log('🔄 Intentando cargar estados de remito del backend...');
      const result = await estadosRemitoService.obtenerEstados();
      if (result.error) {
        throw new Error(result.error);
      }
      console.log('✅ Estados de remito cargados del backend:', result.data);
      return result.data;
    } catch (error) {
      console.error('❌ Error al cargar estados de remito del backend:', error);
      return rejectWithValue(error.message || 'Error al cargar estados de remito');
    }
  }
);

export const createEstadoRemito = createAsyncThunk(
  'estadosRemito/create',
  async (estadoRemito, { rejectWithValue }) => {
    try {
      const result = await estadosRemitoService.crearEstado(estadoRemito);
      if (result.error) {
        throw new Error(result.error);
      }
      return result.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Error al crear estado de remito');
    }
  }
);

export const updateEstadoRemito = createAsyncThunk(
  'estadosRemito/update',
  async ({ id, estadoRemito }, { rejectWithValue }) => {
    try {
      const result = await estadosRemitoService.actualizarEstado(id, estadoRemito);
      if (result.error) {
        throw new Error(result.error);
      }
      return result.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Error al actualizar estado de remito');
    }
  }
);

export const deleteEstadoRemito = createAsyncThunk(
  'estadosRemito/delete',
  async (id, { rejectWithValue }) => {
    try {
      const result = await estadosRemitoService.eliminarEstado(id);
      if (result.error) {
        throw new Error(result.error);
      }
      return id;
    } catch (error) {
      return rejectWithValue(error.message || 'Error al eliminar estado de remito');
    }
  }
);

const initialState = {
  lista: [], // Sin datos de fallback
  seleccionado: null,
  filtros: {
    estado: '',
    nombre: ''
  },
  loading: false,
  error: null
};

const estadosRemitoSlice = createSlice({
  name: 'estadosRemito',
  initialState,
  reducers: {
    // Acciones para compatibilidad con hooks
    setEstados: (state, action) => {
      state.lista = action.payload;
    },
    addEstado: (state, action) => {
      state.lista.push(action.payload);
    },
    updateEstado: (state, action) => {
      const index = state.lista.findIndex(e => e.id === action.payload.id);
      if (index !== -1) {
        state.lista[index] = action.payload.estado;
      }
    },
    deleteEstado: (state, action) => {
      state.lista = state.lista.filter(e => e.id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    // Mantener acciones locales para compatibilidad
    agregarEstadoRemito(state, action) {
      // El backend asignará el ID automáticamente
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
    },
    clearError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    // Fetch estados remito
    builder
      .addCase(fetchEstadosRemito.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEstadosRemito.fulfilled, (state, action) => {
        state.loading = false;
        state.lista = action.payload;
      })
      .addCase(fetchEstadosRemito.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error al cargar estados de remito';
      })
      // Create estado remito
      .addCase(createEstadoRemito.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEstadoRemito.fulfilled, (state, action) => {
        state.loading = false;
        state.lista.push(action.payload);
      })
      .addCase(createEstadoRemito.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update estado remito
      .addCase(updateEstadoRemito.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEstadoRemito.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.lista.findIndex(e => e.id === action.payload.id);
        if (index !== -1) {
          state.lista[index] = action.payload;
        }
      })
      .addCase(updateEstadoRemito.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete estado remito
      .addCase(deleteEstadoRemito.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEstadoRemito.fulfilled, (state, action) => {
        state.loading = false;
        state.lista = state.lista.filter(e => e.id !== action.payload);
      })
      .addCase(deleteEstadoRemito.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
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
  clearError,
  // Nuevas acciones para hooks
  setEstados,
  addEstado,
  updateEstado,
  deleteEstado,
  setLoading,
  setError
} = estadosRemitoSlice.actions;

export const selectEstadosRemito = (state) => state.estadosRemito.lista;
export const selectEstadoRemitoSeleccionado = (state) => state.estadosRemito.seleccionado;
export const selectFiltros = (state) => state.estadosRemito.filtros;
export const selectEstadosRemitoLoading = (state) => state.estadosRemito.loading;
export const selectEstadosRemitoError = (state) => state.estadosRemito.error;

export default estadosRemitoSlice.reducer; 