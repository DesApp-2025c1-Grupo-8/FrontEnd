import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    setCategorias, 
    addCategoria, 
    updateCategoriaLocal, 
    deleteCategoriaLocal,
    setLoading,
    setError 
} from '../redux/categorias/categoriasSlice';
import categoriasService from '../services/CategoriasService';

export const useCategorias = () => {
    const dispatch = useDispatch();
    const { categorias, loading, error } = useSelector(state => state.categorias);
    const [localLoading, setLocalLoading] = useState(false);

    // Cargar todas las categorías
    const cargarCategorias = async () => {
        dispatch(setLoading(true));
        try {
            const result = await categoriasService.obtenerCategorias();
            if (result.error) {
                dispatch(setError(result.error));
            } else {
                dispatch(setCategorias(result.data));
            }
        } catch (error) {
            dispatch(setError(error.message));
        } finally {
            dispatch(setLoading(false));
        }
    };

    // Crear nueva categoría
    const crearCategoria = async (nuevaCategoria) => {
        setLocalLoading(true);
        try {
            const result = await categoriasService.crearCategoria(nuevaCategoria);
            if (result.error) {
                dispatch(setError(result.error));
                return { success: false, error: result.error };
            } else {
                dispatch(addCategoria(result.data));
                return { success: true, data: result.data };
            }
        } catch (error) {
            dispatch(setError(error.message));
            return { success: false, error: error.message };
        } finally {
            setLocalLoading(false);
        }
    };

    // Actualizar categoría
    const actualizarCategoria = async (id, categoriaActualizada) => {
        setLocalLoading(true);
        try {
            const result = await categoriasService.actualizarCategoria(id, categoriaActualizada);
            if (result.error) {
                dispatch(setError(result.error));
                return { success: false, error: result.error };
            } else {
                dispatch(updateCategoriaLocal({ id, categoria: result.data }));
                return { success: true, data: result.data };
            }
        } catch (error) {
            dispatch(setError(error.message));
            return { success: false, error: error.message };
        } finally {
            setLocalLoading(false);
        }
    };

    // Eliminar categoría
    const eliminarCategoria = async (id) => {
        setLocalLoading(true);
        try {
            const result = await categoriasService.eliminarCategoria(id);
            if (result.error) {
                dispatch(setError(result.error));
                return { success: false, error: result.error };
            } else {
                dispatch(deleteCategoriaLocal(id));
                return { success: true };
            }
        } catch (error) {
            dispatch(setError(error.message));
            return { success: false, error: error.message };
        } finally {
            setLocalLoading(false);
        }
    };

    // Obtener categoría por ID
    const obtenerCategoriaPorId = async (id) => {
        try {
            const result = await categoriasService.obtenerCategoriaPorId(id);
            if (result.error) {
                return { success: false, error: result.error };
            } else {
                return { success: true, data: result.data };
            }
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // Limpiar errores
    const limpiarError = () => {
        dispatch(setError(null));
    };

    return {
        categorias,
        loading: loading || localLoading,
        error,
        cargarCategorias,
        crearCategoria,
        actualizarCategoria,
        eliminarCategoria,
        obtenerCategoriaPorId,
        limpiarError
    };
}; 