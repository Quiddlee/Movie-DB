//part 1


/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */


//part 2


/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';


//part 1


const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против...",
    ]
};

const adv = document.querySelectorAll('.promo__adv img');
const movieList = document.querySelector('.promo__interactive-list');
const movieDelete = movieList.querySelector('.promo__interactive-item');
const genre = document.querySelector('.promo__genre');
const bg = document.querySelector('.promo__bg');
const addFilmSubmit = document.querySelector('.add button');
const addFilmInput = document.querySelector('.adding__input');
const inputs = document.querySelectorAll('.add input');
const checkbox = inputs[1];

genre.textContent = 'Драма';

bg.style.backgroundImage = 'url("img/bg.jpg")';

adv.forEach(e => {
   e.remove(); 
});


movieList.innerHTML = '';

function addMovies () {
    movieDB.movies.sort();

    movieDB.movies.forEach((e, i) => {
        movieList.innerHTML += `
        <li class="promo__interactive-item">${i + 1} ${e}
            <div class="delete"></div>
        </li>
        `;
    });
}
addMovies();

// movieList.forEach((e, i) => {
//     e.textContent = movieDB.movies.sort()[i];
//     e.prepend(i + 1 + ' ');
// });


//part 2

function checkboxCheck () {
    if (checkbox.checked) {console.log('Добавляем любимый фильм')};
}

addFilmSubmit.addEventListener('click', (event) => {
    event.preventDefault();

    if (addFilmInput.value.length > 21) {
        movieDB.movies.push(`${addFilmInput.value.slice(0, 21)}...`);
    } else {
        movieDB.movies.push(addFilmInput.value);
    }

    movieList.innerHTML = '';
    addMovies();
    checkboxCheck();
});

movieList.addEventListener('click', (event) => {
    console.log(event.target.remove());
});