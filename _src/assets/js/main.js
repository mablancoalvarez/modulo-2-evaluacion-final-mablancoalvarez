'use strict';


const inputSearch = document.querySelector('#input-search');
const button = document.querySelector('#button-search');
const img = document.querySelector('.imgElem');
const ulElement = document.querySelector('#results');

let movieList = null;
const selectedMovies = readLocalStorage();

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
        if (movie.show.image !== null) {
            ulElement.innerHTML += `<li id='${movie.show.id}' class='movies-list__item'><div class='movies-list__item-info'><img class="imgElem" src=${movie.show.image.medium} alt=${movie.show.name}></div>
    <span>${movie.show.name}</span></li>`;
        } else {
            ulElement.innerHTML += `<li id='${movie.show.id}' class='movies-list__item'><div class='movies-list__item-info'><img class="imgElem" src='https://via.placeholder.com/210x295/ffffff/666666/?text=TV' alt=${movie.show.name}></div>
            <span>${movie.show.name}</span></li>`;
        }
        addListeners();
    }

}

function addListeners() {
    const liList = document.querySelectorAll('.movies-list__item');
    for (let li of liList) {
        li.addEventListener('click', selectMovie);
    }
}
// LocalStorage seteo
function setLocalStorage() {
    localStorage.setItem('movieInfo', JSON.stringify(selectedMovies))
}
// LocalStorage muestro

function readLocalStorage() {

    let localInfo = JSON.parse(localStorage.getItem ('movieInfo'))
    if (localInfo !== null){
        return localInfo
    } else {
        return localInfo = []; 
    }

    }

    function selectMovie(evt) {
        const selected = evt.currentTarget.id;
        console.log('hola');
        selectedMovies.push(selected);
        readLocalStorage()

    }


    button.addEventListener('click', loadSeries);