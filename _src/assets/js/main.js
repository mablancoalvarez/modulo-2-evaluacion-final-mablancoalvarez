'use strict';


const inputSearch = document.querySelector('#input-search');
const button = document.querySelector('#button-search');
const img = document.querySelector('.imgElem');
const ulElement = document.querySelector('#results');

let movieList = null;

// 1- Connect to Api
function loadSeries() {
    ulElement.innerHTML = '';
    fetch(`http://api.tvmaze.com/search/shows?q=${inputSearch.value}`)
        .then(response => response.json())
        .then(data => {
            movieList = data;
            //  console.log(data);
            renderMovies(movieList);
        });
}
// 2-show movies
function renderMovies(movieArr) {
    for (let movie of movieArr) {

        ulElement.innerHTML += `<li id='${movie.show.id}' class='movies-list__item'><div class='movies-list__item-info'><img class="imgElem" src=${movie.show.image.medium} alt=${movie.show.name}></div>
    <span>${movie.show.name}</span></li>`;
        // console.log(movie);

        // if (img !== null) {
        //     img.src = movie.show.image.medium || movie.show.image.original;
        // } else {
        //     img.src = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
        // }

    }
}




button.addEventListener('click', loadSeries);