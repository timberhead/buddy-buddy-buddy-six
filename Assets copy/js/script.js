






var tableBody = document.getElementById('repo-table');
var fetchButton = document.getElementById('fetch-button');

function getApi() {
  
  var requestUrl = 'https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}';

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      
       for (var i = 0; i < data.length; i++) {
         
         var createTableRow = document.createElement('tr');
         var tableData = document.createElement('td');
         var link = document.createElement('a');

         // Setting the text of link and the href of the link
         link.textContent = data[i].html_url;
         link.href = data[i].html_url;

         // Appending the link to the tabledata and then appending the tabledata to the tablerow
         // The tablerow then gets appended to the tablebody
         tableData.appendChild(link);
         createTableRow.appendChild(tableData);
         tableBody.appendChild(createTableRow);
      }
    });
}

fetchButton.addEventListener('click', getApi);