const btn_exercices = Array.from(document.querySelectorAll('.ex_btn'));
let content = document.querySelector('.grid-item3');
let item4 = document.querySelector('.grid-item4');
let item5 = document.querySelector('.grid-item5');

btn_exercices[0].addEventListener('click', () => {
    alert('Завдання №1:\nПоміняти місцями контент блоків 4 та 5');
    firstEx();
});

function firstEx() {
    let a = document.querySelector('.grid-item4 p'),
        b = document.querySelector('.grid-item5 p');
    
    [a.textContent, b.textContent] = [b.textContent, a.textContent];
}

btn_exercices[1].addEventListener('click', () => {
    alert('Завдання №2:\nОбчислити площу овала, беручи необхідні значення із відповідних змінних у скрипті');
    secondEx();
});

function secondEx() {

    const elipsSquare = (R, r) => R * r * Math.PI;

    if (content.textContent.length < 100) {
        content.firstChild.textContent += `Площа овалу = ${elipsSquare(8, 10)}`;
    } 
}

btn_exercices[2].addEventListener('click', () => {
    alert('Напишіть скрипт, який визначає кількість слів у\
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
користувача про наявність куків і необхідність перезавантаження документа.');
    thirdEx();
});

function thirdEx(isInitial=true) {
    let form = document.createElement('div'),
        input = document.createElement('input'),
        button = document.createElement('input'),
        p = document.createElement('p'),
        p2 = document.createElement('p');

    clearContent(); 
    createForm();
    isInitial ? showBefore() : showAfter();

    function showBefore() {
        form.appendChild(input);
        button.addEventListener('click', () => {
            p.textContent = `Текст: ${input.value}`;
            let enteredText = document.querySelector('.enteredText').textContent;

            if (enteredText.length == 0) {
                p2.textContent = 'Потрібно ввести текст';
            } else {
                p2.textContent = getNumOfWords(enteredText);
                alert(getNumOfWords(enteredText));
                document.cookie = `text=${enteredText}`;
                document.cookie = `numOfWords=${getNumOfWords(enteredText)}`;
            }
        });
    }
    function showAfter() {
        p.textContent = `${readCookie('text')}`;
        p2.textContent = readCookie('numOfWords');
        button.value = 'Видалити куки і ввести самостійно'
        button.addEventListener('click', () => {
            deleteCookie();
            window.location.reload();
        });
    }

    function createForm() {
        content.appendChild(form);
        form.style.margin = '0 auto';
        form.style.width = '35%';
        form.style.display = 'flex';
        form.appendChild(button);
        content.appendChild(p);
        p.classList.add('enteredText');
        content.appendChild(p2);
        input.type = 'string';
        input.autofocus = true;
        button.type = 'button';
        button.value = 'Порахувати';
        button.style.margin = '0 auto';
    }

    function getNumOfWords(words) {
        let numOfWords = words.trim().split(" ");
        return `Кількість слів: ${numOfWords.length-1}`
    }
    
}

function clearContent() {
	deleteChildren(content);
	p = document.createElement('p');
	content.appendChild(p);
	p.textContent = 'Рандомний текст';
}

function deleteChildren(element) {
	while (content.firstChild) {
		content.removeChild(content.firstChild);
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
        isAllowCookie = confirm(`Зберегти дані з куків?\n${readCookie('text')};\n${readCookie('numOfWords')}`);
    }
    if (isAllowCookie) {
        alert('Перезавантажте сторінку!\nКуки є в наявності.');
        thirdEx(false);
    } else {
        deleteCookie();
        thirdEx();
    }
});   


btn_exercices[3].addEventListener('click', () => {
    alert('Завдання №4:\nНапишіть скрипт, який при настанні події dblclick задає вирівнювання по лівому\
краю вмісту блоків «3», «4», «5» при встановленні користувачем відповідних\
галочок у формі і зберігає відповідні значення в локальному сховищі броузера\
так, щоб при наступному відкриванні документа властивості вирівнювання по\
лівому краю вмісту блоків «3», «4», «5» встановлювались із збережених\
значень в локальному сховищі.');
    fourthEx();
});

