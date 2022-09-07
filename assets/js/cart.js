function getProducts() {
    let totalPrice = 0;
    let wrapper = document.querySelector('.products_col');
    wrapper.innerHTML = '';
    if (getLocalStorage != null) {
        fetch('../data.json').then(res => res.json()).then(data => {
            getLocalStorage.map((item, index) => {
                for (let i = 0; i < data.length; i++) {
                    if (item.id == data[i].id) {
                        let productSlide = document.createElement('div');
                        productSlide.classList.add('product_con'); 
                        let productPage = `product.html?u=${item.id}`;

                        productSlide.classList.add('product_con_in_cart');
                        let product = `
                    <img src='${data[i].img}'>
                    <div>
                    
                   <div> <a class='productname' href=${productPage}><h3>${data[i].title}</h3></a><em id='productprice${item.id}'>Price:$${data[i].price}</em></div>
                    <p>${data[i].description}</p>
                    <div>  <p>Category: ${data[i].Category}</p> <button class='removefromcart' id='${item.id}' onclick='removeCart(this.id)'><i class='fa-solid fa-trash-alt'></i>Remove</button> </div>
                    <div>
                    <input type='number' id='${item.id}' value='${item.numberOfProduct}' class='numberofproduct'>
                    <h4><em>Total Price:</em><span>$<em id='price${item.id}'>${data[i].price * item.numberOfProduct}</em></span></h4>                    
                    </div>
                    </div>
                    `;
                        productSlide.innerHTML = product;
                        wrapper.appendChild(productSlide);
                        break;
                    }
                }
            });

        });

    } else {
        let productSlide = document.createElement('div');
        productSlide.classList.add('product_con');
        let product = `Empty Cart`;
        productSlide.innerHTML = product;
        wrapper.appendChild(productSlide);
    }
}
getProducts();

async function getTotalPrice() {
    let total = 0;
    await fetch('../data.json').then(res => res.json()).then(data => {
        getLocalStorage.map((item, index) => {
            for (let i = 0; i < data.length; i++) {
                if (item.id == data[i].id) {
                    total += data[i].price * item.numberOfProduct;
                };
            };
        });
    });
    return total;
};

(async () => {
    let total = await getTotalPrice();
    document.querySelector('.total').innerHTML = `<h4>Total: <em>$${total}</em></h4><h4>SubTotal: <em>$${total + (total / 10)
        }</em ></h4 > `;
})();



async function removeCart(id) {
    localStorage.setItem('product', JSON.stringify(getLocalStorage.filter(item => item.id != id)));
    getLocalStorage = JSON.parse(localStorage.getItem('product')) != null ? JSON.parse(localStorage.getItem('product')) : null;
    getProducts()
    let total = await getTotalPrice();
    let totalPrice = await getTotalPrice();
    document.querySelector('.total').innerHTML = `<h4> Total: <em>$${totalPrice}</em></h4 ></h4 > <h4>SubTotal: <em>$${total + 30}</em></h4>`;
}


setTimeout(() => {
    if (document.querySelectorAll('.numberofproduct') != null) {
        let numberOfProduct = document.querySelectorAll('.numberofproduct');
        console.log(numberOfProduct);
        for (let index = 0; index < numberOfProduct.length; index++) {
            let element = document.getElementById(`${numberOfProduct[index].id}`);
            element.addEventListener('change', function (e) {
                console.log(e.target.id);
                console.log(document.getElementById(`price${e.target.id} `));
            })
        }
    }
}, 1700)

function changeprice(id) {
    console.log(document.getElementById(`price${e.target.id} `));
}