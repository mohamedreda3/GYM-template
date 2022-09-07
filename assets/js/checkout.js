function getItems() {
    let totalPrice = 0;
    let wrapper = document.querySelector('.products_with_price');
    wrapper.innerHTML = '';
    if (getLocalStorage != null) {
        fetch('../data.json').then(res => res.json()).then(data => {
            getLocalStorage.map((item, index) => {
                for (let i = 0; i < data.length; i++) {
                    if (item.id == data[i].id) {
                        let productSlide = document.createElement('div');
                        let productPage = `product.html?u=${item.id}`;
                        productSlide.classList.add('product_con');
                        productSlide.classList.add('product_con_in_cart');
                        let product = `
                        <img src='${data[i].img}'>
                        <div>
                       <div> 
                       <a class='productname' href=${productPage}><h3>${data[i].title}</h3></a>
                       <em id='productprice${item.id}'>Price:$${data[i].price}</em></div>
                        <input type='number' id='${item.id}' value='${item.numberOfProduct}' disabled class='numberofproduct'>
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
getItems();















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


let cardNumber = document.getElementById('card_number');
let i = 0;
cardNumber.onkeydown = function (e) {
    let value = e.target.value;


    if ((e.key != 'Backspace')) {
        if (!(value.length >= 19)) {
            ++i;
        }
    } else {
        if (i == 0) {
            i = 4
        } else {
            --i;
        }
    }


    if ((i == 4) && (value.length < 19) && (e.key != 'Backspace')) {
        value = value + "-";
        i = 0;
    }

    cardNumber.value = value
    if ((value.length == 0) || (i > 4)) {
        i = 0;
    }
}