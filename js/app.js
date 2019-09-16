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
  closeTime: 20,
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

    var tag = document.getElementById('Seattle');

    var list = document.createElement('ul');
    tag.appendChild(list);

    for(var i = 0; i < this.salesPerHour.length; i++) {

      console.log(this.salesPerHour[i]);

      var li = document.createElement('li');

      li.textContent = this.salesPerHour[i];

      list.appendChild(li);

    }

  },

};

//Store: Tokyo
//Store: Dubai
//Store: Paris
//Store: Lima

