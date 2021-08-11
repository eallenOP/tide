// Get env var values defined in our Netlify site UI
// const { API_TOKEN, API_URL } = process.env

// const endpoint = API_URL;
// const auth = API_TOKEN;
// const longBeach =  "?lat=-45.75&long=170.660";
// const spitWharf =  "?lat=-45.783&long=170.717";

// let chosenLocation = longBeach;

// fetch(endpoint + chosenLocation + auth)
//   .then((response) => response.json())
//   .then((data) => showData(data));

const response = fetch('/.netlify/functions/get-tide').then(
  response => response.json()
  )

  showData(JSON.stringify(response))


function showData(tidesData) {
  const metadataContainer = document.querySelector("#metadata");
  console.log(tidesData);
  const lat = tidesData.metadata.latitude;
  const long = tidesData.metadata.longitude;
  const startDate = tidesData.metadata.start;
  const space = " / / ";
  metadataContainer.innerHTML = lat + space + long;
  formatTides(tidesData);
}

function formatTides(tides) {
  const tideTimesContainer = document.querySelector("#tide-times");
  tides.values.forEach((tide) => {
    const para = document.createElement("p");
    if (tide.value < 1) {
      para.style.fontWeight = 'bold';
    }
    if (tide.value > 2.2) {
      para.style.color = 'firebrick';
    }
    tideTimesContainer.appendChild(para);
    const tideDate = new Date(tide.time);
    para.append(tideDate.toLocaleString() + " ——— ");
    para.append(tide.value);
  });
}
