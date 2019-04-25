'use strict'
// loop through data and render results
function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i=0; i<responseJson.data.length; i++) {
    $('#results-list').append(`
      <li>
        <h3>${responseJson.data[i].fullName}</h3>
        <p>${responseJson.data[i].description}</p>
        <p>${responseJson.data[i].directionsInfo}</p>
        <a href='${responseJson.data[i].url}'>${responseJson.data[i].url}</a>
      </li>
      <br><br>
      `)
  };
  $('#results').removeClass('hidden');
};

// create url and get response data as json
function getParkData(state, resultsNum){
  const baseURL = 'https://developer.nps.gov/api/v1/parks';
  const apiKey = '7zkq9Mh7PfM7MR6qV9vsT7zboqz3Rye67h6pt2wG';
  const url = baseURL+'?stateCode='+state+'&limit='+resultsNum+'&api_key='+apiKey;

  console.log(url);

  fetch (url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Uh oh! Something went wrong: ${err.message}`);
    })
}

// form submit
function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const state = $('#js-state').val();
    const resultsNum = $('#js-results-num').val()-1;
    console.log(state, resultsNum);
    getParkData(state, resultsNum)
  })
}
$(watchForm);