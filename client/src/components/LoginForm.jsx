// see SignupForm.js for comments
import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Auth from '../utils/auth';
import { Alert, Avatar, Box, Button, Grid, Link, TextField, Typography } from '@mui/material';

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [login, { error }] = useMutation(LOGIN_USER);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await login({
        variables: { ...userFormData },
      });

      console.log(data);
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setUserFormData({
      email: '',
      password: '',
    });
  };

  return (
    <>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <Box component="form" noValidate validated={validated} onSubmit={handleFormSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Box >
              {showAlert && <Alert
                onClose={() => setShowAlert(false)}
              >Something went wrong with your Log in!</Alert>}
            </Box>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleInputChange}
                value={userFormData.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={handleInputChange}
                value={userFormData.password}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            disabled={
              !(
                userFormData.email &&
                userFormData.password
              )
            }
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/registration" variant="body2">
                Dont have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default LoginForm;
