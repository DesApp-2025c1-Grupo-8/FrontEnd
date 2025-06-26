class VariosServcice {
    // Ejemplo de uso b�sico de llamada simple a BE
    async listaReportes() {
        const initialState = {
            lista: [
                {
                    id: '0OA1D6',
                    tipo: 'Volumen total de mercader�a por cliente/per�odo',
                    fecha: '19-04-2025',
                    parametros: 'Unilever de Argentina S.A. -- 03-2025',
                },
                {
                    id: '0OA1D5',
                    tipo: 'Distribuci�n geogr�fica de or�genes y destinos',
                    fecha: '17-04-2025',
                    parametros: 'Global',
                },
                {
                    id: '0OA1D4',
                    tipo: 'An�lisis de valor declarado por tipo de mercader�a',
                    fecha: '10-03-2025',
                    parametros: 'Automotriz',
                },
                {
                    id: '0OA1D3',
                    tipo: 'An�lisis de valor declarado por tipo de mercader�a',
                    fecha: '10-03-2025',
                    parametros: 'Retail',
                },
                {
                    id: '0OA1D2',
                    tipo: 'An�lisis de valor declarado por tipo de mercader�a',
                    fecha: '10-03-2025',
                    parametros: 'Tecnolog�a',
                },
            ],
        };
        return initialState;
    }

}
export default new VariosServcice();// Instancia �nica de la clase BaseService (Singleton)