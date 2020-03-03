import React from "react";
import { Platform, Text } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Ionicons } from "@expo/vector-icons";

import CategoriesScreen from "../screen/CategoriesScreen";
import CategoryMealScreen from "../screen/CategoryMealScreen";
import MealDetailScreen from "../screen/MealDetailScreen";
import FavoritesScreen from "../screen/FavoritesScreen";
import FiltersScreen from "../screen/FiltersScreen";
import Colors from "../constants/Colors";

const defaultStackOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : ""
  },
  headerTitleStyle: { fontFamily: "open-sans-bold" },
  headerBackTitleStyle: { fontFamily: "open-sans" },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor
};

const MealsNavigator = createStackNavigator(
  {
    Categories: { screen: CategoriesScreen },
    CategoryMeal: { screen: CategoryMealScreen },
    MealDetail: { screen: MealDetailScreen }
  },
  {
    defaultNavigationOptions: defaultStackOptions
  }
);

const FavoriteNavigator = createStackNavigator(
  {
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen
  },
  {
    defaultNavigationOptions: defaultStackOptions
  }
);

const FilterNavigator = createStackNavigator(
  {
    Filters: FiltersScreen
  },
  {
    defaultNavigationOptions: defaultStackOptions
  }
);

const tabConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Colors.primaryColor,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans-bold" }}>Meals</Text>
        ) : (
          "Meals"
        )
    }
  },
  Favorite: {
    screen: FavoriteNavigator,
    navigationOptions: {
      tabBarLabel: "Favorite!",
      tabBarIcon: tabInfo => {
        return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.secondaryColor,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans-bold" }}>Favorites!</Text>
        ) : (
          "Favorites!"
        )
    }
  }
};

const MealTabNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(tabConfig, {
        activeTintColor: "white",
        shifting: true
      })
    : createBottomTabNavigator(tabConfig, {
        tabBarOptions: {
          labelStyle: { fontFamily: "open-sans-bold" },
          activeTintColor: Colors.primaryColor
        }
      });

const MainNavigation = createDrawerNavigator(
  {
    MealsFav: {
      screen: MealTabNavigator,
      navigationOptions: { drawerLabel: "Meals" }
    },
    Filter: FilterNavigator
  },
  {
    contentOptions: {
      activeTintColor: Colors.secondaryColor
    }
  }
);

export default createAppContainer(MainNavigation);
