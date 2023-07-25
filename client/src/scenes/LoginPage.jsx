import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  // const isAuthenticated = true;

  // const navigate = useNavigate();

  // useEffect(() => {
  //   // Check if the user is already logged in
  //   if (isAuthenticated) {
  //     // If the user is logged in, redirect to the home page or dashboard
  //     navigate("/home"); // Change "/home" to the appropriate URL of your home page or dashboard
  //   }
  // }, [isAuthenticated, navigate]);


  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <img
          src={require("./logo.png")}
          alt="Company Logo"
          style={{ width: "50px", height: "50px" }}
        />
        <Typography fontWeight="bold" fontSize="32px" color="white">
          Threads
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to Threads, It's better than twitter. Trust us.
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
