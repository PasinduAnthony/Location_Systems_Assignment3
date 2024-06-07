const forestCardTemplate = document.querySelector("[data-forest-template]");
const forestCardContainer = document.querySelector("[data-forest-cards-container]");
const searchInput = document.querySelector("[data-search]");

let forests = [];


if (document.querySelector("[data-page='index']")) {
    myForests = [
      { name: "New Zealand Forest Information and Data", website: "https://worldrainforests.com/deforestation/2000/New_Zealand.htm" },
      { name: "The history of New Zealand's Forests", website: "https://www.mpi.govt.nz/forestry/new-zealand-forests-forest-industry/about-new-zealands-forests#history-nz-forestry" },
      { name: "History of Logging- Native Forests", website: "https://teara.govt.nz/en/logging-native-forests" },
      { name: "History of Exotic Forestry", website: "https://teara.govt.nz/en/exotic-forestry" }
    ];
  } else if (document.querySelector("[data-page='forestcover']")) {
    myForests = [
        { name: "New Zealand Forest Information and Data", website: "https://worldrainforests.com/deforestation/2000/New_Zealand.htm" },
        { name: "The history of New Zealand's Forests", website: "https://www.mpi.govt.nz/forestry/new-zealand-forests-forest-industry/about-new-zealands-forests#history-nz-forestry" },
        { name: "History of Logging- Native Forests", website: "https://teara.govt.nz/en/logging-native-forests" },
        { name: "History of Exotic Forestry", website: "https://teara.govt.nz/en/exotic-forestry" }
    ];
  }

// Populate the forest cards with the static data
forests = myForests.map(forest => {
  const card = forestCardTemplate.content.cloneNode(true).children[0];
  const link = document.createElement('a');
  link.href = forest.website;
  link.target = "_blank";
  link.classList.add('card-link');
  
  const header = card.querySelector("[data-header]");
//   const body = card.querySelector("[data-body]");
  
  header.textContent = forest.name;
//   body.textContent = forest.website;
  link.appendChild(card);
  forestCardContainer.append(link);

  return { name: forest.name, website: forest.website, element: link };
});

searchInput.addEventListener("input", e => {
  // L.Control.geocoder({
  //   geocoder: new L.Control.Geocoder.Nominatim({
  //       geocodingQueryParams: {
  //           "viewbox": "165.75,-47.31,179.36,-33.87",
  //           "bounded": 1
  //       }
  //   })}).addTo(map);
  const value = e.target.value.toLowerCase();
  forests.forEach(forest => {
    const isVisible =
    forest.name.toLowerCase().includes(value) ||
    forest.website.toLowerCase().includes(value);
    forest.element.classList.toggle("hide", !isVisible);
  });
});











// document.addEventListener("DOMContentLoaded", () => {
//   // // Initialize the map
//   // const map = L.map('map').setView([-40.9006, 174.8860], 5);

//   // // Add a tile layer to the map (OpenStreetMap tiles)
//   // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//   //     maxZoom: 19,
//   // }).addTo(map);

//   // // Initialize the geocoder
//   const geocoder = L.Control.geocoder({
//       geocoder: new L.Control.Geocoder.Nominatim({
//           geocodingQueryParams: {
//               "viewbox": "165.75,-47.31,179.36,-33.87",
//               "bounded": 1
//           }
//       })
//   }).addTo(map);

//   // Function to handle geocoding
//   const performGeocode = (query) => {
//       geocoder.options.geocoder.geocode(query, (results) => {
//           if (results.length > 0) {
//               const bbox = results[0].bbox;
//               map.fitBounds([
//                   [bbox.getSouthWest().lat, bbox.getSouthWest().lng],
//                   [bbox.getNorthEast().lat, bbox.getNorthEast().lng]
//               ]);
//           } else {
//               alert('No results found.');
//           }
//       });
//   };

//   // Event listener for search form submission
//   document.getElementById('search-form').addEventListener('submit', (e) => {
//       e.preventDefault();
//       const query = document.getElementById('search').value;
//       performGeocode(query);
//   });
// });
