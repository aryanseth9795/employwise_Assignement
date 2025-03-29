
import { Box, TextField, Button, Paper } from "@mui/material";
import React, { useState } from "react";
const SearchAppBar = ({ searchHandle }) => {
  const [searchInput, setSearchInput] = useState("");

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "90vw",
        flexDirection: "column",
        margin: "3rem",
      }}
    >
      <Paper
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
          width: { xs: "90%", sm: "50%" },
          p: 1,
          boxShadow: 3,
          borderRadius: "30px",
        }}
      >
        <TextField
          variant="standard"
          placeholder="Search User by First or Last Name"
          fullWidth
          InputProps={{
            disableUnderline: true,
          }}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          sx={{ ml: 2 }}
        />
        <Button
          variant="contained"
          sx={{ borderRadius: "20px", ml: 2 }}
          onClick={() => searchHandle(searchInput)}
        >
          Search
        </Button>
      </Paper>
    </Box>
  );
};

export default SearchAppBar;
