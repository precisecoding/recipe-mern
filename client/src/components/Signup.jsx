import { useState, useEffect } from 'react';


import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';
import { Alert, Avatar, Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Signup = () => {
    // set initial form state
    const [userFormData, setUserFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    // set state for form validation
    const [validated] = useState(false);
    // set state for alert
    const [showAlert, setShowAlert] = useState(false);

    const [addUser, { error }] = useMutation(ADD_USER);

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

        // check if form has everything (as per react-bootstrap docs)
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        try {
            const { data } = await addUser({
                variables: { ...userFormData },
            });
            console.log(data);
            Auth.login(data.addUser.token);
        } catch (err) {
            console.error(err);
        }

        setUserFormData({
            username: '',
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
                    Sign up
                </Typography>
                <Box component="form" noValidate validated={validated} onSubmit={handleFormSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Box >
                        {showAlert && <Alert 
                            onClose={() => setShowAlert(false)}
                            >Something went wrong with your signup!</Alert>}
                            </Box>
                        <Grid item xs={12}>
                            <TextField
                                name="username"
                                required
                                fullWidth
                                id="username"
                                label="username"
                                onChange={handleInputChange}
                                value={userFormData.username}
                                autoFocus
                            />
                         
                        </Grid>
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
                                userFormData.username &&
                                userFormData.email &&
                                userFormData.password
                            )
                        }
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );
};

export default Signup;
