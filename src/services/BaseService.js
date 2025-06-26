import WebAPI from './config/WebAPI.js';

class BaseService {
    // Ejemplo de uso básico de llamada simple a BE
    async getRandom() {
        try {
            const response = await WebAPI.Instance().get('/testingCommonFunctions');
            //throw new Error('Simulando un error en el backend');
            return { data: response.data, error: null };
        } catch (error) {
            return {
                data: null,
                error: error.response?.data || error.message
            };
        }
    }
    async generarReporteVolumen(requestBody) {
        try {
            //http://localhost:5000/Reportes/Volumen?saveDoc=false
            const response = await WebAPI.Instance().post(
                '/Reportes/Volumen?saveDoc=false', // Endpoint del backend
                requestBody,
                { responseType: 'blob' } // 👈 para que Axios no intente parsear como JSON
            );

            // Extraer nombre del archivo desde el header
            let fileName = 'Reporte.pdf';
            const contentDisposition = response.headers['content-disposition'];

            if (contentDisposition && contentDisposition.includes('filename=')) {
                const match = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
                if (match && match[1]) {
                    fileName = match[1].replace(/['"]/g, '');
                }
            }

            //// Enlace temporal para descargar
            //const url = window.URL.createObjectURL(response.data);
            //const link = document.createElement('a');
            //link.href = url;
            //link.download = fileName;
            //link.click();
            //window.URL.revokeObjectURL(url);

            // Abrir en una nueva pestaña
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const blobUrl = URL.createObjectURL(blob);
            window.open(blobUrl, '_blank');

            return { data: null, error: null }; // no devolvemos el archivo, lo mostramos
        } catch (error) {
            return {
                data: null,
                error: error.response?.data || error.message
            };
        }
    }


}
export default new BaseService();// Instancia única de la clase BaseService (Singleton)
