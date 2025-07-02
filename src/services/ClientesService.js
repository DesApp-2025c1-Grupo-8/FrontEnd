import WebAPI from './config/WebAPI.js';

class ClientesService {
    // Obtener todos los clientes
    static async obtenerClientes() {
        try {
            const response = await WebAPI.Instance().get('/Cliente/All');
            return { data: response.data, error: null };
        } catch (error) {
            console.error('Error al obtener clientes:', error);
            return {
                data: null,
                error: error.response?.data || error.message
            };
        }
    }

    // Obtener un cliente por IUC
    static async obtenerClientePorIUC(iuc) {
        try {
            const response = await WebAPI.Instance().get(`/Cliente/ObtenerCliente/${iuc}`);
            return { data: response.data, error: null };
        } catch (error) {
            console.error('Error al obtener cliente por IUC:', error);
            return {
                data: null,
                error: error.response?.data || error.message
            };
        }
    }

    // Crear nuevo cliente
    static async crearCliente(cliente) {
        try {
            const response = await WebAPI.Instance().post('/Cliente/CrearCliente', cliente);
            return { data: response.data, error: null };
        } catch (error) {
            console.error('Error al crear cliente:', error);
            return {
                data: null,
                error: error.response?.data || error.message
            };
        }
    }

    // Actualizar cliente
    static async actualizarCliente(iuc, cliente) {
        try {
            const response = await WebAPI.Instance().put(`/Cliente/ActualizarCliente/${iuc}`, cliente);
            return { data: response.data, error: null };
        } catch (error) {
            console.error('Error al actualizar cliente:', error);
            return {
                data: null,
                error: error.response?.data || error.message
            };
        }
    }

    // Eliminar cliente
    static async eliminarCliente(iuc) {
        try {
            const response = await WebAPI.Instance().delete(`/Cliente/EliminarCliente/${iuc}`);
            return { data: response.data, error: null };
        } catch (error) {
            console.error('Error al eliminar cliente:', error);
            return {
                data: null,
                error: error.response?.data || error.message
            };
        }
    }
}

export default ClientesService; 