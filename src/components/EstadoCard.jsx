import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
  Chip,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import CircleIcon from "@mui/icons-material/Circle";

function EstadoCard({ estado, onView, onEdit, onCopy, onDelete }) {
  const getEstadoColor = (nombreEstado) => {
    switch (nombreEstado.toLowerCase()) {
      case "pendiente":
        return "#ff9800"; 
      case "en preparación":
        return "#2196f3"; // Azul
      case "en tránsito":
        return "#9c27b0"; // Violeta
      case "entregado":
        return "#4caf50"; // Verde
      case "cancelado":
        return "#f44336"; // Rojo
      default:
        return "#757575"; // Gris
    }
  };

  return (
    <Card
      sx={{
        width: "100%",
        minWidth: "520px", // Límite mínimo de ancho
        backgroundColor: "#f6fffa",
        "&:hover": {
          backgroundColor: "rgba(139, 170, 173, 0.15)",
          transition: "all 0.1s ease-in-out",
        },
        border: "1px solid #e0e0e0",
        borderTop: "none",
        "&:first-of-type": {
          borderTop: "1px solid #e0e0e0",
          borderTopLeftRadius: "4px",
          borderTopRightRadius: "4px",
        },
        "&:last-of-type": {
          borderBottomLeftRadius: "4px",
          borderBottomRightRadius: "4px",
        },
        borderRadius: 0,
        boxShadow: "none",
        mb: 0,
        mt: 0,
      }}
    >
      <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minWidth: 100,
              gap: 1,
              flexShrink: 0,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: 70,
                height: 70,
                backgroundColor: "rgba(156, 39, 176, 0.1)",
                borderRadius: 2,
                border: "2px solid #9c27b0",
              }}
            >
              <CircleIcon sx={{ color: getEstadoColor(estado.nombre), fontSize: "1.8rem", mb: 0.3 }} />
              <Typography variant="caption" sx={{ color: "#9c27b0", fontWeight: "bold", fontSize: "0.65rem" }}>
                {estado.id}
              </Typography>
            </Box>
            <Chip
              label={estado.estado}
              size="small"
              sx={{
                backgroundColor: estado.estado === "Activo" ? "#4caf50" : "#f44336",
                color: "white",
                fontSize: "0.7rem",
                fontWeight: "bold",
                height: 22,
                minWidth: 80,
              }}
            />
          </Box>

         
          <Box sx={{ flex: 1, minWidth: 0 }}>
            
            <Box sx={{ mb: 1.2 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: "bold", 
                  fontSize: "1.15rem", 
                  mb: 0.4,
                  color: getEstadoColor(estado.nombre),
                }}
              >
                {estado.nombre}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <InfoIcon sx={{ fontSize: "0.85rem", color: "text.secondary" }} />
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.9rem" }}>
                  ID: {estado.id}
                </Typography>
              </Box>
            </Box>

            
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.4 }}>
              <Typography variant="body2" sx={{ fontSize: "0.8rem", fontWeight: "500", fontStyle: "italic" }}>
                {estado.descripcion}
              </Typography>
            </Box>
          </Box>

          
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, ml: 2, flexShrink: 0 }}>
            <Tooltip title="Ver detalles">
              <IconButton 
                size="small" 
                onClick={() => onView && onView(estado)}
                sx={{ 
                  backgroundColor: "#e3f2fd",
                  "&:hover": { backgroundColor: "#bbdefb" },
                  width: 32,
                  height: 32,
                }}
              >
                <VisibilityIcon sx={{ fontSize: "0.9rem" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Editar">
              <IconButton 
                size="small" 
                onClick={() => onEdit && onEdit(estado)}
                sx={{ 
                  backgroundColor: "#e8f5e8",
                  "&:hover": { backgroundColor: "#c8e6c9" },
                  width: 32,
                  height: 32,
                }}
              >
                <EditIcon sx={{ fontSize: "0.9rem" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Copiar">
              <IconButton 
                size="small" 
                onClick={() => onCopy && onCopy(estado)}
                sx={{ 
                  backgroundColor: "#fff3e0",
                  "&:hover": { backgroundColor: "#ffe0b2" },
                  width: 32,
                  height: 32,
                }}
              >
                <FileCopyIcon sx={{ fontSize: "0.9rem" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar">
              <IconButton 
                size="small" 
                onClick={() => onDelete && onDelete(estado)}
                sx={{ 
                  backgroundColor: "#ffebee",
                  "&:hover": { backgroundColor: "#ffcdd2" },
                  width: 32,
                  height: 32,
                }}
              >
                <DeleteIcon sx={{ fontSize: "0.9rem" }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default EstadoCard; 