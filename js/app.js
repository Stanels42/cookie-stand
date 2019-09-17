'use strict';

//Seattle Min:23 Max:65 Avg:6.3
//Tokyo   Min:3  Max:24 Avg:1.2
//Dubai   Min:11 Max:28 Avg:3.7
//Paris   Min:20 Max:38 Avg:2.3
//Lima    Min:2  Max:16 Avg:4.6
//Operation Hours 6am - 9pm
const storeOpen = 6;
const storeClose = 21;

function random(min, max) {

  //The '+ 1' is to make sure the random will have the chance to return the max value some of the time
  var difference = max - min + 1;

  return( Math.floor( Math.random() * difference) + min);

}

function Store (location, minVisits, maxVisits, avgSales) {
  this.location = location;
  this.minVisits = minVisits;
  this.maxVisits = maxVisits;
  this.avgSales = avgSales;
  this.salesPerHour = [];
  this.salesTotal = 0;
  Store.all.push(this);
}

Store.all = [];

Store.prototype.calculateSales = function() {

  var hoursOpen = storeClose - storeOpen;

  for (var i = 0; i < hoursOpen; i++) {

    var visits = random(this.minVisits, this.maxVisits);

    var sales = Math.round( visits * this.avgSales );

    this.salesTotal += sales;
    this.salesPerHour.push(sales);

  }

};

Store.prototype.render = function(row) {

  var location = document.createElement('td');

  location.textContent = this.location;

  row.appendChild(location);

  for (var i = 0; i < this.salesPerHour.length; i++) {

    var sales = document.createElement('td');

    sales.textContent = this.salesPerHour[i];

    row.appendChild(sales);

  }

  var tableTotal = document.createElement('td');

  tableTotal.textContent = this.salesTotal;

  row.appendChild(tableTotal);

};

//array of all stores

function printTable () {

  console.log('printing table');

  var table = document.getElementById('table');
  console.log(table);

  printHeader(table);

  for (var i = 0; i < Store.all.length; i++) {

    var row = document.createElement('tr');

    Store.all[i].calculateSales();
    Store.all[i].render(row);

    table.appendChild(row);

  }

  //printFooter(table);

}

function printHeader (table) {

  var operationHours = storeClose - storeOpen;

  var row = document.createElement('tr');

  //print 'location'
  var locationTag = document.createElement('th');
  locationTag.textContent = 'Location';

  row.appendChild(locationTag);

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

  var dailyTotal = document.createElement('th');
  dailyTotal.textContent = 'Total Daily Sales';

  row.appendChild(dailyTotal);

  table.appendChild(row);

}

function printFooter (table) {

  var row = document.createElement('tr');



  table.appendChild(row);

}

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

console.log('reached print');
printTable();

// //Store total dayly sales
// var totalSales = 0;

// //Get the Seattle tag in HTML
// var tag = document.getElementById(this.location);

// //Make the header for the store location and the list for the sales
// var storeName = document.createElement('h3');
// var list = document.createElement('ul');

// storeName.textContent = this.location;

// tag.appendChild(storeName);
// tag.appendChild(list);

// //Making the list of sales
// for(var i = 0; i < this.salesPerHour.length; i++) {

  //   var li = document.createElement('li');

  //   var time = i + storeOpen;

  //   //Changes based on time of day
//   if(time < 12) {

//     li.textContent = `${time}am: ${this.salesPerHour[i]} cookies`;

//   } else if(time === 12) {

//     li.textContent = `${time}pm: ${this.salesPerHour[i]} cookies`;

//   } else {

//     li.textContent = `${time - 12}pm: ${this.salesPerHour[i]} cookies`;

//   }

//   totalSales += this.salesPerHour[i];

//   list.appendChild(li);

// }

// var total = document.createElement('li');

// total.textContent = `Total Sales: ${totalSales} cookies`;

// list.appendChild(total);