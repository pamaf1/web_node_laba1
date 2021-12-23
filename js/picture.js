document.addEventListener('DOMContentLoaded', () => {
    let picture = Array.from(document.querySelectorAll('.pic'));

    displayPictures(pictures, picture);
    addSettings(picture);
    addBacklight();

    
});

function displayPictures(links, pictures) {
    for (let i = 0; i < links.length; i++) {
        pictures[i].appendChild(document.createElement('img'));
        pictures[i].children[0].src = links[i];
        pictures[i].children[0].setAttribute('data-isChoose', 'false');
    }
}


function addSettings(pictures) {
    const request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:3000/settings');
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    request.send();
    request.addEventListener('load', function() {
        if (request.status == 200) {
            let data = JSON.parse(request.response),
                srcs = data[data.length - 1].srcs,
                cols = data[data.length - 1].columns;

            let defaultCheckbox = document.querySelector('#two'),
                checkbox = document.querySelector('#three'),
                countOfColumns = cols;
            
            if (countOfColumns == '3') {
                defaultCheckbox.checked = false;
                checkbox.checked = true;
            }
            
            for (let i = 0; i < pictures.length; i++) {
                if (srcs.includes(pictures[i].children[0].src)) {
                    pictures[i].children[0].setAttribute('data-isChoose', 'true');
                }
            }
        } else {
            console.error('error');
        }
    });
}

function addBacklight() {
    let imgs = Array.from(document.querySelectorAll('img'))
        selectedPic = [];
        
    imgs.forEach(img => {
        img.addEventListener('load', () => {
            if (img.getAttribute('data-isChoose') == 'true') {
                img.style.border = '4px solid rgb(1, 128, 71)'; 
                selectedPic.push(img.src);
                
            }
        });

        img.addEventListener('click', () => {
            if (img.getAttribute('data-isChoose') == 'false') {
                img.setAttribute('data-isChoose', 'true');
                img.style.border = '4px solid rgb(1, 128, 71)';  
                selectedPic.push(img.src);
            } else {
                img.setAttribute('data-isChoose', 'false');
                img.style.border = 'none'; 
                let index = selectedPic.indexOf(img.src);
                if (index !== -1) {
                    selectedPic.splice(index, 1);
                }
            }
        });
    });

    let defaultCheckbox = document.querySelector('#two'),
        checkbox = document.querySelector('#three'),
        countOfColumns = '2';
    
    checkbox.addEventListener('change', () => {
        defaultCheckbox.checked  = false;
        countOfColumns = '3';
    }); 
    defaultCheckbox.addEventListener('change', () => {
        checkbox.checked  = false;
        countOfColumns = '2';
    }); 

    document.querySelector('button').addEventListener('click', () => sendWithXML(selectedPic, imgs, countOfColumns));
}

function sendWithXML(choosenSrcs, images, cols) {

    images.forEach(img => {
        img.addEventListener('load', () => {
            if (img.getAttribute('data-isChoose') == 'true') {
                img.style.border = '4px solid rgb(1, 128, 71)';
                console.log('1')
            }
        });
    });

    let body = {
        srcs: choosenSrcs,
        columns: cols
    };

    let json = JSON.stringify(body);

    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:3000/settings");
    request.setRequestHeader("Content-type", "application/json; charset=utf-8");
    request.send(json);
    request.addEventListener('load', function() {
        if (request.status == 200) {
            let data = JSON.parse(request.response);
            console.log(data);
        } else {
            console.error('error');
        }
    });
}







const pictures = [
    'img/1.jpg',
    'img/3.jpg',
    'img/6.jpg',
    'img/5.jpg',
    'img/7.jpg',
    'img/car.jpg',
    'img/8.jpg',
    'img/9.jpg',
    'img/4.jpg',
    'img/2.jpg',
];