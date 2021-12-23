let exerciseButton = document.querySelector('.start_ex');


exerciseButton.addEventListener('click', () => {
    let isConfirm = confirm('Почати виконання?');

    if (isConfirm) {
        window.open(
            'picture.html',
            '_blank'
          );
    }
});


const block4 = document.querySelector('.grid-element4');

function displayPicture() {
    const request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:3000/settings');
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    request.send();
    request.addEventListener('load', function() {
        if (request.status == 200) {
            let data = JSON.parse(request.response),
                srcs = data[data.length - 1].srcs,
                cols = data[data.length - 1].columns;
            
            block4.style.columnCount = cols;

            for (let i = 0; i < srcs.length; i++) {
                let figure = document.createElement('figure'),
                    img = document.createElement('img');

                block4.appendChild(figure);
                figure.appendChild(img);
                img.src = srcs[i];
            }
        } else {
            console.error('error');
        }
    });
}

displayPicture();

