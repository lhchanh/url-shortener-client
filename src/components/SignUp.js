import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { TextField, Button, Paper, Box, Typography } from '@mui/material';
import AuthService from '../services/AuthService';
import { signupSchema } from '../common/validationSchemas';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const SignUpForm = () => {
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      try {
        await AuthService.signup(values.email, values.password, values.password_confirmation);
      } catch (error) {
        console.error('Authentication failed:', error);
      }
    },
  });

  useEffect(() => {
    if (AuthService.isAuthenticated) {
      history.push('/shorten-url');
    }
  }, [history]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Paper elevation={3} sx={{ padding: 3, width: 300 }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            margin="normal"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <TextField
            fullWidth
            id="password_confirmation"
            name="password_confirmation"
            label="Password Confirmation"
            type="password"
            variant="outlined"
            margin="normal"
            value={formik.values.password_confirmation}
            onChange={formik.handleChange}
            error={formik.touched.password_confirmation && Boolean(formik.errors.password_confirmation)}
            helperText={formik.touched.password_confirmation && formik.errors.password_confirmation}
          />
          <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default SignUpForm;
