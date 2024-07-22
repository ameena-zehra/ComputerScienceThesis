import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "@fontsource/poppins"; // Defaults to weight 400

const StoryGenerator = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const handleGenerateStory = async () => {
    const response = await axios.post("http://127.0.0.1:5000/generate", {
      input,
    });
    const story = response.data.story;
    const image = response.data.image;
    navigate("/book", { state: { story, image } });
  };

  return (
    <div className="main">
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "140ch" },
        }}
        noValidate
        autoComplete="off"
        display="flex"
        alignItems="center"
        pl={11}
      >
        <h1>Enter Your Prompt</h1>
      </Box>

      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "120ch" },
        }}
        noValidate
        autoComplete="off"
        display="flex"
        alignItems="center"
        gap={4}
        pl={11}
      >
        <TextField
          id="outlined-multiline-flexible"
          multiline
          minRows={10}
          fullWidth
          defaultValue="Default Value"
          onChange={(e) => setInput(e.target.value)}
          sx={{
            width: "100%",
            fontFamily: "'Poppins', sans-serif", // Set font to Poppins
          }}
        />
      </Box>
      <Box
        sx={{
          "& .MuiTextField-root": { m: 1, width: "140ch" },
        }}
        noValidate
        autoComplete="off"
        display="flex"
        alignItems="center"
        gap={4}
        pl={11}
      >
        <Button
          sx={{ marginTop: "20px" }}
          variant="round"
          size="medium"
          onClick={handleGenerateStory}
        >
          Create
        </Button>
      </Box>
    </div>
  );
};

export default StoryGenerator;
