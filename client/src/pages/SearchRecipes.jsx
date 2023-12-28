import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_MEAL } from '../utils/mutations';
import { saveMealIds, getSavedMealIds } from '../utils/localStorage';
import Auth from '../utils/auth';
import { Box, Button, Card, CardContent, CardMedia, Container, Grid, Link, TextField, Typography } from '@mui/material';

const SearchRecipes = () => {
    // create state for holding returned google api data
    const [searchedMeals, setSearchedMeals] = useState([]);
    // create state for holding our search field data
    const [searchInput, setSearchInput] = useState('');
    // create state to hold saved mealId values
    const [savedMealIds, setSavedMealIds] = useState(getSavedMealIds());
    const [saveMeal, { error }] = useMutation(SAVE_MEAL);
    // set up useEffect hook to save `savedMealIds` list to localStorage on component unmount
    // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
    useEffect(() => {
        return () => saveMealIds(savedMealIds);
    });
    // create method to search for meals and set state on form submit
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (!searchInput) {
            return false;
        }
        try {
            const response = await fetch(
                `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`
            );
            if (!response.ok) {
                throw new Error('something went wrong!');
            }
            const { meals } = await response.json();
            console.log(meals)

            setSearchedMeals(meals);
            console.log(meals)
            setSearchInput('');
        } catch (err) {
            console.error(err);
        }
    };
    // create function to handle saving a meal to our database
    async function handleSaveMeal(idMeal) {
        // find the meal in `searchedMeals` state by the matching id
        const mealToSave = searchedMeals.find((meal) => meal.idMeal === idMeal);
        const mealToSaveObject = {
            name: mealToSave.strMeal,
            mealId: mealToSave.idMeal,
            instructions: mealToSave.strInstructions || ['No recipe instructions to display'],
            category: mealToSave.strCategory,
            image: mealToSave.strMealThumb,
            video: mealToSave.strYoutube || '',
            ingredient1: mealToSave.strIngredient1,
            ingredient2: mealToSave.strIngredient2,
            ingredient3: mealToSave.strIngredient3,
            ingredient4: mealToSave.strIngredient4,
            ingredient5: mealToSave.strIngredient5,
            ingredient6: mealToSave.strIngredient6,
            ingredient7: mealToSave.strIngredient7,
            ingredient8: mealToSave.strIngredient8,
            ingredient9: mealToSave.strIngredient9,
            ingredient10: mealToSave.strIngredient10,
            ingredient11: mealToSave.strIngredient11,
            ingredient12: mealToSave.strIngredient12,
            ingredient13: mealToSave.strIngredient13,
            ingredient14: mealToSave.strIngredient14,
            ingredient15: mealToSave.strIngredient15,
            measure1: mealToSave.strMeasure1,
            measure2: mealToSave.strMeasure2,
            measure3: mealToSave.strMeasure3,
            measure4: mealToSave.strMeasure4,
            measure5: mealToSave.strMeasure5,
            measure6: mealToSave.strMeasure6,
            measure7: mealToSave.strMeasure7,
            measure8: mealToSave.strMeasure8,
            measure9: mealToSave.strMeasure9,
            measure10: mealToSave.strMeasure10,
            measure11: mealToSave.strMeasure11,
            measure12: mealToSave.strMeasure12,
            measure13: mealToSave.strMeasure13,
            measure14: mealToSave.strMeasure14,
            measure15: mealToSave.strMeasure15,
        };
        console.log(mealToSaveObject, "meal to save object");
        // get token
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
            return false;
        }
        try {
            const { data } = await saveMeal({
                variables: { mealData: { ...mealToSaveObject } },
            });
            console.log(mealToSaveObject.mealId);
            console.log(savedMealIds);
            saveMealIds([...savedMealIds, mealToSaveObject.mealId]);
            setSavedMealIds([...savedMealIds, mealToSaveObject.mealId]);
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <>
            <Box sx={{ padding: "10px" }}>
                <Container>
                    <Typography component="h2" variant="h4">Search for Recipes!</Typography>
                    <Box component="form" onSubmit={handleFormSubmit}>
                        <Box>
                            <Grid item xs={12} md={8}>
                                <TextField
                                    name="search"
                                    required
                                    fullWidth
                                    id="search"
                                    label="search"
                                    placeholder='search'
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Button
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    type="submit">
                                    Submit Search
                                </Button>
                            </Grid>
                        </Box>
                    </Box>
                    {/* prompt for users to log in or sign up to view more details and save search */}
                    <Box sx={{ marginTop: "20px" }}>
                        {!Auth.loggedIn() && searchedMeals.length > 0 && <Typography component="p" variant="body1">
                            Please login to view the details and save your results.</Typography>}
                    </Box>
                </Container>
            </Box>

            <Container>
                <h2 className='pt-5'>
                    {searchedMeals?.length 
                        ? `Viewing ${searchedMeals.length} results:`
                        : 'Search for a recipe to begin'}
                </h2>
                <Box sx={{ display: "grid", gridTemplateColumns: {xs:"1fr", md:"1fr 1fr 1fr"}, gap: "20px" }}>

                    {searchedMeals == null ? <Typography component="h3" variant="h6">No Recipes Found!</Typography> : searchedMeals.map((meal) => {
                        return (
                            <Grid item md={4} key={meal.idMeal}>
                                <Card border="dark" className='mb-3'>
                                    {meal.strMealThumb ? (
                                        <CardMedia
                                            image={meal.strMealThumb}
                                            component="img"
                                            alt={`The cover for ${meal.strMeal}`}
                                            width={300}
                                            height={250}
                                            variant="top"
                                        />
                                    ) : null}
                                    <CardContent>
                                        <Typography component="h3" variant="h6">{meal.strMeal}</Typography>
                                        <Typography component="p" variant="body1" className="small">Category: {meal.strCategory}</Typography>
                                        <Typography component="p" variant="body1">{meal.strInstructions}</Typography>

                                        {/* // check if user is authorized before displaying button */}
                                        {Auth.loggedIn() && (
                                            <Box>
                                                <Link  color="primary" sx={{marginRight:"10px"}} href={`/recipedetails/${meal.idMeal}`}>
                                                    <Button variant="contained" color="primary">
                                                    View Details
                                                    </Button>
                                                </Link>
                                                <Button
                                                    disabled={savedMealIds?.some(
                                                        (savedId) => savedId === meal.idMeal
                                                    )}
                                                    variant="contained"
                                                    color="success"
                                                    onClick={() => handleSaveMeal(meal.idMeal)}
                                                >
                                                    {savedMealIds?.some((savedId) => savedId === meal.idMeal)
                                                        ? 'Recipe Already Saved!'
                                                        : 'Save This Recipe!'}
                                                </Button>
                                            </Box>
                                        )}
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}
                </Box>
            </Container>
        </>
    );
};

export default SearchRecipes;
