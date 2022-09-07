
let url = new URL(window.location);
let param = new URLSearchParams(url.search);
let params = param.get('u');

if (params == null) {
    alert('The product was not found');
    window.location = 'store.html';
} else {
    let wrapper = document.querySelector('.products_col');
    fetch('../data.json').then(res => res.json()).then(data => {
        data.forEach(async (item, index) => {
            if (item.id == params) {
                let productSlide = document.createElement('div');
                productSlide.classList.add('product_con');
                let product = `
                <div class='product_image'> <img src='${item.img}'> </div>
                <div class='product_info'>
                <h1>${item.title}</h1>
                <h3 > About Product </h3>
                 <p class='product_desc'>${item.description}</p>
                 <p>Category: ${item.Category}</p>
                 <h4>Price:$<em id='price'>${item.price}</em></h4>
                 <button id='${item.id}' onclick='addToCart(this.id)'>Add to cart</button>
                  </div>`;
                productSlide.innerHTML = product;
                wrapper.appendChild(productSlide);
            }
        });
    });
}


let wrapper1 = document.querySelector('.products_col1');
fetch('../data.json').then(res => res.json()).then(data => {
    let productCategory = '';
    data.forEach(async (item, index) => {
        if (item.id == params) {
            productCategory = item.Category;
        }
    })
    data.forEach(async (item, index) => {
        if ((item.id != params) && (item.Category == productCategory)) {
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
            wrapper1.appendChild(productSlide);
        }
    });
});