import { MEALS } from "../../data/dummy-data";
import { TOGGLE_FAVORITES, SET_FILTERS } from "../actions/meals";

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: []
};

const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITES:
      const existingIndex = state.favoriteMeals.findIndex(
        meal => meal.id === action.mealId
      );
      if (existingIndex >= 0) {
        const updatedFavMeals = [...state.favoriteMeals];
        updatedFavMeals.splice(existingIndex, 1);
        return { ...state, favoriteMeals: updatedFavMeals };
      } else {
        const meal = state.meals.find(meal => meal.id === action.mealId);
        return { ...state, favoriteMeals: state.favoriteMeals.concat(meal) };
      }
    case SET_FILTERS:
      const appliedFilter = action.filters;
      const filteredMeals = state.meals.filter(meal => {
        if (appliedFilter.isGlutenFree && !meal.isGlutenFree) {
          return false;
        }
        if (appliedFilter.isLactoseFree && !meal.isLactoseFree) {
          return false;
        }
        if (appliedFilter.isVegan && !meal.isVegan) {
          return false;
        }
        if (appliedFilter.isVegetarian && !meal.isVegetarian) {
          return false;
        }
        return true;
      });
      return { ...state, filteredMeals };
    default:
      return state;
  }
};

export default mealsReducer;
