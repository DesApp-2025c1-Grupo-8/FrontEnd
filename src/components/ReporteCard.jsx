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
import DownloadIcon from "@mui/icons-material/Download";
import DescriptionIcon from "@mui/icons-material/Description";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

function ReporteCard({ reporte, onView, onEdit, onCopy, onDelete, onDownload }) {
  const getTipoColor = (tipo) => {
    if (tipo.includes("Volumen")) return "#2196f3"; // Azul
    if (tipo.includes("Distribución")) return "#4caf50"; // Verde  
    if (tipo.includes("Análisis")) return "#ffc107"; // Amarillo
    return "#757575"; // Gris por defecto
  };

  const getTipoLabel = (tipo) => {
    if (tipo.includes("Volumen")) return "VOLUMEN";
    if (tipo.includes("Distribución")) return "GEOGRAFÍA";
    if (tipo.includes("Análisis")) return "ANÁLISIS";
    return "REPORTE";
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
          {/* Icono/Indicador Principal */}
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
                backgroundColor: "#fff3e0",
                borderRadius: 2,
                border: "2px solid #ff9800",
              }}
            >
              <DescriptionIcon sx={{ color: "#ff9800", fontSize: "1.8rem", mb: 0.3 }} />
              <Typography variant="caption" sx={{ color: "#ff9800", fontWeight: "bold", fontSize: "0.65rem" }}>
                {reporte.id}
              </Typography>
            </Box>
            <Chip
              label={getTipoLabel(reporte.tipo)}
              size="small"
              sx={{
                backgroundColor: getTipoColor(reporte.tipo),
                color: "white",
                fontSize: "0.7rem",
                fontWeight: "bold",
                height: 22,
                minWidth: 80,
              }}
            />
          </Box>

          {/* Información Principal */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {/* Línea 1: Tipo de Reporte */}
            <Box sx={{ mb: 1.2 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: "bold", 
                  fontSize: "1.15rem", 
                  mb: 0.4,
                  color: "#ff9800",
                }}
              >
                {reporte.tipo}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <CalendarTodayIcon sx={{ fontSize: "0.85rem", color: "text.secondary" }} />
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.9rem" }}>
                  Fecha: {reporte.fecha}
                </Typography>
              </Box>
            </Box>


          </Box>

          {/* Acciones */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, ml: 2, flexShrink: 0 }}>
            <Tooltip title="Ver detalles">
              <IconButton 
                size="small" 
                onClick={() => onView && onView(reporte)}
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
                onClick={() => onEdit && onEdit(reporte)}
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
                onClick={() => onCopy && onCopy(reporte)}
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
            <Tooltip title="Descargar">
              <IconButton 
                size="small" 
                onClick={() => onDownload && onDownload(reporte)}
                sx={{ 
                  backgroundColor: "#f3e5f5",
                  "&:hover": { backgroundColor: "#e1bee7" },
                  width: 32,
                  height: 32,
                }}
              >
                <DownloadIcon sx={{ fontSize: "0.9rem" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar">
              <IconButton 
                size="small" 
                onClick={() => onDelete && onDelete(reporte)}
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

export default ReporteCard; 