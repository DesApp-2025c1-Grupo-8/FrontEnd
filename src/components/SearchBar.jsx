import { Box, InputAdornment, TextField } from "@mui/material";

import React from "react";

import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function SearchBar() {
  return (
    <div>
      <TextField
        id="outlined-basic"
        variant="outlined"
        placeholder="Cliente"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <ArrowDropDownIcon />
              </InputAdornment>
            ),
          },
        }}
        sx={{
          "& ::placeholder": {
            borderBottom: "1px solid #4D4847",
          },
        }}
      />
    </div>
  );
}

export default SearchBar;
