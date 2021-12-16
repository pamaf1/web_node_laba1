document.addEventListener('DOMContentLoaded', () => {
    let pics = Array.from(document.querySelectorAll('.pic'));

    showPics(pictures, pics);
    setAttribute(pics);
    setExcretion();

    
});

function showPics(links, pictures) {
    for (let i = 0; i < links.length; i++) {
        pictures[i].appendChild(document.createElement('img'));
        pictures[i].children[0].src = links[i];
        pictures[i].children[0].setAttribute('isChoose', 'false');
    }
}


function setAttribute(pictures) {
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
                    pictures[i].children[0].setAttribute('isChoose', 'true');
                }
            }
        } else {
            console.error('error');
        }
    });
}

function setExcretion() {
    let imgs = Array.from(document.querySelectorAll('img'))
        selectedPic = [];
        
    imgs.forEach(img => {
        img.addEventListener('load', () => {
            if (img.getAttribute('isChoose') == 'true') {
                img.style.border = '4px solid blue'; 
                selectedPic.push(img.src);
            }
        });

        img.addEventListener('click', () => {
            if (img.getAttribute('isChoose') == 'false') {
                img.setAttribute('isChoose', 'true');
                img.style.border = '4px solid blue';  
                selectedPic.push(img.src);
            } else {
                img.setAttribute('isChoose', 'false');
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
            if (img.getAttribute('isChoose') == 'true') {
                img.style.border = '4px solid blue';
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
    'img/_117310488_16.jpg',
    'img/_119449972_10.jpg',
    'img/animal-children-photography-elena-shumilova-2.jpg',
    'img/Best-of-2016-Nasim-Mansurov-20.jpg',
    'img/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg',
    'img/india-in-pictures-beautiful-places-to-photograph-taj-mahal.jpg',
    'img/istockphoto-1145618475-612x612.jpg',
    'img/tree-736885__480.jpg',
    'img/4.jpg',
    'img/2.jpg',
];