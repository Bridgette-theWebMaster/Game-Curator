//TODO: add a feature to search similar games
'use strict';

const searchURL= "https://api.rawg.io/api/games";

function displayResults(responseJson){
    console.log(responseJson);
    $('#results-list').empty();
    for (let i = 0; i < responseJson.results.length; i++){
        let results = responseJson.results[i];
        let platforms = results.parent_platforms.map((platforms) => {
            return platforms.platform
        });
        let platform = platforms.map((platform) => {
            return platform.name
        });
        let stores = results.stores.map((stores) => {
            return stores.store
        });
        let store = stores.map((store) => {
            return store.name
        });
        $('#results-list').append(
            `<li><img src= ${results.background_image} width= 200px><h3>${results.name}</h3>
            <p>Release date: ${results.released}</p>
            <p id= "platforms">How to play: ${platform}</p>
            <p id= "stores">Where to buy: ${store}</p>          
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
        .catch(err => {$('#js-error-message').text('Something went wrong: ${err.message}')});
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