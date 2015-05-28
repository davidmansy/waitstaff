/**
 * Created by davidmansy on 27/05/15.
 */
'use strict';

angular
.module('app')
.controller('Nav', Nav);

Nav.$inject = ['$location'];

function Nav($location) {

  var activeTabIndex = 0;

  var vm = this;
  vm.tabs = [
    {name: 'Home', route: '/home'},
    {name: 'New Meal', route: '/newmeal'},
    {name: 'My Earnings', route: '/earnings'}
  ];
  vm.getActiveTab = getActiveTab;
  vm.setActiveTab = setActiveTab;

  //If $location.path() is defined, it means the controller is created while being at a specific url
  //So we use the path to define the correct active tab
  if ($location.path()) {
    setActiveTab($location.path());
  }

  function getActiveTab(route) {
    return route === vm.tabs[activeTabIndex].route;
  }

  function setActiveTab(route) {
    angular.forEach(vm.tabs, function(tab, index) {
      if (route === tab.route) {
        activeTabIndex = index;
      }
    });
  }
}