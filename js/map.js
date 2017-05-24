var map;
var infowindow;

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
}

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

function toggleMenu(){
  var menu = document.getElementById("menu");
  if (document.documentElement.clientWidth < 992) { 
  // above is a vanilla js version of css media query.  Menu toggle is for small devices!
    if(menu.style.display === 'none'){
      menu.style.display = 'block';
      setTimeout(showMenu, 50);
      function showMenu(){
        menu.classList.remove('slideOut');
      }
    } else{
      menu.classList.add('slideOut');
      setTimeout(hideMenu, 1000);
      function hideMenu(){
        menu.style.display = 'none';
      }
    };
  } else {
  // prevents map from being disabled if window is resized
  // Should we add some sort of close button to the menu to make this feel more intentional? xD 
    menu.style.display = 'block';
    setTimeout(showMenu, 50);
    function showMenu(){
      menu.classList.remove('slideOut');
    }
  }
}

function showFullMenu(){
  document.getElementById("menu-content").classList.toggle('hideDiv');
}
