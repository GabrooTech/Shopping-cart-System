window.addEventListener('load', () => {
    var addtocart = document.querySelectorAll('#add-cart')
    var products = [
        {
            name: 'Rainy flower',
            tag: 'bottle2',
            price: 8,
            inCart: 0,
        },
        {
            name: 'Midnight black',
            tag: 'bottle1',
            price: 5,
            inCart: 0,
        },
        {
            name: 'Bunch of blues',
            tag: 'bottle4',
            price: 10,
            inCart: 0,
        },
        { 
            name: 'Astral',
            tag: 'bottle3',
            price: 12,
            inCart: 0,
        }
    ]
    Array.from({length: addtocart.length}, (v, k) => k).forEach((i) => {
        let element = addtocart.item(i);
        element.addEventListener('click', () =>{
           cartNumbers(products[i])
           totalCost(products[i])
       })
    });
    function onLoadCartNumbers() {
        var productNumbers = localStorage.getItem('cartNumbers')
        if(productNumbers){
            document.querySelector('.amount').textContent = productNumbers;
        }
    }
    function cartNumbers(product) {
        var productNumbers = localStorage.getItem('cartNumbers')
        productNumbers = parseInt(productNumbers)
        if(productNumbers) {
            localStorage.setItem('cartNumbers', productNumbers + 1)
            document.querySelector('.amount').textContent = productNumbers + 1
        }else{
            localStorage.setItem('cartNumbers', 1)
            document.querySelector('.amount').textContent = 1
        }
        setItems(product)
    }
    function setItems(product) {
        let cartItems = localStorage.getItem('productsInCart');
        cartItems = JSON.parse(cartItems);
        if(cartItems != null) {
            if(cartItems[product.tag] == undefined) {
                cartItems = {
                     ...cartItems,
                     [product.tag]: product
                }
            }
            cartItems [product.tag].inCart += 1;
         } else {
            product.inCart = 1;
            cartItems = {
                [product.tag]: product
            }
        }
        localStorage.setItem("productsInCart", JSON.stringify(cartItems))
    }
    function totalCost(product){
        var cartCost = localStorage.getItem("totalCost")
        
        if(cartCost != null){
            cartCost = parseInt(cartCost)
            localStorage.setItem("totalCost", cartCost + product.price)
        }else{
            localStorage.setItem("totalCost", product.price)
        }
        
    }

    function displayCart() {
        let cartItems = localStorage.getItem("productsInCart")
        cartItems = JSON.parse(cartItems)
        let productContainer = document.querySelector(".products-container tbody")
        var cartCost = localStorage.getItem("totalCost")
        if(cartItems && productContainer){
            productContainer.innerHTML = ''
            Object.values(cartItems).map(item => {
                productContainer.innerHTML += `
                <tr>
                    <td>
                        <div class="product">
                            <i class="fa-solid fa-circle-x"></i>
                            <img src="./img/${item.tag}.png" class="product-img">
                            <span class="product-name">${item.name}</span>
                        </div>
                    </td>
                    <td>
                        <div class="price">$${item.price}.00</div>
                    </td>
                    <td>
                        <div class="quantity">
                            <i class="fa-solid fa-circle-arrow-left"></i>
                            <span>${item.inCart}</span>
                            <i class="fa-solid fa-circle-arrow-right"></i>
                        </div>
                    </td>
                    <td>
                        <div class="total">
                            $${item.inCart * item.price}.00
                        </div>
                    </td>

                </tr>
                `    
            })
            productContainer.innerHTML += `
            <div class="basketTotalContainer">
            <h4 class="basketTotalTitle">
                Basket Total
            </h4>
            <h4 class="basketTotal">
                $${cartCost}.00
            </h4>
            </div>
            `
        }
    }
    onLoadCartNumbers()
    displayCart()
})