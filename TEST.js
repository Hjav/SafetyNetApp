let button = document.getElementById('btn')
let alert = document.querySelector('#alert')
console.log(button)
button.addEventListener('mouseover', e=>{
    button.classList.toggle('green')
}) 

let request = new XMLHttpRequest();
request.open("GET","https://api.thingspeak.com/channels/1561045/feeds.json?api_key=KIBFWZ0FG2BLM80I&results=2");
request.send();
request.onload = () => {
  console.log(request);
  if (request.status == 200) {
    console.log(JSON.parse(request.response));
  } else {
    console.log('error ${request.status} ${request.statusText')
  }
}



let trackerId = 0;
      let geocoder;
      let map;
      let userMarker;
      const initialize = () => {
        geocoder = new google.maps.Geocoder();

        navigator.geolocation.getCurrentPosition(function(pos) {
          const latLng = new google.maps.LatLng(
            pos.coords.latitude,
            pos.coords.longitude
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
            title: "You!"
          });
          showLocation(pos);
        });
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
      
      App.accessRule('http://*');
      App.accessRule('https://*');

    
      