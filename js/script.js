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

document.addEventListener('DOMContentLoaded', () => {
    

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
    const bg = document.querySelector('.promo__bg');
    const genre = document.querySelector('.promo__genre');
    const movieList = document.querySelector('.promo__interactive-list');
    const addForm = document.querySelector('form.add');
    const addFilmInput = document.querySelector('.adding__input');
    const checkbox = document.querySelector('[type="checkbox"]');

    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove(); 
        });
    };

    const makeChanges = () => {
        genre.textContent = 'Драма';
    
        bg.style.backgroundImage = 'url("img/bg.jpg")';
    };

    const sortArr = (arr) => {
        arr.sort();
    };
    
    function createMovieList (films, parent) {
        parent.innerHTML = '';
        sortArr(films);    


        films.forEach((e, i) => {
            parent.innerHTML += `
                <li class="promo__interactive-item">${i + 1} ${e}
                    <div class="delete"></div>
                </li>
            `;
        });

        document.querySelectorAll('.delete').forEach((btn, i) => {    //в этой функции мы создали НОВЫЙ список, тоесть старый список удалился, поэтому когда мы помещаем элементы в переменную в самом начале, список с этими элементами устаревает
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);
                
                createMovieList(films, parent);
            });
        });
    }

    // movieList.forEach((e, i) => {
    //     e.textContent = movieDB.movies.sort()[i];
    //     e.prepend(i + 1 + ' ');
    // });


    //part 2

    function isChecked () {
        if (checkbox.checked) {console.log('Добавляем любимый фильм');}
    }

    addForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let newFilm = addFilmInput.value;
        
        if (newFilm) {
            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`;                         // ${} - интерполяция 🙂
            } 
            
            movieDB.movies.push(newFilm);
            sortArr(movieDB.movies);
            
            createMovieList(movieDB.movies, movieList);
        }
        
        isChecked();
        
        event.target.reset();
    });

    deleteAdv(adv);
    makeChanges();
    createMovieList(movieDB.movies, movieList);
});