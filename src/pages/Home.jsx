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

        </Container>
    )
}

export default Home