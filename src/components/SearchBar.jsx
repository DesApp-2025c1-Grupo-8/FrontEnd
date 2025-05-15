import { TextField, InputAdornment } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function SearchBar({ value, onChange, onKeyDown, placeholder }) {
  return (
    <TextField
      id="outlined-basic"
      variant="outlined"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
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
  );
}

export default SearchBar;
