import React, { useState } from 'react';
import {
  Container, Box, TextField, Button, Typography,
  FormControlLabel, Checkbox, IconButton, InputAdornment
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '', token: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      console.log("Form data being sent to server:", form);
      const res = await axios.post('http://localhost:5000/api/login', form);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={10} p={4} boxShadow={3} borderRadius={2}>
        <Typography variant="h4" align="center" gutterBottom>Login</Typography>
        <TextField name="email" label="Email" type="email" fullWidth margin="normal" onChange={handleChange} />
        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          fullWidth
          margin="normal"
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <TextField name="token" label="OTP (from Authenticator)" fullWidth margin="normal" onChange={handleChange} />
        <FormControlLabel control={<Checkbox />} label="Remember me" />
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleLogin}>Login</Button>
        <Box mt={2} textAlign="center">
          <Link to="/forgot-password">Forgot password?</Link><br />
          Don't have an account? <Link to="/">Sign up</Link>
        </Box>
      </Box>
    </Container>
  );
}
