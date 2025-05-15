import React, { useState, useMemo } from "react";
import { Box, Button, Typography, Container, Stack } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";

import { useSelector } from "react-redux";
import { selectClientes } from "../redux/clientes/clientesSlice";

import ModalCliente from "../components/ModalCliente";
import TableComponent from "../components/TableComponent";
import SearchBar from "../components/SearchBar";

function Clients() {
  const clientes = useSelector(selectClientes);

  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleCopy = (row) => alert(`Copiar cliente: ${row.IUC}`);
  const handleDelete = (row) => alert(`Eliminar cliente: ${row.IUC}`);

  const columnas = clientes.length > 0 ? Object.keys(clientes[0]) : [];

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

  const [open, setOpen] = useState(false); // Controla si el modal está abierto
  const [modo, setModo] = useState("alta"); // Modo del modal (alta, modificación, consulta)
  const [cliente, setCliente] = useState(null); // Datos del cliente seleccionado

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

        <Button
          variant="contained"
          startIcon={<PersonAddIcon />}
          onClick={handleAdd}
        >
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
