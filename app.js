function displayCars() {
  const showCar = document.getElementById("showCars");

  usedCars.forEach((car) => {
    const card = document.createElement("div");
    card.className = "car-card";
    card.innerHTML = `
    <img src="${car.img}" />
        <h1>${car.make} ${car.model}</h1>
        <h2>Year: ${car.year}</h2>
        <h3>Miles: ${car.mileage}</h3>
        <h3>Price: ${car.price}</h3>
        <h3>Color: ${car.color}</h3>
        <p>Miles: ${car.gasMileage}</p>
        `;

    showCar.appendChild(card);
  });
}

displayCars();

function filterUsedCars() {
  const makeInput = document.getElementById("makeInput");
  const minYear = document.getElementById("minYear");
  const maxYear = document.getElementById("maxYear");
  const maxPrice = document.getElementById("maxPrice");
  const priceValue = document.getElementById("priceValue");
  const slider = document.getElementById("miles");
  const sliderValue = document.getElementById("milesValue");
  //

  const filteredResults = document.getElementById("showCars");
  //searches
  const searchTerm = makeInput.value.toLowerCase();
  const searchMinYear = parseInt(minYear.value) || 0;
  const searchMaxYear = parseInt(maxYear.value) || Infinity;
  const minPrice = maxPrice.value;
  priceValue.textContent = minPrice;
  const minValue = slider.value;
  sliderValue.textContent = minValue;
  /////////////////////////////////// - colors
  const checkboxes = document.querySelectorAll(".filter-checkbox");

  const selected = Array.from(checkboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.id);

  filteredResults.innerHTML = ""; // Clear previous results

  const matchingCars = usedCars.filter((car) => {
    return (
      (car.make.toLowerCase().includes(searchTerm) ||
        car.model.toLowerCase().includes(searchTerm)) &&
      car.year >= searchMinYear &&
      car.year <= searchMaxYear &&
      car.price <= minPrice &&
      car.mileage <= minValue &&
      car.color.includes(selected)
    );
  });

  if (matchingCars.length > 0) {
    matchingCars.forEach((car) => {
      const carInfo = document.createElement("div");
      carInfo.className = "carInfo-card";
      carInfo.innerHTML = `
      <img src="${car.img}" />
        <h1>${car.make} ${car.model}</h1>
        <h2>Year: ${car.year}</h2>
        <h3>Miles: ${car.mileage}</h3>
        <h3>Price: ${car.price}</h3>
        <h3>Color: ${car.color}</h3>
        <p>Miles: ${car.gasMileage}</p>
        `;

      filteredResults.appendChild(carInfo);
    });
  } else {
    filteredResults.textContent = "No matching cars found.";
  }
}

// Listen for input changes in the search field
document.getElementById("makeInput").addEventListener("input", filterUsedCars);
document.getElementById("minYear").addEventListener("input", filterUsedCars);
document.getElementById("maxYear").addEventListener("input", filterUsedCars);
document.getElementById("maxPrice").addEventListener("input", filterUsedCars);
document.getElementById("miles").addEventListener("input", filterUsedCars);
//checkbox call
document.getElementById("filter-form").addEventListener("click", function (e) {
  filterUsedCars();
});
