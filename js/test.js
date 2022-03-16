'use strict';

window.addEventListener('DOMContentLoaded', () => {
          // присваиваем переменную элементам, при клике на которые будут выводиться табы
    const tabs = document.querySelectorAll('.tabheader__item'),
          // контент табов
          tabsContent = document.querySelectorAll('.tabcontent'),
          // 
          tabsParent = document.querySelector('.tabheader__items');

          // скрываем все ненужные нам табы
    function hideTabContent() {
        // т.к. tabsContent - псевдомассив, перебираем его через forEach()
        // для каждого элемента внутри tabsContent устанавливаем display: none;
        tabsContent.forEach(item => {
            item.style.display = 'none';
        });

        // убираем класс активности у табов
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    // функция, которая будет показывать табы
    // i = 0 - первй элемент
    function showTabContent(i = 0) {
        // нужно понимать, к какому элементу мы обращаемся [i]
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
        
    }

    hideTabContent();
    showTabContent();

    // добавляем обработчик событий с делегированием
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

});
