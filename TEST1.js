let button = document.getElementById('btn')
let alert = document.querySelector('#alert')
console.log(button)
button.addEventListener('mouseover', e=>{
    button.classList.toggle('green')
}) 
let lat = {};
let long = {};

$(document).ready(function(){
  getUpdatesLatLong();
  //check for new updates
  setInterval('getUpdatesLatLong()',2500)
});

function getUpdatesLatLong() {

  let request = new XMLHttpRequest();
  request.open("GET","https://api.thingspeak.com/channels/1561045/feeds/last.json");
  request.send();
  request.onload = () => {
    console.log(request);
    if (request.status == 200) {
      console.log(JSON.parse(request.response));
      var data = JSON.parse(request.response)
      lat = data.field4
      long = data.field5
      console.log(lat)
      console.log(long)
    } else {
      console.log('error ${request.status} ${request.statusText')
    }
  }
}

let trackerId = 0;
      let geocoder;
      let map;
      let iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
      let userMarker;
      

      const initialize = () => {
        geocoder = new google.maps.Geocoder();


        /* fix latLng to be coordinates from thingspeak */
        navigator.geolocation.getCurrentPosition(function(pos) {
          const latLng = new google.maps.LatLng(
            lat,
            long
          );



          const options = {
            zoom: 19,
            center: latLng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };
          map = new google.maps.Map(
            document.getElementById("map_canvas"),
            options
          );
          userMarker = new google.maps.Marker({
            position: latLng,
            map: map,
            title: "You!",
            icon:{
              url: "car.png",
              scaledSize: new google.maps.Size(31, 31)
            },
          });
          showLocation(pos);
        });

        /* fix latLng to be coordinates from thingspeak */
        trackerId = navigator.geolocation.watchPosition(function(pos) {
          var latLng = new google.maps.LatLng(
            pos.coords.latitude,
            pos.coords.longitude
          );
          map.setCenter(latLng);
          userMarker.setPosition(latLng);
          showLocation(pos);
        });

      };
      /* fix latLng to be coordinates from thingspeak */
      const showLocation = pos => {
        const latLng = new google.maps.LatLng(
          pos.coords.latitude,
          pos.coords.longitude
        );
        if (geocoder) {
          geocoder.geocode({ latLng: latLng }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              if (results[1]) {
                $("location").innerHTML = results[1].formatted_address;
              }
            }
          });
        }
      };

      const stopTracking = () => {
        if (trackerId) {
          navigator.geolocation.clearWatch(trackerId);
        }
      };
