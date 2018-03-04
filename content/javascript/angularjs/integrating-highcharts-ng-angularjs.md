+++
title = "Integrating Highcharts-ng into your AngularJS Applications"
draft = true
date = "2017-04-09T21:14:45+01:00"
desc = "Highcharts-ng is an angularjs wrapper around the exceptional highchartsjs library, in this tutorial we look into how we can easily integrate this into our angularjs applications"
tags = ["angularjs", "javascript"]
series = [ "angularjs" ]
author = "Elliot Forbes"
twitter = "https://twitter.com/Elliot_F"
+++

In this tutorial we’ll be having a look at how you can effectively implement highcharts.js into your angularjs applications. We’ll be following a component based architecture and enforcing things like one-way data-binding as is suggested in Todd Mottos [AngularJS Style Guide](https://github.com/toddmotto/angular-styleguide).

If you already follow a component based architecture, then it should should be very easy to integrate the code in this tutorial straight into your application without too much fuss.

<div class="github-link">
This tutorial will be using the code from this github repo: <a href="https://github.com/elliotforbes/angular-server-dashboard">AngularJS Highcharts</a>
</div>

## Setting Up

In order to be able to use highcharts-ng, you’ll need to add a script tag that imports the vanilla highchartsjs library:

```html
<!DOCTYPE html>
<html ng-app="root" ng-strict-di lang="en">
<head>
  <meta charset="UTF-8">
  <title>AngularJS Highcharts Tutorial</title>
  ...
  <!-- ADD These two imports to your index.html page. -->
  <!-- Without these, highcharts will not work -->
  <script src="//code.highcharts.com/highcharts.src.js"></script>
  <script src="./assets/js/highcharts-ng.js"></script>
  ...
</head>
<body>
  ...
</body>
</html>
```

After we’ve imported the appropriate javascript files, we’ll then be able to add `highcharts-ng` to our modules array like so:

```js
angular.module('root', [
        ...
         'highcharts-ng'
        ...  
  ]);
```
By adding this to our modules array, it means we’ll now be able to use and see Highcharts-ng in all of the components/controllers attached to our root module.

## Our Controller 

Now that we have everything set up in order to use highcharts-ng, we can start adding highcharts charts to our application. 

Within your html file add to following:

```html
<highchart id="chart1" config="$ctrl.chartConfig"></highchart>
```

Once you have this, we’ll have to define our $ctrl.chartConfig object, we can do this in our Controller like so:

```js
function HighchartsController(StatsService, $log, $timeout, $scope) {
    var ctrl = this;

    ctrl.chartConfig = {
        options: {
            chart: {
                type: 'area'
            }
        },

        title: {
            text: 'Network Usage - Last 60 Minutes'
        },
        yAxis: {
            title: {
                text: 'Throughput MBit/s'
            }
        },
        xAxis: {
            title: {
                text: 'Minutes'
            },
            categories: ['-55', '-50', '-45', '-40', '-35', '-30', 
                '-25', '-20', '-15', '-10', '-05', '0']
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: true
            }
        },
        series: [
            {   
                name: 'Inbound',
                data: [29.9, 71.5, 25.4, 43.2, 37.0, 33.0, 35.6, 48.5, 21.4, 19.1, 16.6, 54.4]
            },
            {
                name: 'Outbound',
                data: [19.3, 56.3, 23.1, 38.5, 32.9, 27.0, 30.6, 42.3, 17.4, 12.0, 9.1, 34.0]
            }
        ]
    };

}

angular.module('root')
    .controller('HighchartsController', HighchartsController);
```

And finally we need to add the binding for our chartConfig object to our component:

```js
var ourComponent = {
    ...
    controller: HighchartsController,
    bindings: {
        chartConfig: '<'
    }
}

angular.module('root')
    .component('ourComponent', ourComponent);
```

## Pushing Dynamic Data to the Chart

Static charts can be pretty boring at times and having to refresh the page all the time can be time consuming. Fortunately dynamically updating our Highcharts charts in angular is easy. All you have to do is push that values you want into your chartConfig object and angular and highcharts handles the rest.

In the below code snippet you’ll see we are performing a shift on our data array to remove the first element and then pushing our own random value to the same data array every 2 seconds.

```js
    ctrl.poll = function() {
        $timeout(function(){
            // Here is where you could poll a REST API or the websockets service for live data
            ctrl.chartConfig.series[0].data.shift();
            ctrl.chartConfig.series[0].data.push(Math.floor(Math.random() * 20) + 1);
            ctrl.chartConfig.series[1].data.shift();
            ctrl.chartConfig.series[1].data.push(Math.floor(Math.random() * 20) + 1);
            ctrl.poll();
        }, 2000);
    }

    this.$onInit = function() {
        $log.log("hello");
        ctrl.poll();
    }
```


## Summary

Open up your AngularJS Application and you should see your chart rendering in all it’s glory. If you found this tutorial useful then let me know in the comments section below.

If you need more in-depth knowledge about Highcharts-ng, check out the official documentation:

* [Highcharts-ng](https://github.com/pablojim/highcharts-ng)
* [Highcharts](http://www.highcharts.com/)
