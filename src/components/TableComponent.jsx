import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import GetAppIcon from "@mui/icons-material/GetApp"; // Ícono de descarga

function TableComponent({
  columnas,
  filas,
  onView,
  onEdit,
  onCopy,
  onDelete,
  onDownload, // opcional si luego querés manejar la descarga
  ViewIconVisible,
  EditIconVisible,
  CopyIconVisible,
  DeleteIconVisible,
  DownloadIconVisible,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  function formatLabel(key) {
    return key
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
      .replace(/^./, (str) => str.toUpperCase());
  }

  const columnasProcesadas = [
    ...columnas.map((col) =>
      typeof col === "string" ? { key: col, label: formatLabel(col) } : col
    ),
    { key: "acciones", label: "Acciones" },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filasPaginadas = filas.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columnasProcesadas.map((col) => (
                <TableCell
                  key={col.key}
                  sx={{
                    backgroundColor: "#8BAAAD",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filasPaginadas.map((fila, index) => (
              <TableRow key={index}>
                {columnasProcesadas.map((col) => (
                  <TableCell key={col.key}>
                    {col.key === "acciones" ? (
                      <div>
                        {ViewIconVisible && (
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => onView && onView(fila)}
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        )}
                        {EditIconVisible && (
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => onEdit && onEdit(fila)}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        )}
                        {CopyIconVisible && (
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => onCopy && onCopy(fila)}
                          >
                            <FileCopyIcon fontSize="small" />
                          </IconButton>
                        )}
                        {DeleteIconVisible && (
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => onDelete && onDelete(fila)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        )}
                        {DownloadIconVisible && (
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => onDownload && onDownload(fila)}
                          >
                            <GetAppIcon fontSize="small" />
                          </IconButton>
                        )}
                      </div>
                    ) : (
                      fila[col.key]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={filas.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
        labelRowsPerPage="Filas por página:"
      />
    </Paper>
  );
}

export default TableComponent;
