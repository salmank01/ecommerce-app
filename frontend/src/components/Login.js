import { useState } from "react";
import axios from "axios";
import { TextField, Box, Button } from "@mui/material";

export default function Login() {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const handleSubmit = () => {
    console.log("req shot");
    const options = {
      headers: { "content-type": "application/json" },
    };
    
    console.log(data)
    axios
      .post("http://localhost:3000/ecommerce/login", data, options)
      .then((resp) => console.log(resp))                           
      .catch((err) => console.log(err));
  };
  return (
    <Box
      sx={{
        alignItems: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            width: "25rem",
            padding: "5rem 3rem",
            border: "3px solid grey",
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              padding: "3rem",
              fontSize: "3rem",
              fontWeight: " bold",
            }}
          >
            Login
          </Box>
          <TextField
            required
            id="username"
            name="username"
            label="Username"
            onChange={(e) =>
              setData((prevData) => {
                return { ...prevData, username: e.target.value };
              })
            }
          />
          <TextField
            required
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={(e) =>
              setData((prevData) => {
                return { ...prevData, password: e.target.value };
              })
            }
          />
          <Button
            type="submit"
            sx={{
              padding: "1rem",
              width: "50%",
              fontSize: "1rem",
              fontWeight: "bold",
              border: "2px solid grey",
            }}
            onClick={handleSubmit}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
