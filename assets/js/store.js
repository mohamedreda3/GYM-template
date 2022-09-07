
let wrapper = document.querySelector('.products_col');
fetch('../data.json').then(res => res.json()).then(data => {
    data.forEach(async (item, index) => {
        let productSlide = document.createElement('div');
        productSlide.classList.add('product_con');
        let productPage = `product.html?u=${item.id}`;
        let product = `
          <div class='product_image'> <img src='${item.img}'> </div>
          <div class='product_info'>
           <a class='productname' href=${productPage}><h1>${item.title}</h1></a>
           <p>${item.description}</p>
           <p>Category: ${item.Category}</p>
           <h4>Price:$<em id='price'>${item.price}</em></h4>
           <button id='${item.id}' onclick='addToCart(this.id)'>Add to cart</button>
            </div>`;
        productSlide.innerHTML = product;
        wrapper.appendChild(productSlide);
    });
});


if (document.querySelector('.categories') != null) {
    let wrapper = document.querySelector('.categories_titles');
    let categories_arr = [];
    fetch('../data.json').then(res => res.json()).then(data => {
        data.forEach(async (item, index) => {
            categories_arr.push(item.Category);
        });
        categories_arr = categories_arr.filter((item, index) => categories_arr.indexOf(item) == index);
        categories_arr.forEach((item) => {
            let productSlide = document.createElement('button');
            productSlide.id = item;
            productSlide.onclick = (e) => filterByCategory(e.currentTarget.id);
            productSlide.innerHTML = `<span><i class='fa-solid fa-folder'></i>${item}</span><i class='fa-solid fa-angle-right'></i>`;
            wrapper.appendChild(productSlide);
        });
    });
};

let filter = document.querySelectorAll('.filter');
document.querySelector('.min_price').textContent = '$' + document.querySelector('#min_price').value;
document.querySelector('.max_price').textContent = '$' + document.querySelector('#max_price').value;
for (let index = 0; index < filter.length; index++) {
    filter[index].addEventListener('change', function (e) {
        document.querySelector('.min_price').textContent = '$' + document.querySelector('#min_price').value;
        document.querySelector('.max_price').textContent = '$' + document.querySelector('#max_price').value;
    })
}

function filterByCategory(id) {
    wrapper.innerHTML = '';
    // console.log(id);
    scrollToTop();
    fetch('../data.json').then(res => res.json()).then(data => {
        data.forEach(async (item, index) => {
            // console.log(item.Category)
            if (item.Category == id) {
                let productSlide = document.createElement('div');
                let productPage = `product.html?u=${item.id}`;
                productSlide.classList.add('product_con');
                let product = `
          <div class='product_image'> <img src='${item.img}'> </div>
          <div class='product_info'>
           <a class='productname' href=${productPage}><h1>${item.title}</h1></a>
           <p>${item.description}</p>
           <p>Category: ${item.Category}</p>
           <h4>Price:$<em id='price'>${item.price}</em></h4>
           <button id='${item.id}' onclick='onclick='addToCart(this.id)''>Add to cart</button>
            </div>`;
                productSlide.innerHTML = product;
                wrapper.appendChild(productSlide);
            }
        });
    });
};

function filterByPrice() {
    scrollToTop();
    wrapper.innerHTML = '';
    let minPrice = document.querySelector('#min_price').value;
    let maxPrice = document.querySelector('#max_price').value;
    // console.log(minPrice);
    // console.log(maxPrice);
    fetch('../data.json').then(res => res.json()).then(data => {
        data.forEach(async (item, index) => {
            if (item.price > minPrice && item.price < maxPrice) {
                let productSlide = document.createElement('div'); 
                let productPage = `product.html?u=${item.id}`;
                productSlide.classList.add('product_con');
                let product = `
          <div class='product_image'> <img src='${item.img}'> </div>
          <div class='product_info'>
           <a class='productname' href=${productPage}><h1>${item.title}</h1></a>
           <p>${item.description}</p>
           <p>Category: ${item.Category}</p>
           <h4>Price:$<em id='price'>${item.price}</em></h4>
           <button id='${item.id}' onclick='onclick='addToCart(this.id)''>Add to cart</button>
            </div>`;
                productSlide.innerHTML = product;
                wrapper.appendChild(productSlide);
            }
        });
    });
};


