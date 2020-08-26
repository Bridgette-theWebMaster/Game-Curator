'use strict';

const searchURL= "https://api.rawg.io/api/games";

function displayResults(responseJson){
    console.log(responseJson);
    $('#results-list').empty();
    for (let i = 0; i < responseJson.results.length; i++){
        $('#results-list').append(
            `<li><h3>${responseJson.results[i].name}</h3><img src= ${responseJson.results[i].background_image} width= 200px>
            <p>Release date: ${responseJson.results[i].released}</p>
            <p id= "platforms">Platforms:</p>
            
            </li>`
    )};
    $('#results').removeClass('hidden');
}

function getGenreList(genre) {
    const url= searchURL + "?genres=" + genre;
    console.log(url);

    fetch(url)
        .then(response => {
            if(response.ok){
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {$('#js-error-message').text('Something went wrong: ${"err.message"}')});
}

function watchForm(){
    $('form').submit(event => {
        event.preventDefault();
        const genre = $('#genreList').val();
        getGenreList(genre);
        console.log(genre);
    })
}
$(watchForm);