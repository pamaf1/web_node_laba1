const exBtn = Array.from(document.querySelectorAll('.ex_btn'));
let sector = document.querySelector('.grid-element3');
let sector4 = document.querySelector('.grid-element4');
let sector5 = document.querySelector('.grid-element5');

const textExercises = [
    'Завдання №1:\nПоміняти місцями контент блоків 4 та 5',
    'Завдання №2:\nОбчислити площу овала, беручи необхідні значення із відповідних змінних у скрипті',

    'Напишіть скрипт, який визначає кількість слів у\
тексті, де слова розділяються пробілом, беручи\
текст із відповідної форми в блоці «3», а отриманий\
результат виводить за допомогою діалогового вікна\
і зберігає в куках, причому:\
\nа) при оновленні документа в броузері користувачу за допомогою діалогового\
вікна виводиться інформація, збережена в куках, із питанням про необхідність\
видалити дані із куків, і не виводиться згадана вище форма;\
\nб) при підтвердженні питання відповідні куки видаляються, і документ\
оновлюється з початковим станом із наявною формою для введення даних;\
\nв) при відмові виводиться наступне діалогове вікно із інформуванням\
користувача про наявність куків і необхідність перезавантаження документа.',

'Завдання №4:\nНапишіть скрипт, який при настанні події dblclick задає вирівнювання по лівому\
краю вмісту блоків «3», «4», «5» при встановленні користувачем відповідних\
галочок у формі і зберігає відповідні значення в локальному сховищі броузера\
так, щоб при наступному відкриванні документа властивості вирівнювання по\
лівому краю вмісту блоків «3», «4», «5» встановлювались із збережених\
значень в локальному сховищі.',


'Напишіть скрипт додавання зображень в блок «4»:\
\nа) необхідні елементи форми появляються у блоці «5» внаслідок кліку на блоці\
«х» одразу після наявного в блоці «5» контенту;\
\nб) кількість зображень необмежена, використовуйте зображення з інтернету;\
\nв) поруч розміщується кнопка, внаслідок натискання на яку внесені дані\
зображення зберігаються в локальному сховищі броузера (структуровано на\
ваш розсуд), а саме зображення додається в кінці початкового вмісту блока «4»;\
\nг) під кожним новим зображенням розміщується кнопка, внаслідок натискання\
на яку нове зображення видаляється із локального сховища броузера і\
припиняється його відображення у блоці «4» без перезавантаження документа.'
]; 

(function addExerciseListeners() {
    for (let [index, exercise] of exBtn.entries()) {
        exercise.addEventListener('click', () => {
            let isConfirm = confirm(textExercises[index]);
            if (isConfirm) {
                exerciseFunctionsToRun[index]();
            }
        });
    }
}());

const exerciseFunctionsToRun = [
    first,
    second,
    third,
    fourth,
    fifth
];

function first() {
    let a = document.querySelector('.grid-element4 p'),
        b = document.querySelector('.grid-element5 p');
    
    [a.textContent, b.textContent] = [b.textContent, a.textContent];
}

function second() {

    const elipsSquare = (R, r) => R * r * Math.PI;

    if (sector.textContent.length < 100) {
        sector.firstChild.textContent += `Площа овалу = ${elipsSquare(13, 5)}`;
    } 
}

function third(isInitial=true) {
    let form = document.createElement('div'),
        input = document.createElement('input'),
        button = document.createElement('input'),
        p = document.createElement('p'),
        p2 = document.createElement('p');

    removeCont(); 
    createNewF();
    isInitial ? displayBefore() : displayAfter();

    function displayBefore() {
        form.appendChild(input);
        button.addEventListener('click', () => {
            p.textContent = `Текст: ${input.value}`;
            let enteredText = document.querySelector('.enteredText').textContent;

            if (enteredText.length == 0) {
                p2.textContent = 'Потрібно ввести текст';
            } else {
                p2.textContent = calculateWords(enteredText);
                alert(calculateWords(enteredText));
                document.cookie = `text=${enteredText}`;
                document.cookie = `numOfWords=${calculateWords(enteredText)}`;
            }
        });
    }
    function displayAfter() {
        p.textContent = `${readCookie('text')}`;
        p2.textContent = readCookie('numOfWords');
        button.value = 'Видалити куки і ввести самостійно'
        button.addEventListener('click', () => {
            deleteCookie();
            window.location.reload();
        });
    }

    function createNewF() {
        sector.appendChild(form);
        form.style.margin = '0 auto';
        form.style.width = '35%';
        form.style.display = 'flex';
        form.appendChild(button);
        sector.appendChild(p);
        p.classList.add('enteredText');
        sector.appendChild(p2);
        input.type = 'string';
        input.autofocus = true;
        button.type = 'button';
        button.value = 'Визначити';
        button.style.margin = '0 auto';
    }

    function calculateWords(words) {
        let numOfWords = words.trim().split(" ");
        return `Кількість слів: ${numOfWords.length-1}`
    }
    
}

function removeCont() {
	removeChild(sector);
	p = document.createElement('p');
	sector.appendChild(p);
	p.textContent = 'Немного информации';
}

function removeChild(element) {
	while (sector.firstChild) {
		sector.removeChild(sector.firstChild);
	}
}

function readCookie(name) {
	let nameCook = name + "=",
	    spl = document.cookie.split(';');

	for(var i=0; i<spl.length; i++) {
		var c = spl[i];
		while(c.charAt(0) == " ") {
			c = c.substring(1, c.length);
		}
		if(c.indexOf(nameCook) == 0) {
			return c.substring(nameCook.length, c.length);
		}
	}
	return null;
}

