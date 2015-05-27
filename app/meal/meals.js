/**
 * Created by davidmansy on 27/05/15.
 */
'use strict';

angular
.module('app')
.factory('meals', meals);

//Service function
function meals() {

  var meals = {};
  meals.stats = {};
  initMealsData();

  var service = {
    initMealsData: initMealsData,
    updateStats: updateStats,
    getStats: getStats,
    addMeal: addMeal
  };

  return service;

  function initMealsData() {
    meals.listOfMeals = [];
    meals.stats.totalTips = 0;
    meals.stats.count = meals.listOfMeals.length;
    meals.stats.averageTipPerMeal = 0;
  }

  function updateStats(tip) {
    meals.stats.totalTips += tip;
    meals.stats.count = meals.listOfMeals.length;
    meals.stats.averageTipPerMeal = meals.stats.totalTips / meals.stats.count;
  }

  function getStats() {
    return meals.stats;
  }

  function addMeal(mealPrice, taxRate, tipPercentage) {
    //Add the new meal to the list and update the reporting indicators
    var meal = new Meal(mealPrice, taxRate, tipPercentage);
    meals.listOfMeals.push(meal);
    updateStats(meal.tip);
    return meal;
  }

}

//Meal constructor function
function Meal(mealPrice, taxRate, tipPercentage) {
  this.mealPrice = mealPrice;
  this.taxRate = taxRate;
  this.tipPercentage = tipPercentage;
  this.subTotal = mealPrice + (mealPrice * taxRate / 100);
  this.tip = this.subTotal * tipPercentage / 100;
  this.total = this.subTotal + this.tip;
}