import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function AuthLinked() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box mt={5} textAlign="center">
        <Typography variant="h4" gutterBottom>
          🎉 Authenticator App Linked Successfully!
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          You can now use 2FA for secure logins.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/login')}
          sx={{ mt: 3 }}
        >
          Back to Login
        </Button>
      </Box>
    </Container>
  );
}
