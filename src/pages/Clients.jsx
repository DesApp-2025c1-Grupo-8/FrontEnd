import React, { useState, useMemo } from "react";
import { Box, Button, Typography, Grid, Pagination } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";

import { useSelector } from "react-redux";
import { selectClientes } from "../redux/clientes/clientesSlice";

import ModalCliente from "../components/ModalCliente";
import ClienteCard from "../components/ClienteCard";
import SearchBar from "../components/SearchBar";

function Clients() {
  const clientes = useSelector(selectClientes);

  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleCopy = (cliente) => alert(`Copiar cliente: ${cliente.IUC}`);
  const handleDelete = (cliente) => alert(`Eliminar cliente: ${cliente.IUC}`);

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

  // Calcular paginación
  const totalPages = Math.ceil(clientesFiltrados.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const clientesPaginados = clientesFiltrados.slice(startIndex, startIndex + itemsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

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
        >
          Nuevo Cliente
        </Button>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {clientesPaginados.map((cliente) => (
          <ClienteCard
            key={cliente.IUC}
            cliente={cliente}
            onView={handleView}
            onEdit={handleEdit}
            onCopy={handleCopy}
            onDelete={handleDelete}
          />
        ))}
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
      />
    </Box>
  );
}

export default Clients;
