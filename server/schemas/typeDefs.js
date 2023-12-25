const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String
    savedMeals: [Meal]
  }

  type Meal {
    mealId: ID!
    name: String!
    instructions: String
    category: String
    image: String
    video: String
    ingredient1: String
    ingredient2: String
    ingredient3: String
    ingredient4: String
    ingredient5: String
    ingredient6: String
    ingredient7: String
    ingredient8: String
    ingredient9: String
    ingredient10: String
    ingredient11: String
    ingredient12: String
    ingredient13: String
    ingredient14: String
    ingredient15: String
    measure1: String
    measure2: String
    measure3: String
    measure4: String
    measure5: String
    measure6: String
    measure7: String
    measure8: String
    measure9: String
    measure10: String
    measure11: String
    measure12: String
    measure13: String
    measure14: String
    measure15: String
  }

  type Auth {
    token: ID!
    user: User
  }

  input MealInput {
    mealId: String!
    name: String!
    instructions: String
    category: String
    image: String
    video: String
    ingredient1: String
    ingredient2: String
    ingredient3: String
    ingredient4: String
    ingredient5: String
    ingredient6: String
    ingredient7: String
    ingredient8: String
    ingredient9: String
    ingredient10: String
    ingredient11: String
    ingredient12: String
    ingredient13: String
    ingredient14: String
    ingredient15: String
    measure1: String
    measure2: String
    measure3: String
    measure4: String
    measure5: String
    measure6: String
    measure7: String
    measure8: String
    measure9: String
    measure10: String
    measure11: String
    measure12: String
    measure13: String
    measure14: String
    measure15: String
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveMeal(mealData: MealInput!): User
    removeMeal(mealId: ID!): User
  }
`;

module.exports = typeDefs;
