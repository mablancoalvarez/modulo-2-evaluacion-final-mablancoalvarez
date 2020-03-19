'use strict';


const inputSearch = document.querySelector('#input-search');
const button = document.querySelector('#button-search');

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
   ulElement.innerHTML += `<li id='${movie.show.id}' class='movies-list__item'><div class='movies-list__item-info'><img src=${movie.show.image.medium} alt=${movie.show.name}>
   <span>${movie.show.name}</span></div></li>`;
        // console.log(movie);



        // `<li id=${movie.id}><div class='movies-list__item-info'><img src=${movie.image.medium} alt=${movie.name}></img><span>${movie.name}</span></div></li>`
}
}




button.addEventListener('click', loadSeries);