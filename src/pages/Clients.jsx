import React, { useState, useMemo } from "react";
import { Box, Button, Typography } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";

import { useSelector } from "react-redux";
import { selectClientes } from "../redux/clientes/clientesSlice";

import TableComponent from "../components/TableComponent";
import SearchBar from "../components/SearchBar";

function Clients() {
  const clientes = useSelector(selectClientes);

  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleView = (row) => alert(`Ver cliente: ${row.id}`);
  const handleEdit = (row) => alert(`Editar cliente: ${row.id}`);
  const handleCopy = (row) => alert(`Copiar cliente: ${row.id}`);
  const handleDelete = (row) => alert(`Eliminar cliente: ${row.id}`);

  const columnas = clientes.length > 0 ? Object.keys(clientes[0]) : [];

  // 🔍 Solo filtra cuando searchTerm cambia
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
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchTerm(searchInput.trim());
    }
  };


  return (
    <Box display="flex" flexDirection="column" gap={2} bgcolor="#F4FFF8">
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

      <Box display="flex" justifyContent="space-between">
        <Box display="flex" gap={2}>
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

        <Button variant="contained" startIcon={<PersonAddIcon />}>
          Nuevo Cliente
        </Button>
      </Box>

      <TableComponent
        columnas={columnas}
        filas={clientesFiltrados}
        onView={handleView}
        onEdit={handleEdit}
        onCopy={handleCopy}
        onDelete={handleDelete}
      />
    </Box>
  );
}

export default Clients;
