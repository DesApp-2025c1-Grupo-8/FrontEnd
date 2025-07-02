import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import categoriasService from '../../services/CategoriasService.js';

// Async thunks para conectar con el backend
export const fetchCategorias = createAsyncThunk(
  'categorias/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      console.log('🔄 Intentando cargar categorías del backend...');
      const result = await categoriasService.obtenerCategorias();
      if (result.error) {
        throw new Error(result.error);
      }
      console.log('✅ Categorías cargadas del backend:', result.data);
      return result.data;
    } catch (error) {
      console.error('❌ Error al cargar categorías del backend:', error);
      return rejectWithValue(error.message || 'Error al cargar categorías');
    }
  }
);

export const createCategoria = createAsyncThunk(
  'categorias/create',
  async (categoria, { rejectWithValue }) => {
    try {
      const result = await categoriasService.crearCategoria(categoria);
      if (result.error) {
        throw new Error(result.error);
      }
      return result.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Error al crear categoría');
    }
  }
);

export const updateCategoria = createAsyncThunk(
  'categorias/update',
  async ({ id, categoria }, { rejectWithValue }) => {
    try {
      const result = await categoriasService.actualizarCategoria(id, categoria);
      if (result.error) {
        throw new Error(result.error);
      }
      return result.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Error al actualizar categoría');
    }
  }
);

export const deleteCategoria = createAsyncThunk(
  'categorias/delete',
  async (id, { rejectWithValue }) => {
    try {
      const result = await categoriasService.eliminarCategoria(id);
      if (result.error) {
        throw new Error(result.error);
      }
      return id;
    } catch (error) {
      return rejectWithValue(error.message || 'Error al eliminar categoría');
    }
  }
);

const initialState = {
  categorias: [], // Sin datos de fallback
  loading: false,
  error: null,
  selectedCategoria: null
};

const categoriasSlice = createSlice({
  name: 'categorias',
  initialState,
  reducers: {
    setSelectedCategoria: (state, action) => {
      state.selectedCategoria = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    // Acciones para compatibilidad con hooks
    setCategorias: (state, action) => {
      state.categorias = action.payload;
    },
    addCategoria: (state, action) => {
      state.categorias.push(action.payload);
    },
    updateCategoriaLocal: (state, action) => {
      const index = state.categorias.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.categorias[index] = action.payload;
      }
    },
    deleteCategoriaLocal: (state, action) => {
      state.categorias = state.categorias.filter(c => c.id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    // Mantener acciones locales para compatibilidad
    borrarCategoria: (state, { payload: id }) => {
      state.categorias = state.categorias.filter(c => c.id !== id);
    },
    editarCategoria: (state, { payload: categoriaActualizada }) => {
      const index = state.categorias.findIndex(c => c.id === categoriaActualizada.id);
      if (index !== -1) {
        state.categorias[index] = categoriaActualizada;
      }
    },
    agregarCategoria: (state, { payload: nuevaCategoria }) => {
      // El backend asignará el ID automáticamente
      state.categorias.push(nuevaCategoria);
    },
  },
  extraReducers: (builder) => {
    // Fetch categorías
    builder
      .addCase(fetchCategorias.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategorias.fulfilled, (state, action) => {
        state.loading = false;
        state.categorias = action.payload;
      })
      .addCase(fetchCategorias.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error al cargar categorías';
      })
      // Create categoría
      .addCase(createCategoria.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategoria.fulfilled, (state, action) => {
        state.loading = false;
        state.categorias.push(action.payload);
      })
      .addCase(createCategoria.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update categoría
      .addCase(updateCategoria.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategoria.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.categorias.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
          state.categorias[index] = action.payload;
        }
      })
      .addCase(updateCategoria.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete categoría
      .addCase(deleteCategoria.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategoria.fulfilled, (state, action) => {
        state.loading = false;
        state.categorias = state.categorias.filter(c => c.id !== action.payload);
      })
      .addCase(deleteCategoria.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  borrarCategoria,
  editarCategoria,
  agregarCategoria,
  setSelectedCategoria,
  clearError,
  // Nuevas acciones para hooks
  setCategorias,
  addCategoria,
  updateCategoriaLocal,
  deleteCategoriaLocal,
  setLoading,
  setError
} = categoriasSlice.actions;

export const selectCategorias = (state) => state.categorias.categorias;
export const selectCategoriasLoading = (state) => state.categorias.loading;
export const selectCategoriasError = (state) => state.categorias.error;
export const selectSelectedCategoria = (state) => state.categorias.selectedCategoria;

export default categoriasSlice.reducer;
