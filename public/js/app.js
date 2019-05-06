// const config = {
//     gecodeUrl: `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicGF0cmljazMzNiIsImEiOiJjanY0OGswaDUxOXBqNGVwOWttZjNtNWR2In0.LO7tLVQ1hTH8M2T-FjDT8A&limit=1`,
//     // = `https://api.darksky.net/forecast/0337ca2e06a0e176f87e3d6c6e15b76d/${latitude},${longitude}`;
// }

// fetch(config.gecodeUrl).then((response) => {
//     response.json().then((data) => {
//         const d = data.features[0];
//         console.log('latitude', data.features[0].center[1]);
//         console.log('longitude', data.features[0].center[0]);

//     }).then((d) => {
//         console.log(d);
//     }).catch(error => console.error('Error:', error));
// })

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector('#message-1')

messageOne.textContent = '';

weatherForm.addEventListener("submit", e => {
  e.preventDefault();

  const location = search.value;

  fetch(`http://localhost:3000/weather?address=${location}`).then(response => {
    response.json()
      .then(data => {
        if (data.error) {
          messageOne.textContent = data.error;
        } else {
            messageOne.innerText = 'Location: ' + data.location 
            + '\nForecast: ' + data.forecast;  
        }
      })
      .catch(error => console.error("Error:", error));
  });
});
