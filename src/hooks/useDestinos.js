import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    setDestinos, 
    addDestino, 
    updateDestinoLocal, 
    deleteDestinoLocal,
    setLoading,
    setError 
} from '../redux/destinos/destinosSlice';
import DestinosService from '../services/DestinosService';

export const useDestinos = () => {
    const dispatch = useDispatch();
    const { lista: destinos, loading, error } = useSelector(state => state.destinos);
    const [localLoading, setLocalLoading] = useState(false);

    // Cargar todos los destinos
    const cargarDestinos = async () => {
        dispatch(setLoading(true));
        try {
            const result = await DestinosService.obtenerDestinos();
            if (result.error) {
                dispatch(setError(result.error));
            } else {
                dispatch(setDestinos(result.data));
            }
        } catch (error) {
            dispatch(setError(error.message));
        } finally {
            dispatch(setLoading(false));
        }
    };

    // Crear nuevo destino
    const crearDestino = async (nuevoDestino) => {
        setLocalLoading(true);
        try {
            const result = await DestinosService.crearDestino(nuevoDestino);
            if (result.error) {
                dispatch(setError(result.error));
                return { success: false, error: result.error };
            } else {
                dispatch(addDestino(result.data));
                return { success: true, data: result.data };
            }
        } catch (error) {
            dispatch(setError(error.message));
            return { success: false, error: error.message };
        } finally {
            setLocalLoading(false);
        }
    };

    // Actualizar destino
    const actualizarDestino = async (id, destinoActualizado) => {
        setLocalLoading(true);
        try {
            const result = await DestinosService.actualizarDestino(id, destinoActualizado);
            if (result.error) {
                dispatch(setError(result.error));
                return { success: false, error: result.error };
            } else {
                dispatch(updateDestinoLocal({ id, destino: result.data }));
                return { success: true, data: result.data };
            }
        } catch (error) {
            dispatch(setError(error.message));
            return { success: false, error: error.message };
        } finally {
            setLocalLoading(false);
        }
    };

    // Eliminar destino
    const eliminarDestino = async (id) => {
        setLocalLoading(true);
        try {
            const result = await DestinosService.eliminarDestino(id);
            if (result.error) {
                dispatch(setError(result.error));
                return { success: false, error: result.error };
            } else {
                dispatch(deleteDestinoLocal(id));
                return { success: true };
            }
        } catch (error) {
            dispatch(setError(error.message));
            return { success: false, error: error.message };
        } finally {
            setLocalLoading(false);
        }
    };

    // Obtener destino por ID
    const obtenerDestinoPorId = async (id) => {
        try {
            const result = await DestinosService.obtenerDestinoPorId(id);
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
        destinos,
        loading: loading || localLoading,
        error,
        cargarDestinos,
        crearDestino,
        actualizarDestino,
        eliminarDestino,
        obtenerDestinoPorId,
        limpiarError
    };
}; 