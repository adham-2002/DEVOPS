import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../Context/Auth/AutContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [error, seterror] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { login } = useAuth();

  const onSubmit = async () => {
    const email = emailRef?.current?.value;
    const password = passwordRef?.current?.value;

    if (!email || !password) {
      seterror("check supmited data");
      return;
    }
    // Make The API Call
    const response = await fetch(`${BASE_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (!response.ok) {
      const data = await response.json();
      console.log(data);
      seterror("Unable to login,please try diffrent cradientials!");
      return;
    }
    seterror("");

    const token = await response.json();
    if (!token) {
      seterror("Incorrect Token");
      return;
    }
    login(email, token);
    navigate("/");
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Typography variant="h6">Login to your account</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 2,
            border: 2,
            borderColor: "#f5f5f5",
            p: 2,
          }}
        >
          <TextField inputRef={emailRef} label="Email" name="Email" />
          <TextField
            inputRef={passwordRef}
            type="password"
            label="Password"
            name="password"
          />
          <Button onClick={onSubmit} variant="contained">
            Login
          </Button>
          {error && <Typography color="red">{error}</Typography>}
        </Box>
      </Box>
    </Container>
  );
};
export default LoginPage;
