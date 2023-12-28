export const getSavedBookIds = () => {
  const savedBookIds = localStorage.getItem('saved_books')
    ? JSON.parse(localStorage.getItem('saved_books'))
    : [];

  return savedBookIds;
};

export const saveBookIds = (bookIdArr) => {
  if (bookIdArr.length) {
    localStorage.setItem('saved_books', JSON.stringify(bookIdArr));
  } else {
    localStorage.removeItem('saved_books');
  }
};

export const removeBookId = (bookId) => {
  const savedBookIds = localStorage.getItem('saved_books')
    ? JSON.parse(localStorage.getItem('saved_books'))
    : null;

  if (!savedBookIds) {
    return false;
  }

  const updatedSavedBookIds = savedBookIds?.filter((savedBookId) => savedBookId !== bookId);
  localStorage.setItem('saved_books', JSON.stringify(updatedSavedBookIds));

  return true;
};

export const getSavedMealIds = () => {
  const savedMealIds = localStorage.getItem('saved_meals')
    ? JSON.parse(localStorage.getItem('saved_meals'))
    : [];

  return savedMealIds;
};

export const saveMealIds = (mealIdArr) => {
  if (mealIdArr.length) {
    localStorage.setItem('saved_meals', JSON.stringify(mealIdArr));
  } else {
    localStorage.removeItem('saved_meals');
  }
};

export const removeMealId = (mealId) => {
  const savedMealIds = localStorage.getItem('saved_meals')
    ? JSON.parse(localStorage.getItem('saved_meals'))
    : null;

  if (!savedMealIds) {
    return false;
  }

  const updatedSavedMealIds = savedMealIds?.filter((savedMealId) => savedMealId !== mealId);
  localStorage.setItem('saved_meals', JSON.stringify(updatedSavedMealIds));

  return true;
};