
import { createSlice } from '@reduxjs/toolkit';

const datosCategorias = Array.from({ length: 47 }, (_, i) => ({
    id: (i + 1).toString().padStart(3, '0'),
    nombre: `Categoría ${i + 1}`,
    descripcion: `Desc ${i + 1}`,
    estado: 'Activo',
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
  },
});

export const {
    borrarCategoria

} = categoriasSlice.actions;

export const selectCategorias = (state) => state.categorias.categorias;

export default categoriasSlice.reducer;