function deleteCookie() {
    const cookies = document.cookie.split(/;/);
    for (let i = 0; i < cookies.length; i++) {
	    let cookie = cookies[i].split(/=/);
	    document.cookie = cookie[0] + "=;max-age=-1";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let isAllowCookie = false;
    if (readCookie('text') != null) {
        isAllowCookie = confirm(`Зберегти дані?\n${readCookie('text')};\n${readCookie('numOfWords')}`);
    }
    if (isAllowCookie) {
        alert('Перезавантажте сторінку!\nУ Вас залишилися куки.');
        third(false);
    } else {
        deleteCookie();
        third();
    }
});   


function fourth() {
    let div = document.createElement('div'),
        firstOption = document.createElement('input'),
        leftAligment = document.createElement('h5'),
        secondOption = document.createElement('input');
        centerAligment = document.createElement('h5'),

    
    removeCont();
    displaySet();

    function displaySet() {
        document.querySelector('.grid-element6').appendChild(div);
        div.style.display = 'flex';
        div.style.justifyContent = 'space-around';
        div.style.alignItems = 'center';
        div.style.margin = '0 auto';
        div.style.width = '48%';
        div.appendChild(firstOption);
        firstOption.id = 'first';
        firstOption.type = 'radio';
        firstOption.name = 'radios';
        div.appendChild(leftAligment);
        leftAligment.textContent = 'Вирівнювання по лівому краю'
        div.appendChild(secondOption);
        secondOption.id = 'second';
        secondOption.type = 'radio';
        secondOption.name = 'radios'
        secondOption.setAttribute('checked', 'true');
        div.appendChild(centerAligment);
        centerAligment.textContent = 'Вирівнювання по центру'
    }

    if (localStorage.radio == 'first') firstOption.checked = 'true';
    if (localStorage.radio == 'second') secondOption.checked = 'true';
       
    firstOption.addEventListener('dblclick', () => {
        sector.style.justifyContent = 'flex-start';
        sector4.style.justifyContent = 'flex-start';
        sector5.style.justifyContent = 'flex-start';
        localStorage.radio = 'first';
    });

    secondOption.addEventListener('dblclick', () => {
        sector.style.justifyContent = 'center';
        sector4.style.justifyContent = 'center';
        sector5.style.justifyContent = 'center';
        localStorage.radio = 'second';
    });
}


function fifth() {
    let div = document.createElement('div'),
        btnAdd = document.createElement('button'),
        btnSave = document.createElement('button'),
        limit = document.createElement('p');


        document.querySelector('.grid-element4 p').remove();
        removeCont();
        sector4.style.display = 'flex';
        sector4.style.flexWrap = 'wrap';
        sector.appendChild(div);
        div.style.display = 'flex';
        div.style.justifyContent = 'center';
        div.style.alignItems = 'center';
        div.style.height = '40%';
        div.appendChild(btnAdd);
        btnAdd.textContent = 'Додати';
        div.appendChild(limit);
        limit.textContent = `Ще можна додати ${9 - sector4.children.length} зображень`;
        div.appendChild(btnSave);
        btnSave.textContent = 'Зберегти';

        const srcs = localStorage.getItem('srcs').split(',');
   
        for (let i = 0; i < +localStorage.getItem('imgs'); i++) {
            displayImg(srcs[i]);
            displayDelete();
        }
        checkImgLimit();
    
    btnAdd.addEventListener('click', () => {
        displayImg(`img/${random()}.jpg`);
        checkImgLimit();
        displayDelete();
    });

    btnSave.addEventListener('click', () => {
        if (!sector4.children.length) alert('Немає картинок, які можна зберегти');
        addToLocalStorage(sector4.children.length);
    });

    function displayImg(link) {
        let imgContainer = document.createElement('div'),
            imgBtn = document.createElement('button'),
            img = document.createElement('img');

        sector4.appendChild(imgContainer);
        imgContainer.style.width = '125px';
        imgContainer.style.height = '140px';
        imgContainer.style.display = 'flex';
        imgContainer.style.flexDirection = 'column';
        imgContainer.appendChild(img);
        img.style.width = '125px';
        img.style.height = '120px';
        img.src = link;
        imgContainer.appendChild(imgBtn);
        imgBtn.textContent = 'Видалити';
        limit.textContent = `Ще можна додати ${9 - sector4.children.length} зображень`;
    }

    function displayDelete() {
        let btns = Array.from(document.querySelectorAll('.grid-element4 button')),
            containers = Array.from(document.querySelectorAll('.grid-element4 div'));

        for (let i = 0; i < btns.length; i++) {
            btns[i].addEventListener('click', () => {
                containers[i].remove();
                if (localStorage.srcs != null) addToLocalStorage(sector4.children.length);
                
                div.firstChild.style.display = 'block';
                limit.textContent = `Ще можна додати ${9 - sector4.children.length} зображень`;
            });
        }
    }

    function checkImgLimit() {
        if (sector4.children.length == 9) {
            btnAdd.style.display = 'none';
            limit.textContent = `Більше зображень додати не можна`;
        }
    }

    function addToLocalStorage(imgsCount) {
        let imgs = Array.from(document.querySelectorAll('img'));
            srcsRow = [];

        for (let i = 0; i < imgs.length; i++) srcsRow.push(imgs[i].src);
        localStorage.setItem('imgs', imgsCount);
        localStorage.setItem('srcs', srcsRow);
    }

    function random() {
        min = Math.ceil(1);
        max = Math.floor(9);
        return Math.floor(Math.random() * (9 - 1)) + 1;
    }
} 
