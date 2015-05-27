/**
 * Created by davidmansy on 27/05/15.
 */
'use strict';

angular
.module('app')
.controller('NewMeal', NewMeal);

NewMeal.$inject = ['$scope', 'meals'];

//Main controller function
function NewMeal($scope, meals) {

  //View Model Interface
  var vm = this;
  vm.mealStats = meals.getStats;
  vm.submitMeal = submitMeal;
  vm.cancel = cancel;
  vm.isInvalid = isInvalid;
  vm.hasError = hasError;
  init();

  //View Model Functions
  function submitMeal() {
    if ($scope.mealForm.$valid) {
      var newMeal = meals.addMeal(vm.mealPrice, vm.taxRate, vm.tipPercentage);
      updateLastMeal(newMeal);
    }
  }

  function cancel() {
    initMealForm();
  }

  function isInvalid(field) {
    return $scope.mealForm && $scope.mealForm.$submitted && $scope.mealForm[field].$invalid;
  }

  function hasError(field, errorType) {
    return $scope.mealForm && $scope.mealForm.$submitted && $scope.mealForm[field].$error[errorType];
  }

  //Helper functions
  function init() {
    initMealForm();
    initLastMeal();
  }

  function initMealForm() {
    vm.mealPrice = 0;
    vm.taxRate = 0;
    vm.tipPercentage = 0;
    if ($scope.mealForm) {
      $scope.mealForm.$submitted = false;
    }
  }

  function initLastMeal() {
    vm.lastMeal = {
      subTotal: 0,
      tip: 0,
      total: 0
    };
  }

  function updateLastMeal(newMeal) {
    vm.lastMeal.subTotal = newMeal.subTotal;
    vm.lastMeal.tip = newMeal.tip;
    vm.lastMeal.total = newMeal.total;
  }

}