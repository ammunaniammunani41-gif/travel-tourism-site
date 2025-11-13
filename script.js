let placesData = [];

fetch("places.json")
  .then(res => res.json())
  .then(data => {
    placesData = data.places;
    const placeSelect = document.getElementById("placeSelect");
    placesData.forEach(place => {
      const option = document.createElement("option");
      option.value = place.name;
      option.textContent = place.name;
      placeSelect.appendChild(option);
    });
  });

document.getElementById("exploreBtn").addEventListener("click", () => {
  const selectedPlace = document.getElementById("placeSelect").value;
  const selectedVehicle = document.getElementById("vehicleSelect").value;
  const resultSection = document.getElementById("result");

  if (!selectedPlace || !selectedVehicle) {
    alert("Please select both place and vehicle type!");
    return;
  }

  const place = placesData.find(p => p.name === selectedPlace);
  if (!place) {
    alert("Place not found in database!");
    return;
  }

  document.getElementById("placeName").textContent = place.name;
  document.getElementById("placeDescription").textContent = place.description;
  document.getElementById("travelMode").textContent = `You chose to travel by: ${selectedVehicle}`;
  document.getElementById("images").innerHTML = place.images
    .map(img => `<img src="${img}" alt="${place.name}">`)
    .join("");
  document.getElementById("map").src = place.location;

  resultSection.classList.remove("hidden");
});

