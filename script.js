/*global fetch*/
document.getElementById("searchSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("searchInput").value;
  if (value === "")
    return;
  console.log(value);
  const url="https://www.rijksmuseum.nl/api/en/collection?q=Q&key=btZpg4ag&format=json".replace("Q", value);
  fetch(url)
  .then(function(response) {
      return response.json();
  }).then(function(json) {
      console.log(json);
      let results="<h2>Search Results</h2>";
      for (let i=0; i < json.artObjects.length; i++) {
          console.log(json.artObjects[i].title);
          results += "<p>";
          results += json.artObjects[i].title;
          results += "</p>";
          // From here, we just need to choose what to display and make it look nice
      }
      document.getElementById("searchResults").innerHTML = results;
  });
});