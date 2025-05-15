import React, { useState, useMemo } from "react";

import { Box, Button, Typography } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";

import { useSelector } from "react-redux";
import { selectRemitos } from "../redux/remitos/remitosSlice";

import ModalRemito from "../components/ModalRemito";
import TableComponent from "../components/TableComponent";
import SearchBar from "../components/SearchBar";

function Documents() {
  const remitos = useSelector(selectRemitos);

  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleCopy = (row) => alert(`Copiar remito: ${row.id}`);
  const handleDelete = (row) => alert(`Eliminar remito: ${row.id}`);

  const columnas = remitos.length > 0 ? Object.keys(remitos[0]) : [];

  const remitosFiltrados = useMemo(() => {
    if (!searchTerm) return remitos;

    const lowerSearch = searchTerm.toLowerCase();
    return remitos.filter((remitos) =>
      Object.values(remitos).some((valor) =>
        String(valor).toLowerCase().includes(lowerSearch)
      )
    );
  }, [remitos, searchTerm]);

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
  const [remito, setRemito] = useState(null); // Datos del destino seleccionado

  const handleAdd = () => {
    setModo("alta");
    setRemito(null);
    setOpen(true);
  };

  const handleEdit = (destinoEjemplo) => {
    setModo("modificacion");
    setRemito(destinoEjemplo);
    setOpen(true);
  };

  const handleView = (destinoEjemplo) => {
    setModo("consulta");
    setRemito(destinoEjemplo);
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
        Gestión de Remitos
      </Typography>

      <Box display="flex" justifyContent="space-between">
        <Box display="flex" gap={2}>
          <SearchBar
            placeholder="Buscar remito"
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
          Nuevo Remito
        </Button>
      </Box>

      <TableComponent
        columnas={columnas}
        filas={remitosFiltrados}
        onView={handleView}
        onEdit={handleEdit}
        onCopy={handleCopy}
        onDelete={handleDelete}
      />
      <ModalRemito
        open={open}
        onClose={() => setOpen(false)}
        modo={modo}
        remito={remito}
      />
    </Box>
  );
}

export default Documents;
