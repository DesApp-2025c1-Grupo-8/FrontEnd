import React, { useState, useMemo } from "react";

import { Box, Button, Typography } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";

import { useSelector } from "react-redux";
import { selectDestinos } from "../redux/destinos/destinosSlice";

import ModalDestino from "../components/ModalDestino";
import TableComponent from "../components/TableComponent";
import SearchBar from "../components/SearchBar";

function Destinations() {
  const destinos = useSelector(selectDestinos);

  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleCopy = (row) => alert(`Copiar destino: ${row.id}`);
  const handleDelete = (row) => alert(`Eliminar destino: ${row.id}`);

  const columnas = destinos.length > 0 ? Object.keys(destinos[0]) : [];

  const clientesFiltrados = useMemo(() => {
    if (!searchTerm) return destinos;

    const lowerSearch = searchTerm.toLowerCase();
    return destinos.filter((destino) =>
      Object.values(destino).some((valor) =>
        String(valor).toLowerCase().includes(lowerSearch)
      )
    );
  }, [destinos, searchTerm]);

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
  const [destino, setDestino] = useState(null); // Datos del destino seleccionado

  const handleAdd = () => {
    setModo("alta");
    setDestino(null);
    setOpen(true);
  };

  const handleEdit = (destinoEjemplo) => {
    setModo("modificacion");
    setDestino(destinoEjemplo);
    setOpen(true);
  };

  const handleView = (destinoEjemplo) => {
    setModo("consulta");
    setDestino(destinoEjemplo);
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
        Gestión de Destinos
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
          Nuevo Destino
        </Button>
      </Box>

      <TableComponent
        columnas={columnas}
        filas={clientesFiltrados}
        onView={handleView}
        onEdit={handleEdit}
        onCopy={handleCopy}
        onDelete={handleDelete}
        ViewIconVisible={true}
        EditIconVisible={true}
        CopyIconVisible={true}
        DeleteIconVisible={true}
      />
      <ModalDestino
        open={open}
        onClose={() => setOpen(false)}
        modo={modo}
        destino={destino}
      />
    </Box>
  );
}

export default Destinations;
