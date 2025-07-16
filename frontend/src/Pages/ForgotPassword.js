import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import axios from 'axios';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/forgot-password', { email });
      alert('Reset link sent to your email.');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to send reset link');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={10} p={4} boxShadow={3} borderRadius={2}>
        <Typography variant="h5">Forgot Password</Typography>
        <TextField fullWidth margin="normal" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Button variant="contained" fullWidth onClick={handleSubmit}>Send Reset Link</Button>
      </Box>
    </Container>
  );
}
