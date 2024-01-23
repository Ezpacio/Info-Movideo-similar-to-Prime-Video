// Global object for current page and api url
const global = {
    currentPage: window.location.pathname,
    api: {
        api_key: 'd087f4c33449d2dc1505b6a5b29961e1',
        api_url: 'https://api.themoviedb.org/3/'
    },
    search: {
        term: '',
        type: 'multi',
        page: 1,
        totalPages: 1,
        totalResults: 0
    },

}

// Display movie categories
const displayMovieCategories = async (genre, type) => {
    // fetching api from fetchApiData
    const { results } = await fetchGenriApi(`with_genres=${genre}`);

    results.forEach(genre => {
        const divCard = document.createElement('div');
        divCard.classList.add('card');  /* Detail link here */
        divCard.innerHTML = `
        <a class="card-link" href="${genre.title ? 'movieDetail' : 'showDetail'}.html?id=${genre.id}">
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
const displayPopurMoviesShows = async (link, type) => {
    // fetching api from fetchApiData
    const { results } = await fetchApiData(link);
    results.forEach(show => {
        const divCard = document.createElement('div');
        divCard.classList.add('card');  /* Detail link here */
        divCard.innerHTML = `
        <a class="card-link" href="${show.title ? 'movieDetail' : 'showDetail'}.html?id=${show.id}">
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
};

// Display 6 trend movie to slide
const displaytrandMoviesToSlide = async (link) => {
    const { results } = await fetchApiData(link);

    for (let i = 0; i < 10; i++) {
        const divSlide = document.createElement('div');
        divSlide.classList.add('swiper-slide');
        divSlide.innerHTML = `
        <div class="grad"></div>
        <a href="${results[i].title ? 'movieDetail' : 'showDetail'}.html?id=${results[i].id}">
        ${results[i].backdrop_path
                ? `<img src="https://image.tmdb.org/t/p/original/${results[i].backdrop_path}" alt="${results[i].title}">`
                : `<img src="./images/card-no-images.png" alt="${results[i].title}">`}
        </a>

            <div class="slide-info">
                <h1 class="slide-title">${results[i].title ? results[i].title : results[i].name}</h1>
                <p class="slide-overview">${results[i].overview}</p>
                <h3 class='avarage'><span>${results[i].vote_average.toFixed(1)}</span> / 10</h3>
            </div>
        `;
        document.querySelector('.swiper-wrapper').appendChild(divSlide);
    }
};

// Detail pages
const showsDetailPage = async (link) => {
    const showId = window.location.search.split('=')[1];

    const shows = await fetchApiData(`${link}/${showId}`);

    const { results } = await fetchApiData(`trending/${link}/day`);

    displayBackgroundImage(shows.backdrop_path);

    // create divs
    const detailInfo = document.createElement('div');
    detailInfo.classList.add('detail-outer');

    detailInfo.innerHTML = `
        <div class="grad"></div>
        <div class="detail-info">
            <h1 class="title">
                ${shows.title ? shows.title : shows.name}
            </h1>
            <p class="overview">
                ${shows.overview}
            </p>
            <p class="relase-date">
                ${shows.release_date ? shows.release_date : shows.first_air_date}
                <ul>
                ${shows.genres.map((genre) => `<li class="genres">${genre.name}</li>`).join('')}
                </ul>
            </p>
            <h3 class="avarage"><span>${shows.vote_average.toFixed(1)}</span> / 10</h3>
            <a class="btn" href="${shows.homepage}" target="_blank">Visit Homepage</a>
        </div>
        <div class="grad-ttop"></div>
        <div class="ilgili">
            <h3>İlgili</h3>
        </div>
    `;
    console.log(shows);
    results.forEach(slideImg => {
        const divSmallSlide = document.createElement('div');
        divSmallSlide.classList.add('swiper-slide');

        divSmallSlide.innerHTML = `
        <div class="card slide-card">
            <a class="card-link slide-link" href="${slideImg.title ? 'movieDetail' : 'showDetail'}.html?id=${slideImg.id}">
                <div class="card-head">
                ${slideImg.backdrop_path
                ? `<img src="https://image.tmdb.org/t/p/original/${slideImg.backdrop_path}" alt="${slideImg.title ? slideImg.title : slideImg.name}">`
                : `<img src="./images/card-no-images.png" alt="${slideImg.title ? slideImg.title : slideImg.name}">`}
                </div>
            </a>
            <div class="card-body">
                <div class="card-info">
                    <h3 class="card-title">
                        ${slideImg.title ? slideImg.title : slideImg.name}
                    </h3>
                    <div class="details">
                        <span>${slideImg.release_date ? slideImg.release_date : slideImg.first_air_date}</span>
                    </div>
                    <h3 class="avarage"><span>${slideImg.vote_average.toFixed(1)}</span> / 10</h3>
                </div>
            </div>
        </div>
        `;
        document.querySelector('.swiper-wrapper').appendChild(divSmallSlide)
    });


    document.querySelector('.show-detail-container').appendChild(detailInfo);
};

function displayBackgroundImage(backgroundPath) {
    const overlayDiv = document.createElement('div');
    overlayDiv.classList.add('show-detail-container')
    overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
    overlayDiv.style.backgroundSize = 'cover';
    overlayDiv.style.backgroundPosition = 'top';
    overlayDiv.style.position = 'relative';
    overlayDiv.style.height = 'calc(100vh - 60px)';
    overlayDiv.style.width = '100%';

    document.getElementById('show-detail-outer').appendChild(overlayDiv);
}

// Search
const search = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    global.search.type = 'multi';
    global.search.term = urlParams.get('search-term');

    if (global.search.term !== '' && global.search.term !== null) {
        const { results, total_pages, page, total_results } = await searchAPIData();

        global.search.page = page;
        global.search.totalPages = total_pages;
        global.search.totalResults = total_results;

        if (results.length === 0) {
            alert('No results found!');
            return;
        }
        displaySearchResults(results);
    }else {
        alert('Please enter a search term!');
    }
};

const displaySearchResults = (results) => {

    document.querySelector('.grid-container').innerHTML = '';
    document.getElementById('pagination').innerHTML = '';

    results.forEach(result => {

        const showResult = document.createElement('div');
        showResult.classList.add('card');
        showResult.innerHTML = `
        <a class="card-link" href="${result.title ? 'movieDetail' : 'showDetail'}.html?id=${result.id}">
        <div class="card-head">
            ${result.poster_path
                ? `<img src="https://tmdb.org/t/p/w400${result.poster_path}" alt="${result.title}">`
                : `<img src="./images/card-no-images.png" alt="${result.title}">`}
        </div>
        </a>
        <div class="card-body">
            <div class="card-info">
                <h3 class="card-title">
                ${result.title ? result.title : result.name}
                </h3>
                <div class="details">
                    <span>${result.release_date ? result.release_date : result.first_air_date}</span>
                </div>
                <h3 class='avarage'><span>${result.vote_average !== undefined ? result.vote_average.toFixed(1) : 0}</span> / 10</h3>
            </div>
        </div>`;

        document.querySelector('.title').innerHTML = `
            <h3>"${global.search.term}" Sonuçları</h3>
        `;

        document.querySelector('.grid-container').appendChild(showResult);
    });
    displayPagination();
};

// Display pagination
const displayPagination = () => {
    document.querySelector('#pagination').innerHTML = `
    <button class="btn-page prev">
    <i class="iconoir-nav-arrow-left"></i>
    </button>
    <button class="btn-page next">
        <i class="iconoir-nav-arrow-right"></i>
    </button>`;

    // select buttons
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');
    // Disable prev btn if on first page
    if(global.search.page === 1){
        prevBtn.disabled = true;
    }

    if(global.search.page === global.search.totalPages){
        nextBtn.disabled = true;
    }

    // Next page
    nextBtn.addEventListener('click', async () => {
        global.search.page++;
        const {results, total_pages} = await searchAPIData();
        displaySearchResults(results);
    })

    // Prev page
    prevBtn.addEventListener('click', async () => {
        global.search.page--;
        const {results, total_pages} = await searchAPIData();
        displaySearchResults(results);
    })
}



// search api deta
const searchAPIData = async () => {
    const api_key = global.api.api_key;
    const api_url = global.api.api_url;

    const response = await fetch(`${api_url}search/${global.search.type}?api_key=${api_key}&
    language=en-US&query=${global.search.term}&page=${global.search.page}`);
    const data = await response.json();

    return data;
};

// fetch api for genre
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
        case '/':
            displaytrandMoviesToSlide('trending/movie/day');
            displayPopurMoviesShows('movie/popular', 'movies');
            displayPopurMoviesShows('tv/popular', 'shows');
            displayMovieCategories(28, 'macera');
            displayMovieCategories(35, 'komedi');
            displayMovieCategories(99, 'belgesel');
            displayMovieCategories(18, 'dram');
            displayMovieCategories(36, 'tarihi');
            displayMovieCategories(27, 'korku');
            displayMovieCategories(9648, 'gizem');
            displayMovieCategories(16, 'animasyon');
            displayMovieCategories(878, 'bilim');
            break;
        case '/dist/movies.html':
        case '/movies':
            displayPopurMoviesShows('movie/now_playing', 'movies');
            displaytrandMoviesToSlide('trending/movie/day');
            break;
        case '/dist/shows.html':
        case '/shows':
            displayPopurMoviesShows('tv/popular', 'shows');
            displaytrandMoviesToSlide('trending/tv/day');
            break;
        case '/dist/action.html':
        case '/action':
            displayMovieCategories(28, 'macera');
            break;
        case '/dist/comedy.html':
        case '/comedy':
            displayMovieCategories(35, 'komedi');
            break;
        case '/dist/documentry.html':
        case '/documentry':
            displayMovieCategories(99, 'belgesel');
            break;
        case '/dist/drama.html':
        case '/drama':
            displayMovieCategories(18, 'dram');
            break;
        case '/dist/Historie.html':
        case '/Historie':
            displayMovieCategories(36, 'tarihi');
            break;
        case '/dist/fear.html':
        case '/fear':
            displayMovieCategories(27, 'korku');
            break;
        case '/dist/mystery.html':
        case '/mystery':
            displayMovieCategories(9648, 'gizem');
            break;
        case '/dist/animation.html':
        case '/animation':
            displayMovieCategories(16, 'animasyon');
            break;
        case '/dist/siencefiction.html':
        case '/siencefiction':
            displayMovieCategories(878, 'bilim');
            break;
        case '/dist/showDetail.html':
        case '/showdetail':
            showsDetailPage('tv');
            break;
        case '/dist/movieDetail.html':
        case '/moviedetail':
            showsDetailPage('movie');
            break;
        case '/dist/search.html':
        case '/search.html':
            search();
            break;
    }
}
document.addEventListener('DOMContentLoaded', init);