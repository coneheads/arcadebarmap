var map;
var infowindow;
var currentLat, currentLng;

var currentLat = 0, currentLng = 0;

function initMap() {
  var pyrmont = {lat: 40.7128, lng: -74.0059}; 

  map = new google.maps.Map(document.getElementById('map'), {
    center: pyrmont,
    zoom: 12
  });

  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: pyrmont,
    radius: 15000,
    keyword: ["arcade", "videogames"],
    type: ['bar']
  }, callback);
} // end initmap

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

function openMap(){
  document.getElementById('mapLink').style.display = "none";
  document.getElementById('map').style.visibility= "visible";
  ///// HTML5 Geolocation attempt //////// 
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      map.setCenter(pos);
    }, function(){
      handleLocationError(true);
    });
  } else {
    handleLocationError(false);
  }
  ///// End Geolocation attempt ///////// 
}

function handleLocationError(browserSupport) {
  if (browserSupport){
    console.log('Location Not Found.');
  } else {
    console.log('Browser does not support geolocation.');
  }
}