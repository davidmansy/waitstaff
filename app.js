/**
 * Created by davidmansy on 05/05/15.
 */
'use strict';

angular
.module('app', ['ngMessages'])
.controller('Main', Main);

//Meal constructor function
function Meal(mealPrice, taxRate, tipPercentage) {
  this.mealPrice = mealPrice;
  this.taxRate = taxRate;
  this.tipPercentage = tipPercentage;
  this.subTotal = mealPrice + (mealPrice * taxRate / 100);
  this.tip = this.subTotal * tipPercentage / 100;
  this.total = this.subTotal + this.tip;
}

//Main controller function
function Main($scope) {

  //Data
  var meals = {};
  meals.stats = {};

  var initMealsData = function() {
    meals.listOfMeals = [];
    meals.stats.totalTips = 0;
    meals.stats.count = meals.listOfMeals.length;
    meals.stats.averageTipPerMeal = 0;
  };

  var updateStats = function(tip) {
    meals.stats.totalTips += tip;
    meals.stats.count = meals.listOfMeals.length;
    meals.stats.averageTipPerMeal = meals.stats.totalTips / meals.stats.count;
  };

  var addMeal = function (mealPrice, taxRate, tipPercentage) {
    //Add the new meal to the list and update the reporting indicators
    var meal = new Meal(mealPrice, taxRate, tipPercentage);
    meals.listOfMeals.push(meal);
    updateStats(meal.tip);
    return meal;
  };

  //Page init
  var init = function() {
    initMealsData();
    initMealForm();
    initLastMeal();
  };

  //Display
  var initMealForm = function () {
    vm.mealPrice = 0;
    vm.taxRate = 0;
    vm.tipPercentage = 0;
    if ($scope.mealForm) {
      $scope.mealForm.$submitted = false;
    }
  };

  var initLastMeal = function () {
    vm.lastMeal = {
      subTotal: 0,
      tip: 0,
      total: 0
    };
  };

  var updateLastMeal = function (newMeal) {
    vm.lastMeal.subTotal = newMeal.subTotal;
    vm.lastMeal.tip = newMeal.tip;
    vm.lastMeal.total = newMeal.total;
  };

  var vm = this;
  vm.mealStats = meals.stats;
  init();

  vm.submitMeal = function () {
    if ($scope.mealForm.$valid) {
      var newMeal = addMeal(vm.mealPrice, vm.taxRate, vm.tipPercentage);
      updateLastMeal(newMeal);
    }
  };

  vm.cancel = function () {
    initMealForm();
  };

  vm.reset = function () {
    init();
  };

  vm.isInvalid = function (field) {
    return $scope.mealForm && $scope.mealForm.$submitted && $scope.mealForm[field].$invalid;
  };

  vm.hasError = function (field, errorType) {
    return $scope.mealForm && $scope.mealForm.$submitted && $scope.mealForm[field].$error[errorType];
  };
}