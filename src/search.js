const forestCardTemplate = document.querySelector("[data-forest-template]");
const forestCardContainer = document.querySelector("[data-forest-cards-container]");
const searchInput = document.querySelector("[data-search]");

let forests = [];

// Replace this with your own data


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
  console.log(forest.name);
  link.appendChild(card);
  forestCardContainer.append(link);

  return { name: forest.name, website: forest.website, element: link };
});

searchInput.addEventListener("input", e => {
  const value = e.target.value.toLowerCase();
  forests.forEach(forest => {
    const isVisible =
    forest.name.toLowerCase().includes(value) ||
    forest.website.toLowerCase().includes(value);
    forest.element.classList.toggle("hide", !isVisible);
  });
});


