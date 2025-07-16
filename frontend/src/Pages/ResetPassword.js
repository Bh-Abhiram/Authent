import React, { useState, useEffect } from 'react';
import {
  Container, Box, TextField, Button, Typography,
  IconButton, InputAdornment
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [tokenValid, setTokenValid] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const token = query.get('token');
  const email = query.get('email');

  useEffect(() => {
    if (!token || !email) return setTokenValid(false);

    axios.get(`http://localhost:5000/api/validate-reset-token`, {
      params: { token, email }
    }).then(res => {
      setTokenValid(res.data.valid);
    }).catch(() => setTokenValid(false));
  }, [token, email]);

  const handleReset = async () => {
    if (password !== confirm) {
      setError("Passwords don't match");
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/reset-password', {
        token,
        email,
        newPassword: password
      });
      alert("Password reset successful!");
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  if (!tokenValid) {
    return (
      <Container maxWidth="sm">
        <Box mt={10} p={4} boxShadow={3} borderRadius={2}>
          <Typography variant="h6" color="error">This reset link is invalid or has expired.</Typography>
          <Box mt={2} textAlign="center">
            <Link to="/forgot-password">Request a new one</Link>
          </Box>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box mt={10} p={4} boxShadow={3} borderRadius={2}>
        <Typography variant="h4" align="center" gutterBottom>Reset Password</Typography>
        <TextField
          label="New Password"
          type={showPassword ? 'text' : 'password'}
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
        <TextField
          label="Confirm Password"
          type={showConfirm ? 'text' : 'password'}
          fullWidth
          margin="normal"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          error={!!error}
          helperText={error}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowConfirm(!showConfirm)}>
                  {showConfirm ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleReset}>
          Reset Password
        </Button>
        <Box mt={2} textAlign="center">
          <Link to="/">Back to Login</Link>
        </Box>
      </Box>
    </Container>
  );
}
