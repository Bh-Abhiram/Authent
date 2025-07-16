import React, { useState } from 'react';
import {
  Container, Box, TextField, Button, Typography,
  IconButton, InputAdornment
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/signup', form);
      const { qrCode, email } = res.data;
      navigate('/show-qr', { state: { qrCode, email } });
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={10} p={4} boxShadow={3} borderRadius={2}>
        <Typography variant="h4" align="center" gutterBottom>Sign Up</Typography>
        <TextField name="name" label="Full Name" fullWidth margin="normal" onChange={handleChange} />
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
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleSignup}>
          Sign Up
        </Button>
        <Box mt={2} textAlign="center">
          Already have an account? <Link to="/login">Login</Link>
        </Box>
      </Box>
    </Container>
  );
}
