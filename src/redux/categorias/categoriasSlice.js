import { createSlice } from '@reduxjs/toolkit';

const PALETA_COLORES = [
  '#1976d2', // Azul
  '#43a047', // Verde
  '#e53935', // Rojo
  '#ff9800', // Naranja
  '#607d8b', // Gris
  '#8e24aa', // Violeta
  '#00897b', // Verde agua
  '#fbc02d', // Amarillo
];

const datosCategorias = Array.from({ length: 47 }, (_, i) => ({
    id: (i + 1).toString().padStart(3, '0'),
    nombre: `Categoría ${i + 1}`,
    descripcion: `Desc ${i + 1}`,
    estado: 'Activo',
    color: PALETA_COLORES[i % PALETA_COLORES.length], // Color único por categoría
  }));


const initialState = {
  categorias: datosCategorias,
};

const categoriasSlice = createSlice({
  name: 'categorias',
  initialState,
  reducers: {
    borrarCategoria(state, {payload:id}) {  
      state.categorias = state.categorias.filter(c => c.id !== id);    },
    editarCategoria(state, {payload: categoriaActualizada}) {
      const index = state.categorias.findIndex(c => c.id === categoriaActualizada.id);
      if (index !== -1) {
        state.categorias[index] = categoriaActualizada;
      }
    },
    agregarCategoria(state, {payload: nuevaCategoria}) {
      // Generar un ID único automáticamente
      const maxId = state.categorias.reduce((max, c) => Math.max(max, parseInt(c.id, 10) || 0), 0);
      const id = (maxId + 1).toString().padStart(3, '0');
      state.categorias.push({ ...nuevaCategoria, id });
    },
  },
});

export const {
    borrarCategoria,
    editarCategoria,
    agregarCategoria
} = categoriasSlice.actions;

export const selectCategorias = (state) => state.categorias.categorias;

export default categoriasSlice.reducer;
