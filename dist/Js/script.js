const navBtns = document.querySelectorAll('.nav-li');
const searchBtn = document.querySelector('.search-icon');
const resetBtn = document.querySelector('input[type="reset"]');
const tabletMenu = document.getElementById('menu');
const listToggle = document.querySelector('.kategori');
const profile = document.getElementById('profile');

// Page Loader
window.addEventListener('load', function () {
    const pageLoader = document.querySelector('.page-loader');

    setTimeout(function () {
        pageLoader.style.transition = 'opacity 1s';
        pageLoader.style.opacity = '0';
    }, 500);

    setTimeout(function () {
        pageLoader.style.display = 'none';
    }, 1500);
});

// add sticky class to navigation
window.addEventListener('scroll', () => {
    document.querySelector('header').classList.toggle('sticky', window.scrollY > 60);
    document.querySelector('.flip-top').classList.toggle('active', window.scrollY > 650)
})

// Add active class navigation buttons
const navigationButn = () => {
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            removeActiveClasses();
            btn.classList.add('active');
            tabletMenu.classList.remove('active')
        })
    })
    const removeActiveClasses = () => {
        navBtns.forEach(item => {
            item.classList.remove('active')
        })
    }
};

document.querySelectorAll('.t-list').forEach(item => {
    item.addEventListener('click', () => {
        tabletMenu.classList.remove('active');
    })
})
document.querySelectorAll('.c-list').forEach(item => {
    item.addEventListener('click', () => {
        profile.classList.remove('active');
    })
})






/* Slide Options*/
const swiper = new Swiper('.swiper', {
    speed: 900,
    spaceBetween: 30,
    slidesPerView: 1,
    pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true
    },
    keyboard:{
        enabled: true,
        onlyInViewport: true,
        pageUpDown: true
    },
    autoplay: {
        delay: 5000,
    },
    // effect: 'coverflow',
    // grabCursor: true,
    // centeredSlides: true,
    // loop: true,
    // coverflowEffect: {
    // rotate: 0,
    // stretch: 0,
    // depth: 100,
    // modifier: 2.5,
    // slideShadows: true,
    // },
});





function initAll() {

    searchBtn.addEventListener('click', () => {
        // searchBtn.firstElementChild.classList.toggle('iconoir-xmark');
        // searchBtn.parentElement.classList.remove('active');
    });
    resetBtn.addEventListener('click', () => {
        resetBtn.parentElement.previousElementSibling.value = '';
    });
    tabletMenu.addEventListener('click', () => {
        tabletMenu.classList.toggle('active')
        tabletMenu.lastElementChild.classList.toggle('rotate'); // Icon
    });
    searchBtn.addEventListener('click', () => {
        searchBtn.parentElement.classList.toggle('active');
        searchBtn.firstElementChild.classList.toggle('iconoir-xmark')
    });
    listToggle.addEventListener('click', () => {
        searchBtn.classList.toggle('active');
    });
    document.querySelector('#navigation').addEventListener('click', function(event) {
        event.stopPropagation(); 
    });
    profile.addEventListener('click', () => {
        profile.classList.toggle('active');
    })
    document.querySelector('.profile-popup').addEventListener('click', function(event) {
        event.stopPropagation(); 
    });

    navigationButn();
}
initAll();