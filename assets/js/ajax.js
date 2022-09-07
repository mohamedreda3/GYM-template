function getElementToBodyBeforeEnd(filePath) {
    let elements = new XMLHttpRequest();
    elements.open('GET', filePath, true);

    elements.onload = function () {
        if (elements.readyState == 4, elements.status == 200) {
            let element = elements.responseText;
            document.querySelector('body').insertAdjacentHTML('beforeend', element);
        } else {
            alert('error');
        }
    }

    elements.send();
}

function getElementToBodyAfterBegin(filePath) {
    let elements = new XMLHttpRequest();
    elements.open('GET', filePath, true);

    elements.onload = function () {
        if (elements.readyState == 4, elements.status == 200) {
            let element = elements.responseText;
            document.querySelector('body').insertAdjacentHTML('afterbegin', element);
        } else {
            alert('error');
        }
    }

    elements.send();
}