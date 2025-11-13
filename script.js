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
  })
  .catch(err => console.error("Error loading places.json:", err));

document.getElementById("exploreBtn").addEventListener("click", () => {
  const selectedPlaceName = document.getElementById("placeSelect").value;
  const selectedVehicle = document.getElementById("vehicleSelect").value;

  if (!selectedPlaceName) {
    alert("Please select a place.");
    return;
  }

  const place = placesData.find(p => p.name === selectedPlaceName);

  document.getElementById("result").classList.remove("hidden");
  document.getElementById("placeName").textContent = place.name;
  document.getElementById("placeDescription").textContent = place.description;
  document.getElementById("travelMode").textContent =
    selectedVehicle ? `You chose to travel by ${selectedVehicle}.` : "";

  // ✅ Correct image loading code
  document.getElementById("images").innerHTML = place.images
    .map(img => `<img src="${img}" alt="${place.name}" />`)
    .join("");

  // ✅ Map display
  document.getElementById("map").src = place.location;
});


