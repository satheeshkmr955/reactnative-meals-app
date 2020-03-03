import React, { useEffect, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/HeaderButton";
import DefaultText from "../components/DefaultText";
import { toggleFavorites } from "../store/actions/meals";

const ListItem = props => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  );
};

const MealDetailScreen = props => {
  const mealId = props.navigation.getParam("mealId");
  const availableMeals = useSelector(state => state.meals.meals);
  const favoriteMeal = useSelector(state =>
    state.meals.favoriteMeals.some(meal => meal.id === mealId)
  );
  const selectMeal = availableMeals.find(obj => obj.id === mealId);

  const dispatch = useDispatch();

  const toggleHandler = useCallback(() => {
    dispatch(toggleFavorites(mealId));
  }, [dispatch, mealId]);

  useEffect(() => {
    props.navigation.setParams({ toggleHandler: toggleHandler });
  }, [toggleHandler]);

  useEffect(() => {
    props.navigation.setParams({ isFavorite: favoriteMeal });
  }, [favoriteMeal]);

  return (
    <ScrollView>
      <Image source={{ uri: selectMeal.imageUrl }} style={styles.image} />
      <View style={{ ...styles.row, ...styles.detail }}>
        <DefaultText>{selectMeal.duration} MINUTES</DefaultText>
        <DefaultText>{selectMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectMeal.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {selectMeal.ingredients.map(ingredient => (
        <ListItem key={ingredient}>{ingredient}</ListItem>
      ))}
      <Text style={styles.title}>Steps</Text>
      {selectMeal.steps.map(step => (
        <ListItem key={step}>{step}</ListItem>
      ))}
    </ScrollView>
  );
};

MealDetailScreen.navigationOptions = navigationData => {
  // const mealId = navigationData.navigation.getParam("mealId");
  // const selectMeal = MEALS.find(obj => obj.id === mealId);
  const mealTitle = navigationData.navigation.getParam("mealTitle");
  const toggleHandler = navigationData.navigation.getParam("toggleHandler");
  const isFavorite = navigationData.navigation.getParam("isFavorite");
  return {
    headerTitle: mealTitle,
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Favorite"
          iconName={isFavorite ? "ios-star" : "ios-star-outline"}
          onPress={toggleHandler}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200
  },
  detail: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-around"
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    textAlign: "center"
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: "#ccc",
    borderWidth: 1
  }
});

export default MealDetailScreen;
