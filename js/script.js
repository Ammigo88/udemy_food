'use strict';

window.addEventListener('DOMContentLoaded', () => {

    // Tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });

    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });


    // Timer 

    // Вёрстка: у нас есть блок timer, в котором есть отдельные мини-блоки,
    // в которых есть span обозначенные определёнными идентификаторами
    // именно сюда будем подставлять значения часов, минут и дней.
    // Алгоритм действий:
    // 1. должна быть функция, которая будет устанавливать наш таймер. Т.е. получать эти элементы и что-то с ними делать
    // 2. должна быть функция/функционал, определяющая разницу между временем (дедлайн/сколько осталось до конца акции)
    //    вычислим время, которое установелно у пользователя и найти разницу, которую будем отображать на экране
    // 3. функция, которая будет заниматься обновлением нашего таймера

    const deadline = '2022-03-20';

    // разница между дедлайном и нашем текущем временем
    function getTimRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            // округляем до ближайшего целого
            // 1000 мс * 60 (получаем кол-во мс в минуте) * 60 (получаем кол-во мс в часе) * 24 (получаем кол-во мс в сутках)

            // получаем общее кол-во часов, которое осталось в таймере
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),

            // минуты
            minutes = Math.floor((t / 1000 / 60) % 60),
            // секунды
            seconds = Math.floor((t / 1000) % 60);

        // чтобы вернуть переменные наружу (локально)
        // возвращаем объект
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    // функция устанавливающая наши часы на страничку
    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            // для запуска функции updateClock каждую секунду
            timeInterval = setInterval(updateClock, 1000),

            promTitle = document.querySelector('#promtitle'),
            promTimer = document.querySelector('.timer');

        // запускаем функцию, чтобы не было мерцания/моргания счётчика
        updateClock();
        // функция, обновляющая таймер каждую секунду
        function updateClock() {
            let t = getTimRemaining(endtime);


            days.innerHTML = t.days;
            hours.innerHTML = t.hours;
            minutes.innerHTML = t.minutes;
            seconds.innerHTML = t.seconds;

            // если время вышло, то наш таймер не обновляем
            if (t.total <= 0) {
                clearInterval(timeInterval);
                // promTimer.style.display = 'none';
                // promTitle.textContent = 'Пока акций нет';
                // days.innerHTML = 0;
                // hours.innerHTML = 0;
                // minutes.innerHTML = 0;
                // seconds.innerHTML = 0;
            }

        }
    }


    // устанавливаем наши часы и проверяем
    setClock('.timer', deadline);

    // Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalCloseBtn = document.querySelector('[data-close]');

    // modalTrigger.forEach(btn => {

    //     btn.addEventListener('click', () => {
    //     // modal.classList.add('show');
    //     // modal.classList.remove('hide');
    
    //     // !!! можно через toggle
    //     modal.classList.toggle('show');

    //     // убираем прокрутку сайта, пока модальное окно открыто
    //     document.body.style.overflow = 'hidden';
    //     });
    // });

    // Рефакторим код и создаём функцию открытия модального окна
    function openModal() {
        modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';

        // если пользователь сам открыл модальное окно - отменяем modalTimerId
        // т.е. отменяем автоматическое открытие модального окна
        clearInterval(modalTimerId);
    }

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    // Рефакторим код и создаём функцию закрытия модального окна
    function closeModal() {
        modal.classList.toggle('show');
        document.body.style.overflow = '';
    }
    
    modalCloseBtn.addEventListener('click', closeModal);

    // переписываем код ниже и используем функцию closeModal
    // modalCloseBtn.addEventListener('click', () => {
    //     // modal.classList.add('hide');
    //     // modal.classList.remove('show');

    //     // !!! можно через toggle
    //     modal.classList.toggle('show');
    //     // возвращаем прокрутку сайта, когда модальное окно закрыто
    //     document.body.style.overflow = '';
    // });

    // скрываем модальное окно при клике на область вне этого окна
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            // modal.classList.toggle('show');
            // document.body.style.overflow = '';

            // просто добавляем ранее написанную функцию
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // всплывающее модальное окно через определенный промежуток времени
    const modalTimerId = setTimeout(openModal, 3000);

    // открытие модального окна, когда пользователь долистал страницу до конца
    // window.addEventListener('scroll', () => {
    //     // сравниваем контент, где пользователь находится с полным контентом странички
    //     // как только они совпадают, значит пользователь долистал страницу до конца
    //     if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
    //         openModal();
    //     }
    // });

    // Рефакторим код и создаём функцию скролла
    function showModalByScroll() {
        // сравниваем контент, где пользователь находится с полным контентом странички
        // как только они совпадают, значит пользователь долистал страницу до конца
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            // удаляем обработичк событий, чтобы модальное окно при скролле открылось лишь один раз
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);







});