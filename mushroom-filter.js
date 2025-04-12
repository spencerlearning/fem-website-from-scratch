// Use console.log(); for debugging

// Note use of querySelectorAll for cards because multiple cards
const cards = document.querySelectorAll(".mushroom-guide .card");
const seasonalFilter = document.querySelector("#season");
const edibleFilter = document.querySelector("#edible");
const noResultsMessage = document.querySelector(".no-results-message");

// Object to keep track of value of filters.
// Starting default values are "all".
const currentFilters = {
  season: "all",
  edible: "all",
};

// This enables the animation of the cards moving around when filtered.
// Each card needs a unique viewTransitionName property.
// Now when view transition is started in function updateFilter(), cards will move.
cards.forEach((card, index) => {
  // You can use a data attribute if cards have unique IDs
  const mushroomId = `mushroom-${index + 1}`;
  // Add an inline CSS style attribute to the card.
  // e.g. <div class="card" style="view-transition-name: card-mushroom-4">
  card.style.viewTransitionName = `card-${mushroomId}`;
});

// Use "change" instead of "click" because we only want to know when value changes
seasonalFilter.addEventListener("change", updateFilter);
edibleFilter.addEventListener("change", updateFilter);

function updateFilter(e) {
  const filterType = e.target.name;
  // console.log(e.target);

  // Need to put filterType in brackets instead of using dot because it is a variable
  currentFilters[filterType] = e.target.value;
  // console.log(currentFilters);

  // filterCards();
  // Progressive enhancement: If view transition not supported, just do filterCards();
  if (!document.startViewTransition) {
    filterCards();
    return;
  }
  // If view transition is supported
  document.startViewTransition(() => filterCards());
}

function filterCards() {
  let hasVisibleCards = false;

  cards.forEach((card) => {
    const cardSeason = card.querySelector("[data-season]").dataset.season;
    const cardEdible = card.querySelector("[data-edible]").dataset.edible;
    // console.log(season, edible);

    const matchesSeason = currentFilters.season === cardSeason;
    const matchesEdible = currentFilters.edible === cardEdible;

    const matchesSeasonAll = currentFilters.season === "all";
    const matchesEdibleAll = currentFilters.edible === "all";

    if (
      (matchesSeasonAll || matchesSeason) &&
      (matchesEdibleAll || matchesEdible)
    ) {
      // Setting hidden to true or false adds or removes the hidden attribute.
      // The hidden attribute is defined as display: none; in CSS file.
      card.hidden = false;
      hasVisibleCards = true;
    } else {
      card.hidden = true;
    }
  });

  if (hasVisibleCards) {
    noResultsMessage.hidden = true;
  } else {
    noResultsMessage.hidden = false;
  }
}

// Progressive enhancement:
// For this to work, selects must have hidden attribute on them.
// If JavaScript is not available then selects will not display.
// If JavaScript is available then display the selects.
function enableFiltering() {
  seasonalFilter.hidden = false;
  edibleFilter.hidden = false;
}

enableFiltering();
