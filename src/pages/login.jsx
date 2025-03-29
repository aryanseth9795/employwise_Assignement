import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import serverUrl from "../constants/config";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlelogin = async (e) => {
    e.preventDefault();
    const LoginLoader = toast.loading("Signing In ...");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post(
        `${serverUrl}/login`,
        { email, password },
        config
      );
      localStorage.setItem("token", res?.data?.token);
      navigate("/home");
      toast.success(" Login successfully", { id: LoginLoader });
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error || "Something went Wrong", {
        id: LoginLoader,
      });
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(to right , rgb(1, 251, 247), rgb(55, 29, 190))",
      }}
    >
      <Container
        component={"main"}
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <>
            {" "}
            <Typography
              variant="h2"
              gutterBottom
              color={"green"}
              padding={"1rem"}
            >
              Login Form
            </Typography>
            <form
              style={{ width: "100%", marginTop: "1rem" }}
              onSubmit={handlelogin}
            >
              <TextField
                type="email"
                required
                fullWidth
                label="Email"
                margin="normal"
                variant="standard"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <TextField
                required
                fullWidth
                type="password"
                label="Password"
                margin="normal"
                variant="standard"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                Login
              </Button>
            </form>
          </>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
