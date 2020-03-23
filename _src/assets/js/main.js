'use strict';


const inputSearch = document.querySelector('#input-search');
const button = document.querySelector('#button-search');
const img = document.querySelector('.imgElem');
const ulElement = document.querySelector('#results');
const ulFav = document.querySelector('.favourites');

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
            // Esto me pintara los datos
        });
}

// 2-show movies me mostrara los resultados

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
// Añado los listeners a los li y seleccionaran la pelicula favorita
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
// LocalStorage reading

function readLocalStorage() {

    let localInfo = JSON.parse(localStorage.getItem('movieInfo'))
    if (localInfo !== null) {
        return localInfo
    } else {
        return localInfo = [];
    }

}

// me quedo con el objeto
function getMovieObject(id) {
    return movieList.find(movie => movie.show.id === parseInt(id))
}



//función que selecciona la película favorita


function selectMovie(evt) {
    const selected = evt.currentTarget.id;
    const switchColor = evt.currentTarget;
    switchColor.setAttribute('class', 'switch')
    const object = getMovieObject(selected);
    /* Con esto comparamos si ya tenemos la serie seleccionada  parseando los dos valores*/
    const findMovie = selectedMovies.find(movies => parseInt(movies.id) === parseInt(selected));
    if (findMovie === null || findMovie === undefined) {

        selectedMovies.push(object.show);
        setLocalStorage();
        renderFavourites(selectedMovies);
    } else {
        alert('Esta serie ya está en favoritos')
    }

}

function renderFavourites(favArr) {

    ulFav.innerHTML = '';
    for (let favourite of favArr) {
        const li = document.createElement('li');
        const i = document.createElement('i');
        const div = document.createElement('div');
        const img = document.createElement('img');
        const span = document.createElement('span');
        const text = document.createTextNode(favourite.name);

        //icono de eliminar
        i.setAttribute('class', 'far fa-times-circle');

        //Imagen de la serie
        img.setAttribute('class', 'imgElem');
        img.setAttribute('alt', favourite.name);
        if (favourite.image !== null
            && favourite.image !== undefined
            && favourite.image !== '') {
            img.setAttribute('src', favourite.image.medium);
        }
        else img.setAttribute('src', 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV');

        //Nombre de la imagen
        span.appendChild(text);


        //contenedor de la imagen
        div.setAttribute('class', 'movies-list__item-info');
        div.appendChild(img);
        div.appendChild(span);

        //elemento de la lista
        li.setAttribute('id', favourite.id);
        li.setAttribute('class', 'movies-list__item');
        li.appendChild(i);
        li.appendChild(div);
        ulFav.appendChild(li);

    }

    addFavouriteListeners()
}


function addFavouriteListeners() {
    const buttonList = document.querySelectorAll('i');
    for (let i of buttonList) {
        i.addEventListener('click', removeMovie)

    }
}


function removeMovie(evt) {
    //  selectedMovies.find(movies => parseInt(movies.id) === parseInt(elemId));
    // const elemId = evt.currentTarget.parentElement.id;
    // const elemIndex = selectedMovies.indexOf(elemId);
    // selectedMovies.splice(elemIndex, 1);

    // if (selectedMovies.find(movies => parseInt(movies.id) === parseInt(favourite.id))){
    //     removeMovie();
    // }
    const elemClicked = event.currentTarget.parentElement;
    const elemId = elemClicked.getAttribute('id');
    const searchCorrectId = selectedMovies.find(item => item.id == (Number(elemId)));
    let fav = selectedMovies.indexOf(searchCorrectId);
    selectedMovies.splice(fav, 1);


    setLocalStorage();
    renderFavourites(selectedMovies);
}




button.addEventListener('click', loadSeries);


renderFavourites(selectedMovies)
