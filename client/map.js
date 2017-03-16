//Global functions


















//Autocomplete search
  var initAutoCompleteEstab = function() {
      var map = GoogleMaps.maps.mapPage.instance;
        var autocomplete = new google.maps.places.Autocomplete(
          (document.getElementById('gmap_loc')),{types: []}
        ); //address, geocode, establisment
        autocomplete.bindTo('bounds', map);
        //autocomplete.setOptions({strictBounds: true});

        var marker = new google.maps.Marker({
          map: map,
          anchorPoint: new google.maps.Point(0, -29)
        });

        autocomplete.addListener('place_changed', function() {
          marker.setVisible(false);
          var place = autocomplete.getPlace();
          if (!place.geometry) {
            return;
          }

          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.panTo(place.geometry.location);
            //map.setZoom(17);  
          }
          //marker.setPosition(place.geometry.location);
          //marker.setVisible(true);

          var address = '';
          if (place.address_components) {
            address = [
              (place.address_components[0] && place.address_components[0].short_name || ''),
              (place.address_components[1] && place.address_components[1].short_name || ''),
              (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
          }

        });



  };

    window.onload = function() { 
      initAutoCompleteEstab();
    }








/*
  GoogleMaps.ready('mapPage', function(map) {



      var map = GoogleMaps.maps.mapPage.instance;

      function initMap() {
        var pyrmont = {lat: -33.866, lng: 151.196};

        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: pyrmont,
          radius: 500,
          type: ['store']
        }, processResults);
      }

      function processResults(results, status, pagination) {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
          return;
        } else {
          createMarkers(results);

          if (pagination.hasNextPage) {
            var moreButton = document.getElementById('more');

            moreButton.disabled = false;

            moreButton.addEventListener('click', function() {
              moreButton.disabled = true;
              pagination.nextPage();
            });
          }
        }
      }

      function createMarkers(places) {
        var bounds = new google.maps.LatLngBounds();
        var placesList = document.getElementById('places');

        for (var i = 0, place; place = places[i]; i++) {
          var image = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
          };

          var marker = new google.maps.Marker({
            map: map,
            icon: image,
            title: place.name,
            position: place.geometry.location
          });

          placesList.innerHTML += '<li>' + place.name + '</li>';

          bounds.extend(place.geometry.location);
        }
        map.fitBounds(bounds);
      }






});


*/







