'use strict';

//Seattle Min:23 Max:65 Avg:6.3
//Tokyo   Min:3  Max:24 Avg:1.2
//Dubai   Min:11 Max:28 Avg:3.7
//Paris   Min:20 Max:38 Avg:2.3
//Lima    Min:2  Max:16 Avg:4.6

//Operation Hours 6am (6) - 9pm (21)
const storeOpen = 6;
const storeClose = 21;

//Array to store all Stores
Store.all = [];

//Create the event listener
var userform = document.getElementById('Manual-Input');
console.log(userform);
userform.addEventListener('submit', manualInput);

/**
Object Declaration
*/

function Store (location, minVisits, maxVisits, avgSales) {

  //Assigning all parameters to variables
  this.location = location;
  this.minVisits = minVisits;
  this.maxVisits = maxVisits;
  this.avgSales = avgSales;

  //Default values for the object
  this.salesPerHour = [];
  this.salesTotal = 0;

  //Add this store to the list of stores
  Store.all.push(this);

  //populate the array for the daily sales
  this.calculateSales();

}

//Fill and array with each index being sales for a different hour
Store.prototype.calculateSales = function() {

  //Get the value for the total hours the store is open
  var hoursOpen = storeClose - storeOpen;

  //for each hour calculate the sales
  for (var i = 0; i < hoursOpen; i++) {

    var visits = this.random(this.minVisits, this.maxVisits);

    var sales = Math.round( visits * this.avgSales );

    this.salesTotal += sales;
    this.salesPerHour.push(sales);

  }

};

//Add the sales for a spific city to the table getting the row as a parameter
Store.prototype.render = function(row) {

  //Adding the name of the location
  var location = document.createElement('td');
  location.textContent = this.location;

  row.appendChild(location);

  //going through each hour and adding the value to the table
  for (var i = 0; i < this.salesPerHour.length; i++) {

    var sales = document.createElement('td');
    sales.textContent = this.salesPerHour[i];

    row.appendChild(sales);

  }

  //adding the daily total of this shop to the table at the end;
  var tableTotal = document.createElement('td');
  tableTotal.textContent = this.salesTotal;

  row.appendChild(tableTotal);

};

//getting the random number for visits between the min and the max inclusive
Store.prototype.random = function(min, max){

  //The '+ 1' is to make sure the random will be min/max inclusive
  var difference = max - min + 1;

  return( Math.floor( Math.random() * difference) + min);

};

/**
End Of Object
*/

//Called to print the entire table
function printTable () {

  //getting the table element from the HTML
  var table = document.getElementById('table');

  //remove the old table
  table.innerHTML = '';

  //Print the Times and the Labels for the Table
  printHeader(table);

  //Iterate through each store location
  for (var i = 0; i < Store.all.length; i++) {

    var row = document.createElement('tr');

    Store.all[i].render(row);

    table.appendChild(row);

  }

  //Add the hourly sales across all locations as well as the daily total
  printFooter(table);

}

function printHeader (table) {

  //Get the number of Hours that the store will be open
  var operationHours = storeClose - storeOpen;

  var row = document.createElement('tr');

  //print 'location'
  var locationTag = document.createElement('th');
  locationTag.textContent = 'Location';

  row.appendChild(locationTag);

  //Add all operation hours to the header of the table
  for (var i = 0; i < operationHours; i++) {
    //print times
    var newTH = document.createElement('th');

    var time = i + storeOpen;

    //Changes based on time of day
    if(time < 12) {

      newTH.textContent = `${time}am`;

    } else if(time === 12) {

      newTH.textContent = `${time}pm`;

    } else {

      newTH.textContent = `${time - 12}pm`;

    }

    //Add to the time to the row
    row.appendChild(newTH);

  }

  //Add an extra
  var dailyTotal = document.createElement('th');
  dailyTotal.textContent = 'Total Daily Sales';

  row.appendChild(dailyTotal);

  //Add entire row to table
  table.appendChild(row);

}

function printFooter (table) {

  //Track global sales
  var dailySaleTotal = 0;

  //create last row
  var row = document.createElement('tr');

  //Adding a label to that last row
  var rowLabel = document.createElement('td');
  rowLabel.textContent = 'Hourly Sales';

  row.appendChild(rowLabel);

  //Iterate each hour
  //Don't have an hours array to use so pulled an array from an object
  for (var i = 0; i < Store.all[0].salesPerHour.length; i++) {

    //Track the total sales between all stores that hour
    var hourlyTotal = 0;

    //Iterate for each store
    for (var j = 0; j < Store.all.length; j++) {

      //Add to the sum the value of the 'j' index city at 'i' index hour
      hourlyTotal += Store.all[j].salesPerHour[i];

    }

    //Add value to the global sales
    dailySaleTotal += hourlyTotal;

    //Add an element for the hourly total
    var displayTotal = document.createElement('td');
    displayTotal.textContent = hourlyTotal;

    row.appendChild(displayTotal);

  }

  //Add an element for the global sales total
  var displayDailyTotal = document.createElement('td');
  displayDailyTotal.textContent = dailySaleTotal;

  row.appendChild(displayDailyTotal);

  //Add entire row to table
  table.appendChild(row);

}

//get the input the user put into the web page
function manualInput(event) {
  
  event.preventDefault();

  var newLocation = event.target.location.value;
  var min = event.target.minVisits.value;
  var max = event.target.maxVisits.value;
  var avg = event.target.avgSales.value;

  //Create a new Store
  new Store(newLocation, min, max, avg);

  //Reprint the table with the new Store
  printTable();

  //Reset all text boxes to empty
  event.target.location.value = null;
  event.target.minVisits.value = null;
  event.target.maxVisits.value = null;
  event.target.avgSales.value = null;
}

//Create the Objects

//Seattle Min:23 Max:65 Avg:6.3
new Store('Seattle', 23, 65, 6.3);
//Tokyo   Min:3  Max:24 Avg:1.2
new Store('Tokyo', 3, 24, 1.2);
//Dubai   Min:11 Max:28 Avg:3.7
new Store('Dubai', 11, 28, 3.7);
//Paris   Min:20 Max:38 Avg:2.3
new Store('Paris', 20, 38, 2.3);
//Lima    Min:2  Max:16 Avg:4.6
new Store('Lima', 2, 16, 4.6);

//Print the tabeles for the sales data
printTable();
