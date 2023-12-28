const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedMeals` array in User.js
const mealSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    mealId: {
        type: String,
        required: true,
    },
    instructions: {
        type: String,
    },
    category: {
        type: String,
    },
    image: {
        type: String,
    },
    video: {
        type: String,
    },
    source: {
        type: String,
    },
    ingredient1: {
        type: String,
    },
    ingredient2: {
        type: String,
    },
    ingredient3: {
        type: String,
    },
    ingredient4: {
        type: String,
    },
    ingredient5: {
        type: String,
    },
    ingredient6: {
        type: String,
    },
    ingredient7: {
        type: String,
    },
    ingredient8: {
        type: String,
    },
    ingredient9: {
        type: String,
    },
    ingredient10: {
        type: String,
    },
    ingredient11: {
        type: String,
    },
    ingredient12: {
        type: String,
    },
    ingredient13: {
        type: String,
    },
    ingredient14: {
        type: String,
    },
    ingredient15: {
        type: String,
    },
    measure1: {
        type: String,
    },
    measure2: {
        type: String,
    },
    measure3: {
        type: String,
    },
    measure4: {
        type: String,
    },
    measure5: {
        type: String,
    },
    measure6: {
        type: String,
    },
    measure7: {
        type: String,
    },
    measure8: {
        type: String,
    },
    measure9: {
        type: String,
    },
    measure10: {
        type: String,
    },
    measure11: {
        type: String,
    },
    measure12: {
        type: String,
    },
    measure13: {
        type: String,
    },
    measure14: {
        type: String,
    },
    measure15: {
        type: String,
    },

});

module.exports = mealSchema;
