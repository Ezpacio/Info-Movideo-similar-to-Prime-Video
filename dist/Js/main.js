const header = document.querySelector('header');
const navBtns = document.querySelectorAll('.nav-li');
const searchBtn = document.querySelector('.search-icon');
const resetBtn = document.querySelector('input[type="reset"]');
const tabletMenu = document.getElementById('menu');
const listToggle = document.querySelector('.kategori');
const profile = document.getElementById('profile');

// add sticky class to navigation
window.addEventListener('scroll', () => {
    header.classList.toggle('sticky', window.scrollY > 60);
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

function init() {

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
init();