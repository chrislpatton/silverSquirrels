angular.module('hikexpert.home', [])

.controller('HomePageController', function($scope, Home){
  // // Initalize the <select> element for Materalize:
  //   $(document).ready(function() {
  //     $('select').material_select();
  //   });
  // //
    $scope.userInfo = {};

    $scope.getCoords = function(userInfo){

    navigator.geolocation.getCurrentPosition(function(position) {

        $scope.userInfo.lat = position.coords.latitude;
        $scope.userInfo.long = position.coords.longitude;
        console.log('userinfo before factory', userInfo);
        Home.getCoords(userInfo)
        .then(function(data){
          //$scope.coordinates =
          console.log('data in HomePageController', data);
          data.forEach(function(trail, i){
            marker = new L.marker(trail.coordinates)
              .bindPopup('<b>'+trail.name+'</b><br /><a>I have hiked this</a><br /><a>I want to hike this</a>')
              .addTo($scope.map);
          });
        });
      });
    };

   navigator.geolocation.getCurrentPosition(function(position) {
      console.log(position.coords.latitude, position.coords.longitude);
      var lat = position.coords.latitude;
      var long = position.coords.longitude;

      console.log(lat);
      console.log(long);

      // Initialize the leaflet map:
      var map = L.map('map').setView([lat, long], 9);
      // Set it on the angular scope:
      $scope.map = map;
      // Add a tile layer to our map (from mapbox):
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZWR1bGlzOCIsImEiOiJjaWt1M2RzeW8wMDk4dnltM3h5ZXlwb24wIn0.DfujBg6HeQHg5ja-tZyYRw', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.satellite',
        accessToken: 'pk.eyJ1IjoiZWR1bGlzOCIsImEiOiJjaWt1M2RzeW8wMDk4dnltM3h5ZXlwb24wIn0.DfujBg6HeQHg5ja-tZyYRw'
    }).addTo(map);


      // Add a marker to the map
    var circle = L.circle([lat, long], 500, {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 1
    }).addTo(map).bindPopup("Current Location").openPopup();

      // L.marker([lat, long], {color: 'red'}).addTo(map)
      //   .bindPopup("<b>Here I am</b><br />").openPopup();
  });
});



