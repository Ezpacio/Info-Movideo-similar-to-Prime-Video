const global = {
    currentPage: window.location.pathname,
    api: {
        api_key: 'd087f4c33449d2dc1505b6a5b29961e1',
        api_url: 'https://api.themoviedb.org/3/'
    }
    
}

const init = ()=>{
    switch (global.currentPage){
        case '/dist/index.html':
            console.log('AnaSayfa');
            break;
        case '/dist/movies.html':
            console.log('Filmler');
            break;
        case '/dist/shows.html':
            console.log('TV Dizileri');
            break;
    
    }
}
document.addEventListener('DOMContentLoaded', init);