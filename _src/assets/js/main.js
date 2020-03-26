'use strict';


const inputSearch = document.querySelector('#input-search');
const button = document.querySelector('#button-search');
const img = document.querySelector('.imgElem');
const ulElement = document.querySelector('#results');
const ulFav = document.querySelector('.favourites');
const ulElementChild = document.querySelectorAll('.movies-list__item-info')
const container = document.querySelector ('.page__header');
let movieList = null;
const selectedMovies = readLocalStorage();

// 1- Connect to Api
function loadSeries() {
    ulElement.innerHTML = '';
    fetch(`http://api.tvmaze.com/search/shows?q=${inputSearch.value}`)
        .then(response => response.json())
        .then(data => {
            movieList = data;
            renderMovies(movieList); 
        });
}

function showFavourite (){

    const buttonFav = document.createElement('button');
    const text = document.createTextNode('fav');
     buttonFav.appendChild(text);
    container.appendChild(buttonFav);

    buttonFav.addEventListener('click', paintFavourite);

}

function paintFavourite (){

for ( let favourite of selectedMovies){
    console.log(favourite.name);
}

}


// 2-show movies 
function renderMovies(movieArr) {
    for (let movie of movieArr) {
        if (movie.show.image !== null) {
            ulElement.innerHTML += `<li id='${movie.show.id}' class='movies-list__item'><div class='movies-list__item-info'><img class="imgElem" src=${movie.show.image.medium} alt=${movie.show.name}></div>
            <span>${movie.show.name}</span>
            <span>${movie.show.schedule.days}</span></li>`;
        } else {
            ulElement.innerHTML += `<li id='${movie.show.id}' class='movies-list__item'><div class='movies-list__item-info'><img class="imgElem" src='https://via.placeholder.com/210x295/ffffff/666666/?text=TV' alt=${movie.show.name}></div>
            <span>${movie.show.name}</span>
            <span>${movie.show.schedule.days}</span></li>`;
        }
        // addListeners();
    }
}
// Add listeners to liList
function addListeners() {
    const liList = document.querySelectorAll('.movies-list__item');
    for (let li of liList) {
        li.addEventListener('click', selectMovie);
    }
}
// LocalStorage set

function setLocalStorage() {
    localStorage.setItem('movieInfo', JSON.stringify(selectedMovies))
}
// LocalStorage reading

function readLocalStorage() {
    let localInfo = JSON.parse(localStorage.getItem('movieInfo'))
    if (localInfo !== null) {
        return localInfo
    } else {
        return localInfo = [];
    }
}
// get Object
function getMovieObject(id) {
    return movieList.find(movie => movie.show.id === parseInt(id))
}

// Favourite Movie function
function selectMovie(evt) {
    const selected = evt.currentTarget.id;
    const switchColor = evt.currentTarget;
    switchColor.setAttribute('class', 'switch');
    const object = getMovieObject(selected);
    /* Compare ids of selectedMovies with general data*/
    const findMovie = selectedMovies.find(movies => parseInt(movies.id) === parseInt(selected));
    if (findMovie === null || findMovie === undefined) {
        selectedMovies.push(object.show);
        setLocalStorage();
        renderFavourites(selectedMovies);
    } else {
        alert('Esta serie ya está en favoritos')
    }
}


// Show in document favourite Show
function renderFavourites(favArr) {
    ulFav.innerHTML = '';
    for (let favourite of favArr) {
        
        const li = document.createElement('li');
        const i = document.createElement('i');
        const div = document.createElement('div');
        const img = document.createElement('img');
        const span = document.createElement('span');
        const text = document.createTextNode(favourite.name);

        //Delete icon
        i.setAttribute('class', 'far fa-times-circle');

        //TV image
        img.setAttribute('class', 'imgElem');
        img.setAttribute('alt', favourite.name);
        if (favourite.image !== null
            && favourite.image !== undefined
            && favourite.image !== '') {
            img.setAttribute('src', favourite.image.medium);
        }
        else img.setAttribute('src', 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV');

        //Image name
        span.appendChild(text);

        //Container of img
        div.setAttribute('class', 'movies-list__item-info');
        div.appendChild(img);
        div.appendChild(span);

        //Element of List
        li.setAttribute('id', favourite.id);
        li.setAttribute('class', 'movies-list__itemFavourites');
        li.appendChild(i);
        li.appendChild(div);
        ulFav.appendChild(li);
    }
    addFavouriteListeners()
}

// Add icon listeners & remove show selected

function addFavouriteListeners() {
    const buttonList = document.querySelectorAll('i');
    for (let i of buttonList) {
        i.addEventListener('click', removeMovie)
    }
}

function removeMovie(evt) {
    const elemClicked = event.currentTarget.parentElement;
    const elemId = elemClicked.getAttribute('id');
    const searchCorrectId = selectedMovies.find(item => item.id == (Number(elemId)));
    let fav = selectedMovies.indexOf(searchCorrectId);
    selectedMovies.splice(fav, 1);
    for (let element of ulElementChild) {
        if (elemId === element.id) {
            element.classList.remove('switch');
            element.classList.add('white');
        }
    }
    setLocalStorage();
    renderFavourites(selectedMovies);
}

button.addEventListener('click', loadSeries);
showFavourite ();
renderFavourites(selectedMovies);
