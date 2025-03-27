import React, { useState } from "react";
import { Button, Box, Typography, Avatar, Grid, useTheme } from "@mui/material";
import "@fontsource/urbanist/700.css";
import { ReactComponent as Icon } from "../assests/images/icon.svg";
import { ReactComponent as GoogleIcon } from "../assests/images/googleIcon.svg";
import Dashboard from "./Dashboard";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle, logout, auth, onAuthStateChanged } from "./firebase";

const Login = () => {
  const [user, setUser] = useState(null);
  const theme = useTheme();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {

      const user = await signInWithGoogle();

      if (user.emailVerified) {
        console.log(user);

        const userData = {
          displayName: user.displayName,
          email: user.email,
        };
        setUser(userData);
        navigate("/dashboard", { state: { user: userData } });
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
    }
  };
  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Box
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="space-around"
      bgcolor="#FFF9F9"
      overflow="hidden"
    >
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
          bgcolor: "#FFF9F9",
        }}
      >
        <>
          <Box mr={90} bgcolor="#FFF9F9">
            <Box display="flex">
              <Icon />
              <Typography
                variant="h4"
                sx={{
                  fontFamily: "Urbanist, sans-serif",
                  fontWeight: 700,
                  fontSize: "26.19px",
                  lineHeight: "140%",
                  letterSpacing: "0%",
                  color: "#7B1984",
                  mb: 1,
                }}
              >
                TaskBuddy
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ maxWidth: "70%", mb: 5 }}>
              Streamline your workflow and track progress effortlessly with our
              all-in-one task management app.
            </Typography>
            <Button
              variant="contained"
              onClick={handleLogin}
              sx={{
                bgcolor: "#292929",
                color: "#fff",
                width: "450px",
                height: "50px",
                borderRadius: "20px",
              }}
            >
              <GoogleIcon />
              <Typography
                sx={{
                  ml: 1,
                  fontFamily: "Urbanist, sans-serif",
                  textTransform: "none",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                Continue with Google
              </Typography>
            </Button>
          </Box>

          <Box>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                bgcolor: "#fdf6f6",
                mr: 50,
                mt: 70,
              }}
            >
              {[1400, 1200, 1000, 800, 600, 400, 200, 100].map(
                (size, index) => (
                  <Box
                    key={index}
                    sx={{
                      position: "absolute",
                      width: size,
                      height: size,
                      border: "2px solid #7B1984",
                      borderRadius: "50%",
                      opacity: 1 - index * 0.1, 
                    }}
                  />
                )
              )}
            </Grid>
          </Box>
        </>
      </Grid>
    </Box>
  );
};

export default Login;
