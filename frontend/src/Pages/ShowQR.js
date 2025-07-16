import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container, Box, Typography, Button, TextField, CircularProgress
} from '@mui/material';
import axios from 'axios';

export default function ShowQR() {
  const location = useLocation();
  const navigate = useNavigate();
  const { qrCode, email } = location.state || {};

  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [linked, setLinked] = useState(false);
  const [error, setError] = useState('');

  if (!qrCode) {
    return (
      <Container maxWidth="sm">
        <Box mt={10} p={4} boxShadow={3} borderRadius={2} textAlign="center">
          <Typography variant="h6" color="error">QR Code not available</Typography>
          <Button onClick={() => navigate('/signup')} sx={{ mt: 2 }}>Go Back</Button>
        </Box>
      </Container>
    );
  }

  const handleVerify = async () => {
    if (!token) {
      setError('Please enter the OTP code from your app.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/verify-setup', {
        email,
        token
      });

      if (res.data.verified) {
        setLinked(true);
      } else {
        setError('Invalid code. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Verification failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={10} p={4} boxShadow={3} borderRadius={2} textAlign="center">
        {!linked ? (
          <>
            <Typography variant="h5" gutterBottom>
              Scan QR Code with your Personal Authenticator App
            </Typography>
            <img
              src={qrCode}
              alt="2FA QR Code"
              style={{ width: 250, height: 250, margin: '20px 0' }}
            />
            <Typography variant="body2" sx={{ mb: 2 }}>
              Account: <strong>{email}</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              After scanning, enter the 6-digit code from your Authenticator app to complete setup.
            </Typography>
            <TextField
              label="Enter 6-digit Code"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              fullWidth
              margin="normal"
            />
            {error && (
              <Typography variant="body2" color="error" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={handleVerify}
              disabled={loading}
              fullWidth
              sx={{ mt: 2 }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Verify'}
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h5" color="success.main" gutterBottom>
              ✅ App Successfully Linked!
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              You can now use your Authenticator app to log in securely.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/login')}
            >
              Back to Login
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
}
