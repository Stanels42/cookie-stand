'use strict';

//Seattle Min:23 Max:65 Avg:6.3
//Tokyo   Min:3  Max:24 Avg:1.2
//Dubai   Min:11 Max:28 Avg:3.7
//Paris   Min:20 Max:38 Avg:2.3
//Lima    Min:2  Max:16 Avg:4.6
//Operation Hours 6am - 8pm

function random(min, max) {

  //The '+ 1' is to make sure the random will have the chance to return the max value some of the time
  var difference = max - min + 1;

  return( Math.floor( Math.random() * difference) + min);

}

//Store: Seattle
var seattle = {

  //store name
  location: 'Seattle',
  //store min visits
  minVisits: 23,
  //store max visits
  maxVisits: 65,
  //avg sales per person
  avgSales: 6.3,
  //store open
  openTime: 6,
  //store close
  closeTime: 21,
  //sales per hour [array]
  salesPerHour: [],

  //Fill the salesPerHour Array with a value for each hour of operation
  calculateSales: function() {

    var hoursOpen = this.closeTime - this.openTime;

    for (var i = 0; i < hoursOpen; i++) {

      var visits = random(this.minVisits, this.maxVisits);
      this.salesPerHour.push(Math.round( visits * this.avgSales ) );

    }

    console.log(this.salesPerHour);

  },

  //Adding to the HTML
  render: function() {

    var totalSales = 0;

    var tag = document.getElementById('Seattle');

    var storeName = document.createElement('h3');

    storeName.textContent = this.location;

    tag.appendChild(storeName);

    var list = document.createElement('ul');
    tag.appendChild(list);

    for(var i = 0; i < this.salesPerHour.length; i++) {

      var li = document.createElement('li');

      var time = i + this.openTime;

      if(time < 12) {

        li.textContent = `${time}am: ${this.salesPerHour[i]} cookies`;

      } else if(time === 12) {

        li.textContent = `${time}pm: ${this.salesPerHour[i]} cookies`;

      } else {

        li.textContent = `${time - 12}pm: ${this.salesPerHour[i]} cookies`;

      }

      totalSales += this.salesPerHour[i];

      list.appendChild(li);

    }

    var total = document.createElement('li');

    total.textContent = `Total Sales: ${totalSales} cookies`;

    list.appendChild(total);

  },

};

//Store: Tokyo
//Store: Dubai
//Store: Paris
//Store: Lima

