/**
 * Created by davidmansy on 27/05/15.
 */
'use strict';

angular
.module('app')
.controller('Earnings', Earnings);

Earnings.$inject = ['meals'];

function Earnings(meals) {

  var vm = this;
  vm.mealStats = meals.getStats();
  vm.reset = reset;

  function reset() {
    meals.initMealsData();
  };
}


