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
      let results = "";
      if (json.artObjects.length === 0) {
        results = '<h3>Sorry, no results matched your search.</h3>';
      } else {
        results='<table id="my_table"><tr id="table_head"><th scope="col">Title</th><th scope="col">Work</th><th scope="col">Artist</th></tr>';
        for (let i=0; i < json.artObjects.length; i++) {
          if (i % 2 == 1) {
            results += '<tr class="evens">';
          } else {
            results += '<tr class="odds">';
          }
          results += '<th scope="row">' + json.artObjects[i].title + '</th>';
          if (json.artObjects[i].hasImage === false) {
            results += "<td>No image available</td>";
          } else {
            results += '<td><img src="' + json.artObjects[i].webImage.url.replace("s0", "s256") + '"/></td>';
          }
          results += '<td>' + json.artObjects[i].principalOrFirstMaker + '</td></tr>';
        }
        results += "</table>"
      }
      document.getElementById("searchResults").innerHTML = results;
  });
});