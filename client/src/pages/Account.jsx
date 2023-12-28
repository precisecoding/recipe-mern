
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

import { Box, Container, Typography } from '@mui/material';

const Account = () => {
    const { loading, data } = useQuery(QUERY_ME);
    const userData = data?.me || {};
    if (loading) {
        return <h2>LOADING...</h2>;
    }
    return (
        <Box sx={{ padding: "10px" }}>
            <Container >
                <Typography variant="h2" component="h4" sx={{ marginBottom: "20px" }}>
                    {userData.username} Account!
                </Typography>
                <Typography variant="h3" component="h6" sx={{ marginBottom: "20px" }}>
                    {userData.savedMeals?.length
                        ? `You have ${userData.savedMeals.length} saved ${userData.savedMeals.length === 1 ? 'meal' : 'meals'
                        }`
                        : 'You have no saved meals!'}
                </Typography>
            </Container>

        </Box>
    );
};

export default Account;