const endpoint = 'https://api.niwa.co.nz/tides/data';
const auth = '&apikey=ibC80Lmhxo5LS1Ux3G7KmdW1v42AWBKh';
const longBeach =  "?lat=-45.75&long=170.660";
const spitWharf =  "?lat=-45.783&long=170.717";

let chosenLocation = longBeach;

fetch(endpoint + chosenLocation + auth)
  .then((response) => response.json())
  .then((data) => showData(data));

function showData(tidesData) {
  const metadataContainer = document.querySelector("#show-metadata");
  console.log(tidesData);
  const lat = tidesData.metadata.latitude;
  const long = tidesData.metadata.longitude;
  const startDate = tidesData.metadata.start;
  const space = " ";
  metadataContainer.innerHTML = lat + space + long + space + startDate;
  formatTides(tidesData);
}

function formatTides(tides) {
  const tideTimesContainer = document.querySelector("#tide-times");
  tides.values.forEach((tide) => {
    const para = document.createElement("p");
    if (tide.value < 1) {
      para.style.fontWeight = 'bold';
    }
    tideTimesContainer.appendChild(para);
    const tideDate = new Date(tide.time);
    para.append(tideDate.toLocaleString() + " ——— ");
    para.append(tide.value);
  });
}
