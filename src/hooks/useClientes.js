import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    setClientes, 
    agregarCliente, 
    updateClienteLocal, 
    deleteClienteLocal,
    setLoading,
    setError 
} from '../redux/clientes/clientesSlice';
import ClientesService from '../services/ClientesService';

export const useClientes = () => {
    const dispatch = useDispatch();
    const { lista: clientes, loading, error } = useSelector(state => state.clientes);
    const [localLoading, setLocalLoading] = useState(false);

    // Cargar todos los clientes
    const cargarClientes = async () => {
        dispatch(setLoading(true));
        try {
            const result = await ClientesService.obtenerClientes();
            if (result.error) {
                dispatch(setError(result.error));
            } else {
                dispatch(setClientes(result.data));
            }
        } catch (error) {
            dispatch(setError(error.message));
        } finally {
            dispatch(setLoading(false));
        }
    };

    // Crear nuevo cliente
    const crearCliente = async (nuevoCliente) => {
        setLocalLoading(true);
        try {
            const result = await ClientesService.crearCliente(nuevoCliente);
            if (result.error) {
                dispatch(setError(result.error));
                return { success: false, error: result.error };
            } else {
                dispatch(agregarCliente(result.data));
                return { success: true, data: result.data };
            }
        } catch (error) {
            dispatch(setError(error.message));
            return { success: false, error: error.message };
        } finally {
            setLocalLoading(false);
        }
    };

    // Actualizar cliente
    const actualizarCliente = async (iuc, clienteActualizado) => {
        setLocalLoading(true);
        try {
            const result = await ClientesService.actualizarCliente(iuc, clienteActualizado);
            if (result.error) {
                dispatch(setError(result.error));
                return { success: false, error: result.error };
            } else {
                dispatch(updateClienteLocal({ iuc, cliente: result.data }));
                return { success: true, data: result.data };
            }
        } catch (error) {
            dispatch(setError(error.message));
            return { success: false, error: error.message };
        } finally {
            setLocalLoading(false);
        }
    };

    // Eliminar cliente
    const eliminarCliente = async (iuc) => {
        setLocalLoading(true);
        try {
            const result = await ClientesService.eliminarCliente(iuc);
            if (result.error) {
                dispatch(setError(result.error));
                return { success: false, error: result.error };
            } else {
                dispatch(deleteClienteLocal(iuc));
                return { success: true };
            }
        } catch (error) {
            dispatch(setError(error.message));
            return { success: false, error: error.message };
        } finally {
            setLocalLoading(false);
        }
    };

    // Obtener cliente por IUC
    const obtenerClientePorIUC = async (iuc) => {
        try {
            const result = await ClientesService.obtenerClientePorIUC(iuc);
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
        clientes,
        loading: loading || localLoading,
        error,
        cargarClientes,
        crearCliente,
        actualizarCliente,
        eliminarCliente,
        obtenerClientePorIUC,
        limpiarError
    };
}; 