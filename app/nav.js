/**
 * Created by davidmansy on 27/05/15.
 */
'use strict';

angular
.module('app')
.controller('Nav', Nav);

function Nav() {

  var activeTabIndex = 0;
  var vm = this;
  vm.tabs = [
    {name: 'Home', route: 'home'},
    {name: 'New Meal', route: 'newmeal'},
    {name: 'My Earnings', route: 'earnings'}
  ];
  vm.getActiveTab = getActiveTab;
  vm.setActiveTab = setActiveTab;

  function getActiveTab(tabName) {
    return tabName === vm.tabs[activeTabIndex].name;
  }

  function setActiveTab(tabName) {
    angular.forEach(vm.tabs, function(tab, index) {
      if (tabName === tab.name) {
        activeTabIndex = index;
      }
    });
  }
}