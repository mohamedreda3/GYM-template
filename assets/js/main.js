function scrollToTop() {
    window.scrollTo({ top: 0 });
}

scrollToTop();

let toggleMenu = document.querySelector('.menu');
toggleMenu.onclick = () => {
    toggleMenu.classList.toggle('active');
    document.querySelector('ul.toggle').classList.toggle('active');
}

let headerVideosBg = document.querySelectorAll('header .backgroundVideos em'),
    videoBg = document.getElementById('background');

headerVideosBg.forEach(item => {
    item.addEventListener('click', function (e) {
        headerVideosBg.forEach(item => item.classList.remove('active'));
        setTimeout(() => {
            item.classList.add('active');
            if (videoBg.src != item.querySelector('video').src) {
                videoBg.src = item.querySelector('video').src;
            }
        }, 10)
    });
});

window.onscroll = function () {
    let nav = document.querySelector('nav .title');
    if (window.scrollY > 5) {
        nav.classList.add('active');
    } else {
        nav.classList.remove('active');
    }
}

if (document.querySelector("section#about .images.slider .intern_slider_container") != null) {
    const slider = document.querySelector("section#about .images.slider .intern_slider_container");
    const sliderImages = document.querySelectorAll("section#about .images.slider .intern_slider_container img");
    const nextSlider = document.querySelector("section#about .btns .next");
    const previousSlider = document.querySelector("section#about .btns .prev");
    let start = 0;
    let end = sliderImages.length;

    nextSlider.onclick = function () {
        if (start < end - 1) {
            ++start;
            slider.style.transform = `translateX(-${start * 100}%)`;
        } else {
            start = 0;
            slider.style.transform = `translateX(-${start * 100}%)`;
        }
        // alert(start);
    }

    previousSlider.onclick = function () {
        if (start > 0) {
            --start;
            slider.style.transform = `translateX(-${start * 100}%)`;
        } else {
            start = end - 1;
            slider.style.transform = `translateX(-${start * 100}%)`;
        }
        // alert(start);
    }

}

let aLinks = document.querySelectorAll('a');

if (aLinks != null) {
    aLinks.forEach((item, index) => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({ 'top': 0 });
            document.body.classList.add('active');
            setTimeout(() => {
                // alert(e.target.href);
                // alert(aLinks[index].href);
                window.location = aLinks[index].href;
                document.body.classList.remove('active');
            }, 700);
        });
    });
}

if (document.querySelector('.products') != null) {
    let wrapper = document.querySelector('.swiper-wrapper');
    fetch('../data.json').then(res => res.json()).then(data => {
        data.forEach(async (item, index) => {
            if (index <= 9) {
                let productSlide = document.createElement('div');
                productSlide.classList.add('swiper-slide');
                let productPage = `product.html?u=${item.id}`;
                let product = `
          <div class='product_image'> <img src='${item.img}'> </div>
          <div class='product_info'>
           <a class='productname' href=${productPage}><h1>${item.title}</h1></a>
           <p>${item.description}</p>
           <h4>Price:$<em id='price'>${item.price}</em></h4>
           <button id='${item.id}' onclick='onclick='addToCart(this.id)''>Add to cart</button>
            </div>`;
                productSlide.innerHTML = product;
                wrapper.appendChild(productSlide);
            }
        });
    });
};



let getLocalStorage = JSON.parse(localStorage.getItem('product')) != null ? JSON.parse(localStorage.getItem('product')) : null;

function addToCart(id) {
    let items = {
        "id": parseInt(id),
        "numberOfProduct": 1
    };
    getLocalStorage = JSON.parse(localStorage.getItem('product')) != null ? JSON.parse(localStorage.getItem('product')) : null;
    let products = [];
    if (getLocalStorage != null) {
        let found = false,
            indexFound = 0;
        getLocalStorage.forEach((item, index) => {
            if (item.id == id) {
                found = true;
                indexFound = index;
            }
        });
        if (found) {
            ++(getLocalStorage[indexFound].numberOfProduct);
            localStorage.setItem('product', JSON.stringify(getLocalStorage));
        } else {
            products = [...(getLocalStorage), items];
            localStorage.setItem('product', JSON.stringify(products));
        }
    } else {
        products.push(items);
        localStorage.setItem('product', JSON.stringify(products))
    }
    console.table(JSON.stringify(products));
}



document.querySelector('.title h1').onclick = () => window.location.href = 'index.html';