import React from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import { CATEGORIES } from "../data/dummy-data";
import MealList from "../components/MealList";
import DefaultText from "../components/DefaultText";

const CategoryMealScreen = props => {
  const categoryId = props.navigation.getParam("categoryId");
  const availableMeals = useSelector(state => state.meals.filteredMeals);
  const displayMeal = availableMeals.filter(
    obj => obj.categoryIds.indexOf(categoryId) >= 0
  );
  if (!displayMeal || displayMeal.length === 0) {
    return (
      <View style={styles.container}>
        <DefaultText>No meals found. Please check filters!!!</DefaultText>
      </View>
    );
  }
  return <MealList listData={displayMeal} navigation={props.navigation} />;
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" }
});

CategoryMealScreen.navigationOptions = navigateData => {
  const categoryId = navigateData.navigation.getParam("categoryId");
  const selectCategory = CATEGORIES.find(obj => categoryId === obj.id);
  return {
    headerTitle: selectCategory.title
  };
};

export default CategoryMealScreen;
