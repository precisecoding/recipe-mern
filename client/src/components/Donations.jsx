import React from 'react';
import axios from 'axios';
import Stripe from "react-stripe-checkout";
import { Box, Container, Typography } from '@mui/material';

const Donations = () => {

    const handleToken = (totalAmount, token) => {
        try {
            axios.post("/api/stripe/pay", {
                token: token.id,
                amount: totalAmount
            });
        } catch (error) {
            console.Log(error);
        }
    }
    const tokenHandler = (token) => {
        handleToken(100, token);
    }


    return (
        <Box>
            <Container>
            <Box sx={{display:"flex", flexWrap:"wrap", flexDirection:"column", justifyContent:"center", alignItems:"center", minHeight:"80vh"}}>
                <Typography component="h1" variant="h6">Please Donate a minimum of $20.00</Typography>
            <Stripe 
            stripeKey="pk_test_51OSAR4LPkhmZPGbFaiH5myo1LukiPzdLd6c25CPE9GogonLNjO23CjVXMdhEzoHcMWFR4jWxVSW8PRqN3CRvhvdt0076CmGsvN"
            token={tokenHandler}
            />
            </Box>
            </Container>
        </Box>
    );
}

export default Donations