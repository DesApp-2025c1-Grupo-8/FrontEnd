import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    setRemitos, 
    agregarRemito, 
    updateRemitoLocal, 
    deleteRemitoLocal,
    setLoading,
    setError 
} from '../redux/remitos/remitosSlice';
import RemitosService from '../services/RemitosService';

export const useRemitos = () => {
    const dispatch = useDispatch();
    const { lista: remitos, loading, error } = useSelector(state => state.remitos);
    const [localLoading, setLocalLoading] = useState(false);

    // Cargar todos los remitos
    const cargarRemitos = async () => {
        dispatch(setLoading(true));
        try {
            const result = await RemitosService.obtenerRemitos();
            if (result.error) {
                dispatch(setError(result.error));
            } else {
                dispatch(setRemitos(result.data));
            }
        } catch (error) {
            dispatch(setError(error.message));
        } finally {
            dispatch(setLoading(false));
        }
    };

    // Crear nuevo remito
    const crearRemito = async (nuevoRemito) => {
        setLocalLoading(true);
        try {
            const result = await RemitosService.crearRemito(nuevoRemito);
            if (result.error) {
                dispatch(setError(result.error));
                return { success: false, error: result.error };
            } else {
                dispatch(agregarRemito(result.data));
                return { success: true, data: result.data };
            }
        } catch (error) {
            dispatch(setError(error.message));
            return { success: false, error: error.message };
        } finally {
            setLocalLoading(false);
        }
    };

    // Actualizar remito
    const actualizarRemito = async (numeroRemito, remitoActualizado) => {
        setLocalLoading(true);
        try {
            const result = await RemitosService.actualizarRemito(numeroRemito, remitoActualizado);
            if (result.error) {
                dispatch(setError(result.error));
                return { success: false, error: result.error };
            } else {
                dispatch(updateRemitoLocal({ numeroRemito, remito: result.data }));
                return { success: true, data: result.data };
            }
        } catch (error) {
            dispatch(setError(error.message));
            return { success: false, error: error.message };
        } finally {
            setLocalLoading(false);
        }
    };

    // Eliminar remito
    const eliminarRemito = async (numeroRemito) => {
        setLocalLoading(true);
        try {
            const result = await RemitosService.eliminarRemito(numeroRemito);
            if (result.error) {
                dispatch(setError(result.error));
                return { success: false, error: result.error };
            } else {
                dispatch(deleteRemitoLocal(numeroRemito));
                return { success: true };
            }
        } catch (error) {
            dispatch(setError(error.message));
            return { success: false, error: error.message };
        } finally {
            setLocalLoading(false);
        }
    };

    // Obtener remito por número
    const obtenerRemitoPorNumero = async (numeroRemito) => {
        try {
            const result = await RemitosService.obtenerRemitoPorNumero(numeroRemito);
            if (result.error) {
                return { success: false, error: result.error };
            } else {
                return { success: true, data: result.data };
            }
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // Buscar remitos con filtros
    const buscarRemitos = async (filtros) => {
        setLocalLoading(true);
        try {
            const result = await RemitosService.buscarRemitos(filtros);
            if (result.error) {
                dispatch(setError(result.error));
                return { success: false, error: result.error };
            } else {
                dispatch(setRemitos(result.data));
                return { success: true, data: result.data };
            }
        } catch (error) {
            dispatch(setError(error.message));
            return { success: false, error: error.message };
        } finally {
            setLocalLoading(false);
        }
    };

    // Descargar remito
    const descargarRemito = async (numeroRemito) => {
        try {
            const result = await RemitosService.descargarRemito(numeroRemito);
            if (result.error) {
                return { success: false, error: result.error };
            } else {
                // Crear blob y descargar
                const blob = new Blob([result.data], { type: 'application/pdf' });
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `remito-${numeroRemito}.pdf`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
                return { success: true };
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
        remitos,
        loading: loading || localLoading,
        error,
        cargarRemitos,
        crearRemito,
        actualizarRemito,
        eliminarRemito,
        obtenerRemitoPorNumero,
        buscarRemitos,
        descargarRemito,
        limpiarError
    };
}; 