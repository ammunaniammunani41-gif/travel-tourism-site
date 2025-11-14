document.getElementById("searchButton").addEventListener("click", function () {
    let placeName = document.getElementById("searchInput").value.trim().toLowerCase();

    fetch("places.json")
        .then(response => response.json())
        .then(data => {
            let place = data.find(p => p.name.toLowerCase() === placeName);

            if (!place) {
                alert("Place not found!");
                return;
            }

            document.getElementById("placeName").innerText = place.name;
            document.getElementById("placeDescription").innerText = place.description;

            let imgSection = document.getElementById("imageSection");
            imgSection.innerHTML = "";

            place.images.forEach(img => {
                let imageElement = document.createElement("img");
                imageElement.src = img;      // IMPORTANT: loads from JSON
                imageElement.alt = place.name;
                imageElement.classList.add("place-image");
                imgSection.appendChild(imageElement);
            });

            document.getElementById("mapFrame").src = place.map;
        })
        .catch(error => console.error("Error loading JSON:", error));
});



