import { Box, CardMedia, Container, Link, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {useParams } from 'react-router-dom'



const RecipeDetails = () => {
    const [meal, setMeal] = useState()
    const { id } = useParams()
    // useEffect runs when recipeDetails component renders in the browser, useParams() returns data object matched from url path determined by user search, useState() is storing data in meal using setMeal, useEffect() dependency is [id], will only activate if value of id changes, response is data from request being converted into json(), .then(data) storing data in setMeal(data).
    useEffect(() => {
        fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id)
            .then(response => response.json())
            .then((data) => {
                setMeal(data.meals[0])
                console.log(data.meals[0])
            })
    }, [id])


    return (
        <Box sx={{ padding: "10px" }}>
            <Container>
                {/* {meal?.strMeal} ? is checking if the meal state has data before moving forward...without this page was crashing cause it was trying to show data that hadnt rendered yet.*/}
                <Typography component="h2" variant="h2" sx={{fontSize:{xs:"22px", md:"28px"}, marginBottom:"20px"}}>
                    {meal?.strMeal}
                </Typography>
                <CardMedia
                    image={meal?.strMealThumb}
                    component="img"
                    alt={`The cover for ${meal?.strMeal}`}
                    width={500}
                    height={350}
                    variant="top"
                    sx={{objectFit:"contain", margin:"0 auto 20px 0", width:"fit-content"}}
                />
                <Typography component="p" variant="body1" className="small">Category: {meal?.strCategory}</Typography>
                <Typography component="h3" variant="h5">
                    Ingredients and Measurements:
                </Typography>
                {meal?.strIngredient1 && <Typography component="span" variant="body1">
                    {meal?.strMeasure1} {meal?.strIngredient1},
                </Typography>
                }
                {meal?.strIngredient2 && <Typography component="span" variant="body1">
                    {meal?.strMeasure2} {meal?.strIngredient2},
                </Typography>
                }
                {meal?.strIngredient3 && <Typography component="span" variant="body1">
                    {meal?.strMeasure3} {meal?.strIngredient3},
                </Typography>
                }
                {meal?.strIngredient4 && <Typography component="span" variant="body1">
                    {meal?.strMeasure4} {meal?.strIngredient4},
                </Typography>
                }
                {meal?.strIngredient5 && <Typography component="span" variant="body1">
                    {meal?.strMeasure5} {meal?.strIngredient5},
                </Typography>
                }
                {meal?.strIngredient6 && <Typography component="span" variant="body1">
                    {meal?.strMeasure6} {meal?.strIngredient6},
                </Typography>
                }
                {meal?.strIngredient7 && <Typography component="span" variant="body1">
                    {meal?.strMeasure7} {meal?.strIngredient7},
                </Typography>
                }
                {meal?.strIngredient8 && <Typography component="span" variant="body1">
                    {meal?.strMeasure8} {meal?.strIngredient8},
                </Typography>
                }
                {meal?.strIngredient9 && <Typography component="span" variant="body1">
                    {meal?.strMeasure9} {meal?.strIngredient9},
                </Typography>
                }
                {meal?.strIngredient10 && <Typography component="span" variant="body1">
                    {meal?.strMeasure10} {meal?.strIngredient10},
                </Typography>
                }
                {meal?.strIngredient11 && <Typography component="span" variant="body1">
                    {meal?.strMeasure11} {meal?.strIngredient11},
                </Typography>
                }
                {meal?.strIngredient12 && <Typography component="span" variant="body1">
                    {meal?.strMeasure12} {meal?.strIngredient12},
                </Typography>
                }
                {meal?.strIngredient13 && <Typography component="span" variant="body1">
                    {meal?.strMeasure13} {meal?.strIngredient13},
                </Typography>
                }
                {meal?.strIngredient14 && <Typography component="span" variant="body1">
                    {meal?.strMeasure14} {meal?.strIngredient14},
                </Typography>
                }
                {meal?.strIngredient15 && <Typography component="span" variant="body1">
                    {meal?.strMeasure15} {meal?.strIngredient15}
                </Typography>
                }
                <Typography component="p" variant="body1">{meal?.strInstructions}</Typography>
                <Typography component="p" variant="body1"><Link href={meal?.strYoutube} target="_blank">Watch Detailed Video On Youtube</Link></Typography>
                <Typography component="p" variant="body1"><Link href={meal?.strSource} target="_blank">Source</Link></Typography>
            </Container>
        </Box>

    )
}

export default RecipeDetails