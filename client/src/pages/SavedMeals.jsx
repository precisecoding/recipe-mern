
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_MEAL } from '../utils/mutations';
import { removeMealId } from '../utils/localStorage';

import Auth from '../utils/auth';
import { Box, Button, Card, CardContent, CardMedia, Container, Grid, Link, Typography } from '@mui/material';

const SavedMeals = () => {
    const { loading, data } = useQuery(QUERY_ME);
    const [removeMeal, { error }] = useMutation(REMOVE_MEAL);

    const userData = data?.me || {};

    // create function that accepts the meal's mongo _id value as param and deletes the meal from the database
    const handleDeleteMeal = async (mealId) => {
        // get token
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
            return false;
        }
        try {
            const { data } = await removeMeal({
                variables: { mealId },
            });
            // upon success, remove meal's id from localStorage
            removeMealId(mealId);
        } catch (err) {
            console.error(err);
        }
    };
    if (loading) {
        return <h2>LOADING...</h2>;
    }
    return (
        <Box sx={{ padding: "10px" }}>
            <Container >
                <Typography variant="h2" component="h6" sx={{marginBottom:"20px", fontSize:{xs:"22px", md:"28px"}}}>
                    Viewing {userData.username}'s Recipes!
                </Typography>
                <Typography variant="h3" component="h6" sx={{marginBottom:"20px", fontSize:{xs:"22px", md:"28px"}}}>
                    {userData.savedMeals?.length
                        ? `Viewing ${userData.savedMeals.length} saved ${userData.savedMeals.length === 1 ? 'meal' : 'meals'
                        }:`
                        : 'You have no saved meals!'}
                </Typography>
                <Box>
                    <Box sx={{ display: "grid", gridTemplateColumns: {xs:"1fr", md:"1fr 1fr 1fr"}, gap: "20px" }}>
                        {userData.savedMeals == null ? <Typography component="h3" variant="h3">No Recipes Found!</Typography> : userData.savedMeals.map((meal, id) => {
                            return (
                                <Grid item md={4} key={id}>
                                    <Card border="dark" className='mb-3'>
                                        {meal.image ? (
                                            <CardMedia
                                                image={meal.image}
                                                component="img"
                                                alt={`The cover for ${meal.name}`}
                                                width={300}
                                                height={250}
                                                variant="top"
                                            />
                                        ) : null}
                                        <CardContent>
                                            <Typography component="h3" variant="h3" sx={{fontSize:{xs:"22px", md:"28px"}}}>{meal.name}</Typography>
                                            <Typography component="p" variant="body1" className="small">Category: {meal.category}</Typography>
                                            <Typography component="p" variant="body1">{meal.instructions}</Typography>

                                            {/* // check if user is authorized before displaying button */}
                                            {Auth.loggedIn() && (
                                                <Box>
                                                   <Button variant="contained" color="error" onClick={() => handleDeleteMeal(meal.mealId)}>
                                                    Delete This Recipe
                                                   </Button>
                                                </Box>
                                            )}
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Box>
                </Box>
            </Container>

        </Box>
    );
};

export default SavedMeals;