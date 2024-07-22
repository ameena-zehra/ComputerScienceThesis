import React from "react";
import { Route, Routes } from "react-router-dom";
import Book from "./pages/Book";
import StoryGenerator from "./pages/StoryGenerator";
import Homescreen from "./pages/Homescreen";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#A8A3EC",
    },
    secondary: {
      main: "#F3FDE8",
    },
  },
  typography: {
    title: {
      fontFamily: "'Lilita One', cursive",
      fontSize: "6rem",
      color: "#F3FDE8",
      fontWeight: 700,
      display: "inline-block",
    },
    rounded: {
      fontFamily: "'M PLUS Rounded 1c', sans-serif",
      fontSize: "2rem",
      color: "#558ABB",
    },
    poster: {
      fontFamily: [
        "Nunito",
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
      ].join(","),
      fontSize: "4rem",
      color: "#F3FDE8",
      fontWeight: 700,
      display: "inline-block",
    },
    paragraph: {
      fontSize: "1.5rem",
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "round" },
          style: {
            fontFamily: "'Poppins', sans-serif",
            color: "#FFFFFF",
            borderRadius: 15,
            backgroundColor: "#000000",
            padding: "8px 50px", // equivalent to py: 2 and px: 20 using 'sx' prop
            fontSize: "1.5rem",
            textTransform: "none",
            "&:hover": {
              color: "#000000", // Set color to black on hover
              backgroundColor: "#FFFFFF",
              border: "1px solid #000000",
            },
          },
        },
        {
          props: { variant: "small" },
          style: {
            fontFamily: "'Poppins', sans-serif",
            color: "#FFFFFF",
            borderRadius: 15,
            backgroundColor: "#A8A3EC",
            padding: "6px 30px", // equivalent to py: 2 and px: 20 using 'sx' prop
            fontSize: "1.1rem",
            textTransform: "none",
            "&:hover": {
              color: "#000000", // Set color to black on hover
              backgroundColor: "#FFFFFF",
              border: "1px solid #000000",
            },
          },
        },
      ],
    },
  },
});
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route key="home" exact path="/" element={<Homescreen />} />
        <Route
          key="storygenerator"
          exact
          path="/storygenerator"
          element={<StoryGenerator />}
        />
        <Route key="book" exact path="/book" element={<Book />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