function fourthEx() {
    let div = document.createElement('div'),
        firstOption = document.createElement('input'),
        leftAligment = document.createElement('h5'),
        secondOption = document.createElement('input');
        centerAligment = document.createElement('h5'),

    
    clearContent();
    showOption();

    function showOption() {
        document.querySelector('.grid-item6').appendChild(div);
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
        content.style.justifyContent = 'flex-start';
        item4.style.justifyContent = 'flex-start';
        item5.style.justifyContent = 'flex-start';
        localStorage.radio = 'first';
    });

    secondOption.addEventListener('dblclick', () => {
        content.style.justifyContent = 'center';
        item4.style.justifyContent = 'center';
        item5.style.justifyContent = 'center';
        localStorage.radio = 'second';
    });
}


btn_exercices[4].addEventListener('click', () => {
    alert('Натисніть на слова"Стата 55%"!\
\nНапишіть скрипт додавання зображень в блок «4»:\
\nа) необхідні елементи форми появляються у блоці «5» внаслідок кліку на блоці\
«х» одразу після наявного в блоці «5» контенту;\
\nб) кількість зображень необмежена, використовуйте зображення з інтернету;\
\nв) поруч розміщується кнопка, внаслідок натискання на яку внесені дані\
зображення зберігаються в локальному сховищі броузера (структуровано на\
ваш розсуд), а саме зображення додається в кінці початкового вмісту блока «4»;\
\nг) під кожним новим зображенням розміщується кнопка, внаслідок натискання\
на яку нове зображення видаляється із локального сховища броузера і\
припиняється його відображення у блоці «4» без перезавантаження документа.');
    fifthEx();
});

function fifthEx() {
    let h2 = document.querySelector('h2'),
        div = document.createElement('div'),
        btnAdd = document.createElement('button'),
        btnSave = document.createElement('button'),
        limit = document.createElement('p');


    h2.addEventListener('click', () => {
        document.querySelector('.grid-item4 p').remove();
        clearContent();
        item4.style.display = 'flex';
        item4.style.flexWrap = 'wrap';
        content.appendChild(div);
        div.style.display = 'flex';
        div.style.justifyContent = 'center';
        div.style.alignItems = 'center';
        div.style.height = '40%';
        div.appendChild(btnAdd);
        btnAdd.textContent = 'Додати';
        div.appendChild(limit);
        limit.textContent = `Ще можна додати ${9 - item4.children.length} зображень`;
        div.appendChild(btnSave);
        btnSave.textContent = 'Зберегти';

        const srcs = localStorage.getItem('srcs').split(',');
   
        for (let i = 0; i < +localStorage.getItem('imgs'); i++) {
            displayImg(srcs[i]);
            displayDeleteBtns();
        }
        checkImgLimit();
    });
    
    btnAdd.addEventListener('click', () => {
        displayImg(`img/${random()}.jpg`);
        checkImgLimit();
        displayDeleteBtns();
    });

    btnSave.addEventListener('click', () => {
        if (!item4.children.length) alert('Немає картинок, які можна зберегти');
        addToLocalStorage(item4.children.length);
    });

    function displayImg(link) {
        let imgContainer = document.createElement('div'),
            imgBtn = document.createElement('button'),
            img = document.createElement('img');

        item4.appendChild(imgContainer);
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
        limit.textContent = `Ще можна додати ${9 - item4.children.length} зображень`;
    }

    function displayDeleteBtns() {
        let btns = Array.from(document.querySelectorAll('.grid-item4 button')),
            containers = Array.from(document.querySelectorAll('.grid-item4 div'));

        for (let i = 0; i < btns.length; i++) {
            btns[i].addEventListener('click', () => {
                containers[i].remove();
                if (localStorage.srcs != null) addToLocalStorage(item4.children.length);
                
                div.firstChild.style.display = 'block';
                limit.textContent = `Ще можна додати ${9 - item4.children.length} зображень`;
            });
        }
    }

    function checkImgLimit() {
        if (item4.children.length == 9) {
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
