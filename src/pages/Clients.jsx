import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
  InputBase,
} from "@mui/material";

import { styled } from "@mui/material/styles";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import React from "react";
import { Search } from "@mui/icons-material";
import SearchBar from "../components/SearchBar";

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function Clients() {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#F4FFF8",
        }}
        gap={2}
      >
        <Box>
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
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            sx={{
              display: "flex",
            }}
            gap={5}
          >
            <SearchBar />
            <Button variant="contained" startIcon={<SearchIcon />}>
              Buscar
            </Button>
          </Box>
          <Button variant="contained" startIcon={<PersonAddIcon />}>
            Nuevo Cliente
          </Button>
        </Box>
        <Box></Box>
      </Box>
    </div>
  );
}

export default Clients;
