import BaseService from '../services/BaseService.js';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useState } from 'react';

function Home() {
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [dataResponse, setDataResponse] = useState('');

    const getRandom = async () => {
        setLoading(true);
        // Consumo el servicio, obtengo datos sin saber como lo resuelve
        // Bajo acoplamiento que me permite cambiar la implementación del servicio sin afectar a la UI
        const { data, error } = await BaseService.getRandom();

        if (error) {
            setDataResponse('');
            setErrorMsg(error);
            console.error('Error del backend:', error);
        } else {
            setDataResponse(data);
            setErrorMsg('');
            console.log('Respuesta:', data);
        }

        setLoading(false);
    }

    const [reportLoading, setReportLoading] = useState(false);
    const [errorMsgReport, setErrorMsgReport] = useState('');
    const [dataResponseReport, setDataResponseReport] = useState('');

    const handlerGenerarReporte = async () => {
        setReportLoading(true);
        setErrorMsgReport('');
        setDataResponseReport('');

        const request = {
            fechaInicio: "2024-01-01",
            fechaFin: "2024-12-31",
            categoriasIDs: [1, 2],  // IDs de categorías reales
            clientesIDs: [10, 20]   // IDs de clientes reales
        };

        const { error } = await BaseService.generarReporteVolumen(request);

        if (error) {
            setErrorMsgReport("No se pudo generar el reporte: " + error);
            console.error("Error del backend:", error);
        } else {
            setDataResponseReport("Reporte generado exitosamente.");
        }

        setReportLoading(false);
    };

    return (
        <Container>
            <div>Home</div>
            <Button
                variant="contained"
                color="primary"
                onClick={getRandom}
                disabled={loading}
            >
                {loading ? 'Cargando...' : 'Pedir Random'}
            </Button>
            {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
            {dataResponse && <p style={{ color: 'green' }}>{dataResponse}</p>}
            <br />
            <br />
            <Button
                variant="contained"
                color="secondary"
                onClick={handlerGenerarReporte}
                disabled={reportLoading}
            >
                {reportLoading ? 'Generando Reporte...' : 'Generar Reporte Volumen'}
            </Button>
            {errorMsgReport && <p style={{ color: 'red' }}>{errorMsgReport}</p>}
            {dataResponseReport && <p style={{ color: 'green' }}>Reporte Generado exitosamente</p>}

        </Container>
    )
}

export default Home