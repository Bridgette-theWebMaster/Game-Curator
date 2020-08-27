'use strict';

const searchURL= "https://api.rawg.io/api/games";

function displayResults(responseJson){
    $('#js-error-message').empty();
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
        $('#results').append(
            `<h3>Search results:</h3>
            <ul id="results-list">
            <li><img src= ${results.background_image} width= 200px><h4>${results.name}</h4>
            <p>Release Date: ${results.released}</p>
            <p id= "platforms">How to play: ${platform}</p>
            <p id= "stores">Where to buy: ${store}</p>          
            </li>
            </ul>`
    )};
    $('#results').removeClass('hidden');
}


function getGenreList(genre) {
    const url= searchURL + "?genres=" + genre;

    fetch(url)
        .then(response => {
            if(response.ok){
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {$('#js-error-message').text('Video Game Not Found')});
}

function getSimilarList(similar) {
    const formatSimilar = $('#gameName').val().replace(/\s+/g, '-').toLowerCase();
    console.log(formatSimilar);
    const url = searchURL + "/" + formatSimilar + "/suggested";
    
    fetch(url)
        .then(response => {
            if(response.ok){
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {$('#js-error-message').text('Video Game Not Found')});   
}

function watchGenreForm(){
    $('#js-genre-search').submit(event => {
        event.preventDefault();
        const genre = $('#genreList').val();
        getGenreList(genre);
    })
}

function watchSimilarForm(){
    $('#js-similar-search').submit(event => {
        event.preventDefault();
        const similar = $('#gameName').val();
        getSimilarList(similar);
    })
}
$(watchGenreForm);
$(watchSimilarForm);
