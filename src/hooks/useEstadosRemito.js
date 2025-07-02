import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    setEstados, 
    addEstado, 
    updateEstado, 
    deleteEstado,
    setLoading,
    setError 
} from '../redux/estadosRemito/estadosRemitoSlice';
import estadosRemitoService from '../services/EstadosRemitoService';

export const useEstadosRemito = () => {
    const dispatch = useDispatch();
    const { lista: estados, loading, error } = useSelector(state => state.estadosRemito);
    const [localLoading, setLocalLoading] = useState(false);

    // Cargar todos los estados
    const cargarEstados = async () => {
        dispatch(setLoading(true));
        try {
            const result = await estadosRemitoService.obtenerEstados();
            if (result.error) {
                dispatch(setError(result.error));
            } else {
                dispatch(setEstados(result.data));
            }
        } catch (error) {
            dispatch(setError(error.message));
        } finally {
            dispatch(setLoading(false));
        }
    };

    // Crear nuevo estado
    const crearEstado = async (nuevoEstado) => {
        setLocalLoading(true);
        try {
            const result = await estadosRemitoService.crearEstado(nuevoEstado);
            if (result.error) {
                dispatch(setError(result.error));
                return { success: false, error: result.error };
            } else {
                dispatch(addEstado(result.data));
                return { success: true, data: result.data };
            }
        } catch (error) {
            dispatch(setError(error.message));
            return { success: false, error: error.message };
        } finally {
            setLocalLoading(false);
        }
    };

    // Actualizar estado
    const actualizarEstado = async (id, estadoActualizado) => {
        setLocalLoading(true);
        try {
            const result = await estadosRemitoService.actualizarEstado(id, estadoActualizado);
            if (result.error) {
                dispatch(setError(result.error));
                return { success: false, error: result.error };
            } else {
                dispatch(updateEstado({ id, estado: result.data }));
                return { success: true, data: result.data };
            }
        } catch (error) {
            dispatch(setError(error.message));
            return { success: false, error: error.message };
        } finally {
            setLocalLoading(false);
        }
    };

    // Eliminar estado
    const eliminarEstado = async (id) => {
        setLocalLoading(true);
        try {
            const result = await estadosRemitoService.eliminarEstado(id);
            if (result.error) {
                dispatch(setError(result.error));
                return { success: false, error: result.error };
            } else {
                dispatch(deleteEstado(id));
                return { success: true };
            }
        } catch (error) {
            dispatch(setError(error.message));
            return { success: false, error: error.message };
        } finally {
            setLocalLoading(false);
        }
    };

    // Obtener estado por ID
    const obtenerEstadoPorId = async (id) => {
        try {
            const result = await estadosRemitoService.obtenerEstadoPorId(id);
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
        estados,
        loading: loading || localLoading,
        error,
        cargarEstados,
        crearEstado,
        actualizarEstado,
        eliminarEstado,
        obtenerEstadoPorId,
        limpiarError
    };
}; 