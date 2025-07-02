import React, { useState, useMemo, useEffect } from "react";
import { Box, Button, Typography, Grid, Pagination, CircularProgress, Alert } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";

import { useClientes } from "../hooks/useClientes";

import ModalCliente from "../components/ModalCliente";
import ClienteCard from "../components/ClienteCard";
import SearchBar from "../components/SearchBar";

function Clients() {
  const {
    clientes,
    loading,
    error,
    cargarClientes,
    crearCliente,
    actualizarCliente,
    eliminarCliente
  } = useClientes();

  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    cargarClientes();
  }, []);

  const handleCopy = (cliente) => {
    const clienteInfo = `${cliente.razonSocial} - ${cliente["CUIT/RUT"]} - ${cliente.IUC}`;
    navigator.clipboard
      .writeText(clienteInfo)
      .then(() => {
        alert("Información del cliente copiada al portapapeles.");
      })
      .catch((err) => {
        console.error("Error al copiar:", err);
        alert("No se pudo copiar la información.");
      });
  };

  // Eliminar cliente usando hook
  const handleDelete = async (cliente) => {
    if (window.confirm(`¿Seguro que deseas eliminar el cliente: ${cliente.razonSocial}?`)) {
      const result = await eliminarCliente(cliente.IUC);
      if (result.success) {
        console.log("Cliente eliminado exitosamente");
      } else {
        console.error("Error al eliminar cliente:", result.error);
      }
    }
  };

  const clientesFiltrados = useMemo(() => {
    if (!searchTerm) return clientes;

    const lowerSearch = searchTerm.toLowerCase();
    return clientes.filter((cliente) =>
      Object.values(cliente).some((valor) =>
        String(valor).toLowerCase().includes(lowerSearch)
      )
    );
  }, [clientes, searchTerm]);

  const handleBuscarClick = () => {
    setSearchTerm(searchInput.trim());
    setPage(1); 
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchTerm(searchInput.trim());
      setPage(1); 
    }
  };

  const [open, setOpen] = useState(false);
  const [modo, setModo] = useState("alta");
  const [cliente, setCliente] = useState(null);

  const handleAdd = () => {
    setModo("alta");
    setCliente(null);
    setOpen(true);
  };

  const handleEdit = (clienteSeleccionado) => {
    setModo("modificacion");
    setCliente(clienteSeleccionado);
    setOpen(true);
  };

  const handleView = (clienteSeleccionado) => {
    setModo("consulta");
    setCliente(clienteSeleccionado);
    setOpen(true);
  };

  // Guardar cliente (alta o modificación)
  const handleSave = async (datos, modoModal) => {
    let result;
    if (modoModal === "alta") {
      result = await crearCliente(datos);
    } else if (modoModal === "modificacion") {
      result = await actualizarCliente(datos.IUC, datos);
    }
    
    if (result && result.success) {
      setOpen(false);
    } else {
      console.error("Error al guardar cliente:", result?.error);
    }
  };

  // Calcular paginación
  const totalPages = Math.ceil(clientesFiltrados.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const clientesPaginados = clientesFiltrados.slice(startIndex, startIndex + itemsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Mostrar loading o error
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" gap={3} bgcolor="#F4FFF8" p={3}>
      <Typography
        variant="h2"
        sx={{
          color: "black",
          borderBottom: "3px solid #4D4847",
          width: "fit-content",
        }}
      >
        Gestión de Clientes
      </Typography>

      {/* Mostrar errores si existen */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          <strong>Error de conexión con el backend:</strong> {error}
          <br />
          <small>Verifica que el backend esté corriendo en https://localhost:7265</small>
        </Alert>
      )}

      {/* Debug info */}
      <Alert severity="info" sx={{ mb: 2 }}>
        Clientes: {clientes?.length || 0}
        {error ? ' (Con errores de conexión)' : ''}
      </Alert>

      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{flexDirection: { xs: 'column', sm: 'row' }, gap:{ xs: 2, sm: 0 }}}>
        <Box display="flex" gap={2} sx={{flexDirection: { xs: 'column', sm: 'row' }}}>
          <SearchBar
            placeholder="Buscar cliente"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button
            variant="contained"
            startIcon={<SearchIcon />}
            onClick={handleBuscarClick}
          >
            Buscar
          </Button>
        </Box>

        <Button
          variant="contained"
          startIcon={<PersonAddIcon />}
          onClick={handleAdd}
          disabled={!!error}
        >
          Nuevo Cliente
        </Button>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {error ? (
          <Alert severity="warning" sx={{ py: 4 }}>
            <Typography variant="h6" gutterBottom>
              No se pueden cargar los clientes
            </Typography>
            <Typography variant="body2">
              El backend no está disponible. Verifica que el servidor esté corriendo en https://localhost:7265
            </Typography>
            <Button 
              variant="outlined" 
              sx={{ mt: 2 }}
              onClick={cargarClientes}
            >
              Reintentar
            </Button>
          </Alert>
        ) : clientesPaginados.length > 0 ? (
          clientesPaginados.map((cliente) => (
            <ClienteCard
              key={cliente.IUC}
              cliente={cliente}
              onView={handleView}
              onEdit={handleEdit}
              onCopy={handleCopy}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <Typography variant="body1" sx={{ textAlign: 'center', py: 4 }}>
            {loading ? 'Cargando clientes...' : 'No hay clientes disponibles'}
          </Typography>
        )}
      </Box>

      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChangePage}
            color="primary"
            size="large"
          />
        </Box>
      )}

      <ModalCliente
        open={open}
        onClose={() => setOpen(false)}
        modo={modo}
        cliente={cliente}
        onSave={handleSave}
      />
    </Box>
  );
}

export default Clients;
