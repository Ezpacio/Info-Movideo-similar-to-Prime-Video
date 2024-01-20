// Global object for current page and api url
const global = {
    currentPage: window.location.pathname,
    api: {
        api_key: 'd087f4c33449d2dc1505b6a5b29961e1',
        api_url: 'https://api.themoviedb.org/3/'
    }

}


// Display movie categories
const displayMovieCategories = async (genre,type) => {
    // fetching api from fetchApiData
    const { results }  = await fetchGenriApi(`with_genres=${genre}`);

    results.forEach(genre => {
        const divCard = document.createElement('div');
        divCard.classList.add('card');  /* Detail link here */
        divCard.innerHTML = `
        <a class="card-link" href="#">
        <div class="card-head">
            ${genre.poster_path
                ? `<img src="https://tmdb.org/t/p/w400${genre.poster_path}" alt="${genre.title}">`
                : `<img src="./images/card-no-images.png" alt="${genre.title}">`}
        </div>
        </a>
        <div class="card-body">
            <div class="card-info">
                <h3 class="card-title">
                ${genre.title ? genre.title : genre.name}
                </h3>
                <div class="details">
                    <span>${genre.release_date ? genre.release_date : genre.first_air_date}</span>
                </div>
                <h3 class='avarage'><span>${genre.vote_average.toFixed(1)}</span> / 10</h3>
            </div>
        </div>
        `;

        document.querySelector(`.${type}-container > .grid-container`).appendChild(divCard);
    });
};



// Display 20 populer tvshows and movies
const displayPopurMoviesShows = async (link,type) => {
    // fetching api from fetchApiData
    const { results } = await fetchApiData(link);
    results.forEach(show => {
        const divCard = document.createElement('div');
        divCard.classList.add('card');  /* Detail link here */
        divCard.innerHTML = `
        <a class="card-link" href="#">
        <div class="card-head">
            ${show.poster_path
                ? `<img src="https://tmdb.org/t/p/w400${show.poster_path}" alt="${show.title}">`
                : `<img src="./images/card-no-images.png" alt="${show.title}">`}
        </div>
        </a>
        <div class="card-body">
            <div class="card-info">
                <h3 class="card-title">
                ${show.title ? show.title : show.name}
                </h3>
                <div class="details">
                    <span>${show.release_date ? show.release_date : show.first_air_date}</span>
                </div>
                <h3 class='avarage'><span>${show.vote_average.toFixed(1)}</span> / 10</h3>
            </div>
        </div>
        `
        document.querySelector(`.${type}-container > .grid-container`).appendChild(divCard);
    });
    // console.log(results);

};




// Display 6 trend movie to slide
const displaytrandMoviesToSlide = async (link) => {
    const { results } = await fetchApiData(link);

    for (let i = 0; i < 10; i++) {
        // results[i]
        const divSlide = document.createElement('div');
        divSlide.classList.add('swiper-slide');
        divSlide.innerHTML = `
        <div class="grad"></div>
        ${results[i].backdrop_path
            ? `<img src="https://image.tmdb.org/t/p/original/${results[i].backdrop_path}" alt="${results[i].title}">`
            : `<img src="./images/card-no-images.png" alt="${results[i].title}">`}

            <div class="slide-info">
                <h1 class="slide-title">${results[i].title ? results[i].title : results[i].name}</h1>
                <p class="slide-overview">${results[i].overview}</p>
                <h3 class='avarage'><span>${results[i].vote_average.toFixed(1)}</span> / 10</h3>
            </div>
        `;
        document.querySelector('.swiper-wrapper').appendChild(divSlide);
    }
};





// fetch api 
const fetchGenriApi = async (genre) => {
    const api_key = global.api.api_key;
    const api_url = global.api.api_url;

    const response = await fetch(`${api_url}discover/movie?api_key=${api_key}&${genre}`);
    const data = await response.json();

    return data;
};



// fetch api 
const fetchApiData = async (endpoint) => {
    const api_key = global.api.api_key;
    const api_url = global.api.api_url;

    const response = await fetch(`${api_url}${endpoint}?api_key=${api_key}`);
    const data = await response.json();

    return data;
}



const init = () => {
    switch (global.currentPage) {
        case '/dist/index.html':
            displaytrandMoviesToSlide('trending/movie/day');
            displayPopurMoviesShows('movie/popular','movies');
            displayPopurMoviesShows('tv/popular','shows');
            displayMovieCategories(28,'macera');
            displayMovieCategories(35,'komedi');
            displayMovieCategories(99,'belgesel');
            displayMovieCategories(18,'dram');
            displayMovieCategories(36,'tarihi');
            displayMovieCategories(27,'korku');
            displayMovieCategories(9648,'gizem');
            displayMovieCategories(16,'animasyon');
            displayMovieCategories(878,'bilim');
            break;
        case '/dist/movies.html':
            displayPopurMoviesShows('movie/now_playing','movies');
            displaytrandMoviesToSlide('trending/movie/day');
            break;
        case '/dist/shows.html':
            displayPopurMoviesShows('tv/popular','shows');
            displaytrandMoviesToSlide('trending/tv/day');
            break;
        case '/dist/action.html':
            displayMovieCategories(28,'macera');
            break;
        case '/dist/comedy.html':
            displayMovieCategories(35,'komedi');
            break;
        case '/dist/documentry.html':
            displayMovieCategories(99,'belgesel');
            break;
        case '/dist/drama.html':
            displayMovieCategories(18,'dram');
            break;
        case '/dist/Historie.html':
            displayMovieCategories(36,'tarihi');
            break;
        case '/dist/fear.html':
            displayMovieCategories(27,'korku');
            break;
        case '/dist/mystery.html':
            displayMovieCategories(9648,'gizem');
            break;
        case '/dist/animation.html':
            displayMovieCategories(16,'animasyon');
            break;
        case '/dist/siencefiction.html':
            displayMovieCategories(878,'bilim');
            break;
    }
}
document.addEventListener('DOMContentLoaded', init);