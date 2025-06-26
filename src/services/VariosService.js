class VariosServcice {
    // Ejemplo de uso básico de llamada simple a BE
    async listaReportes() {
        const initialState = {
            lista: [
                {
                    id: '0OA1D6',
                    tipo: 'Volumen total de mercadería por cliente/período',
                    fecha: '19-04-2025',
                    parametros: 'Unilever de Argentina S.A. -- 03-2025',
                },
                {
                    id: '0OA1D5',
                    tipo: 'Distribución geográfica de orígenes y destinos',
                    fecha: '17-04-2025',
                    parametros: 'Global',
                },
                {
                    id: '0OA1D4',
                    tipo: 'Análisis de valor declarado por tipo de mercadería',
                    fecha: '10-03-2025',
                    parametros: 'Automotriz',
                },
                {
                    id: '0OA1D3',
                    tipo: 'Análisis de valor declarado por tipo de mercadería',
                    fecha: '10-03-2025',
                    parametros: 'Retail',
                },
                {
                    id: '0OA1D2',
                    tipo: 'Análisis de valor declarado por tipo de mercadería',
                    fecha: '10-03-2025',
                    parametros: 'Tecnología',
                },
            ],
        };
        return initialState;
    }

}
export default new VariosServcice();// Instancia única de la clase BaseService (Singleton)