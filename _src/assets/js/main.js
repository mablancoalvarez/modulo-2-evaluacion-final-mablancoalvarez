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
//me quedo con el objeto , no con el id de la película seleccionada
//y lo pusheo al array de favoritos
//pinto los favoritos
// function selectMovie(evt) {
//     const selected = evt.currentTarget.id;
//     const switchColor = evt.currentTarget;
//     switchColor.setAttribute('class','switch')
//     const object = getMovieObject(selected)
//     selectedMovies.push(object.show);
//     setLocalStorage();
//     renderFavourites(selectedMovies);
//     console.log(movieList)
// }

function selectMovie(evt) {
    const selected = evt.currentTarget.id;
    const switchColor = evt.currentTarget;
    switchColor.setAttribute('class','switch')
    const object = getMovieObject(selected)
    selectedMovies.push(object.show);

    setLocalStorage();
    renderFavourites(selectedMovies);

    console.log(movieList)
}


function renderFavourites(favArr) {
    console.log(selectedMovies)
    ulFav.innerHTML = '';
    for (let favourite of favArr) {
        // const object = getMovieObject(favArr)
        // if (favArr = object.show.id) {

            ulFav.innerHTML += `<li id='${favourite.id}' class='movies-list__item'><div class='movies-list__item-info'><i class='far fa-times-circle'></i><img class="imgElem" src=${favourite.image.medium} alt=${favourite.name}></div>
            <span>${favourite.name}</span></li>`;
        }
    }


//     function addFavouriteListeners (){
//         const buttonList = document.querySelectorAll('button');
//     for ( let button of buttonList ){
//     button.addEventListener('click', removeMovie)
    
//     }
//     }
//     function removeMovie (evt){const elemId = evt.currentTarget.parentElement.id;
//     // Esto se hace porque el currentt es el button y hay que llegar al padre que es el LI

//     const elemIndex =  selectedMovies.indexOf(elemId);

//     selectedMovies.splice(elemIndex,1);
//     setLocalStorage();
//     renderFavourites(selectedMovies);
// }



button.addEventListener('click', loadSeries);


renderFavourites(selectedMovies)
