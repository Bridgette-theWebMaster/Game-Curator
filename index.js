'use strict';

function displayResults(firstResponse, secondResponse){
  
    $('#js-error-message').empty();
    $('#results').empty();
    $('#similar-results').empty();
    let platforms = firstResponse.platforms.map((platforms) => {
        return platforms.platform
    });
    let platform = platforms.map((platform) => {
        return platform.name
    });
    let stores = firstResponse.stores.map((stores) => {
        return stores.store
    });
    let storeURL = firstResponse.stores.map((stores) => {
        return stores.url
    });
    let gameStore = stores.map((store) => {
        return store.name
    });

    let formattedURL= "";
    for (let j = 0; j < storeURL.length && j < gameStore.length; j ++){
        formattedURL = `<a href= "${storeURL[j]}" target= "_blank">${gameStore[j]}</a>`
    };
    
        $('#results').append(
            `<ul id="gameInfo">
            <li><h4>${firstResponse.name}</h4><img src= ${firstResponse.background_image} width= 200px>
            <p>Platform: ${platform}</p>
            <p>Store: ${formattedURL}</p>
            </li>
            </ul>`
    );
    $('#results').removeClass('hidden');
    $('#similar-results').append(
        `<h3>Similar Games</h3>
        <ul id= "results-list">`
    )
    for (let i = 0; i < secondResponse.results.length; i++){
        let results= secondResponse.results[i];
        let platforms = results.platforms.map((platforms) => {
            return platforms.platform
        });
        let platform = platforms.map((platform) => {
            return platform.name
        });
        let stores = results.stores.map((stores) => {
            return stores.store
        });
        let storeURL = results.stores.map((stores) => {
            return stores.url_en
        });
        let store = stores.map((store) => {
            return store.name
        });

        let formattedURL= "";
        for (let j = 0; j < storeURL.length && j < gameStore.length; j ++){
            formattedURL = `<a href= "${storeURL[j]}" target= "_blank">${store[j]}</a>`
        };

        $('#results-list').append(
            `<li><h4>${results.name}</h4><img src= ${results.background_image} width= 200px>
            <p>Description: ${results.short_description}</p>
            <p>Platforms: ${platform}</p>
            <p>Stores: ${formattedURL}</p>
            </li>
            </ul>`
    )};
    $('#similar-results').removeClass('hidden');
}

function getData(gameTitle, maxResults = 10){
    const gameAPI = fetch("https://api.rawg.io/api/games/" + gameTitle);
    const similarAPI = fetch("https://api.rawg.io/api/games/" + gameTitle + "/suggested" + "?page_size=" + maxResults);

    Promise.all([gameAPI, similarAPI])
    .then(responses => Promise.all(responses.map(response => {
        if(response.ok){
            return response.json();
        }
    })))
    .then(response => {
        let firstResponse = response[0];
        let secondResponse = response[1];
        displayResults(firstResponse, secondResponse)
    })
    .catch(error => {$('#js-error-message').text('Video game not found. Try Again.')});
}

function watchFind(){
    $('#js-search').submit(event => {
        event.preventDefault();
        const gameTitle = $('#gameName').val().replace(/\s+/g, '-').toLowerCase();
        const maxResults = $('#maxResults').val();
        getData(gameTitle, maxResults);
    })
}

$(watchFind);