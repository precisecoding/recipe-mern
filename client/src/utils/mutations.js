import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($bookData: BookInput!) {
    saveBook(bookData: $bookData) {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        image
        description
        title
        link
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        image
        description
        title
        link
      }
    }
  }
`;

export const SAVE_MEAL = gql`
  mutation saveMeal($mealData: MealInput!) {
    saveMeal(mealData: $mealData) {
      _id
      username
      email
      savedMeals {
        mealId
        name
      category
      instructions
      image
      video
       ingredient1
        ingredient2
        ingredient3
        ingredient4
        ingredient5
        ingredient6
        ingredient7
        ingredient8
        ingredient9
        ingredient10
        ingredient11
        ingredient12
        ingredient13
        ingredient14
        ingredient15
        measure1
        measure2
        measure3
        measure4
        measure5
        measure6
        measure7
        measure8
        measure9
        measure10
        measure11
        measure12
        measure13
        measure14
        measure15
      }
    }
  }
`;

export const REMOVE_MEAL = gql`
  mutation removeMeal($mealId: ID!) {
    removeMeal(mealId: $mealId) {
      _id
      username
      email
      savedMeals {
        mealId
        name
      }
    }
  }
`;