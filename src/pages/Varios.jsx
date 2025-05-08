import React, { useState } from 'react';

import TableVarios from '../components/tableVarios';
import Titulo from '../components/Titulo';

import { useDispatch, useSelector } from 'react-redux';
import { selectCategorias, borrarCategoria } from '../redux/categorias/categoriasSlice';


// Datos simulados para estados de remito
const datosEstados = [
  { id: '001', nombre: 'Autorizado', descripcion: 'Mtlur', estado: 'Activo' },
  { id: '002', nombre: 'En preparación', descripcion: 'Autom', estado: 'Activo' },
  { id: '003', nombre: 'En carga', descripcion: 'Rtail', estado: 'Activo' },
  { id: '004', nombre: 'En camino', descripcion: 'Tecno', estado: 'Activo' },
  { id: '005', nombre: 'No entregado', descripcion: 'Farma', estado: 'Activo' },
  { id: '006', nombre: 'Entregado', descripcion: 'Papél', estado: 'Activo' },
];

function Varios() {
  // Estado para categorías
  const [cantidadCat, setCantidadCat] = useState(10);
  const [paginaCat, setPaginaCat] = useState(1);
  const inicioCat = (paginaCat - 1) * cantidadCat;
  const finCat = inicioCat + cantidadCat;
  
  const categorias = useSelector(selectCategorias)

  const totalPagesCat = Math.ceil(categorias.length / cantidadCat);
  const datosPaginaCat = categorias.slice(inicioCat, finCat)

  // Estado para estados de remito

  const [cantidadEst, setCantidadEst] = useState(10);
  const [paginaEst, setPaginaEst] = useState(1);
  const inicioEst = (paginaEst - 1) * cantidadEst;
  const finEst = inicioEst + cantidadEst;
  const datosPaginaEst = datosEstados.slice(inicioEst, finEst);
  const totalPagesEst = Math.ceil(datosEstados.length / cantidadEst);



  const dispatch = useDispatch() //acciones en slice

  const handleEdit = (item) => {alert(item.id)}
  const handleDelete = (item) => {
    //se abre modal de confimacion pasando el item
    const confirm = window.confirm("¿Está seguro de querer eliminar este item?")
    if (confirm) {
      confirmDelete(item)
    }
  }
  const confirmDelete = (item) => {
    // se confima que sea eliminado
    dispatch(borrarCategoria(item.id))
  }
  const handleSearch = (item) => {alert("Hola")}


  return (
    <div>
      <Titulo>Categorías de mercadería</Titulo>
      <section>
        
        <TableVarios datos={datosPaginaCat} onSearch={handleSearch} onEdit={handleEdit} onDelete={handleDelete} />
        
      </section>

      <Titulo>Estados de remito</Titulo>
      <section>
        <TableVarios datos={datosPaginaEst} onSearch={handleSearch} onEdit={handleEdit} onDelete={handleDelete} />
        
      </section>
    </div>
  );
}

export default Varios;