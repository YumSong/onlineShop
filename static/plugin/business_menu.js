jQuery(document).ready(function ($) {
    $.get(shop_url, function (data, status) {
        if (status == "success") {
            write2Menu(data,"#menu_main");
        }
        // console.log("Data: " + data + "\nStatus: " + status);
    });

    function write2Menu(data,menu_id) {
        let menu_main = $(menu_id);
        let html = "";

        $.each(data, (idx, shop) => {
            html += `<div class="row">
				<div class="col-md-8 col-md-offset-2 text-center gtco-heading">
				<P></P>
					<h2 class="cursive-font primary-color">${shop.shopName}</h2>
				</div>
			</div>`;
            $.each(shop.recipes,(idx,obj)=>{
                let recipesId = shop.id+"_"+obj.id;
                html += "<div class=\"col-lg-4 col-md-4 col-sm-6 pro text-center\">";
                html += "<div class=\"selectProduct\">";
                html += `<a data-price="${obj.price}" data-proid="${recipesId}" data-shopname="${shop.shopName}" data-proname="${obj.recipe}" data-proimg="${obj.img_url} " class="fh5co-card-item image-popup">
                        <figure>
                            <div class="overlay"><i class="ti-plus"></i></div>
                            <img src="${obj.img_url}" alt="Image" class="img-responsive">
                        </figure>
                    </a>`;
                html += "<h2>"+obj.recipe+"</h2>";
                html += `<p><span class="price cursive-font">$${obj.price}</span></p>`;
                html += "</div>";
                html += "</div>";
                menu_main.append(html);
                html = "";
            });

        })
    }

    let cartWrapper = $('.cd-cart-container');
    let cartBody = cartWrapper.find('.body');
    let cartTotal = cartWrapper.find('.checkout').find('span');
    let cartTrigger = cartWrapper.children('.cd-cart-trigger');
    let productId = 0;

    let cartCount = cartTrigger.children('.count');
    let cartList = cartBody.find('ul').eq(0);



    let userStr = window.localStorage.getItem("user");

    if(userStr!=null){
        let cartStr = window.localStorage.getItem("cart");
        if (cartStr != null) {
            let count = 0;
            console.log(cartStr);
            let cart = JSON.parse(cartStr);
            for(key in cart){
                console.log("load");
                let obj = JSON.parse(cart[key]);
                count+=parseInt(obj.quantity);
                // let obj = cart[key];
                load2CartByLocalStroage(obj.proname, obj.proid, obj.price, obj.proimg, obj.shopname,count);
                $("#cd-product-" + obj.proid).html(obj.quantity);
            }
        }
    }else {
        window.localStorage.removeItem("cart");
    }


    function load2CartByLocalStroage(proname, proid, price, proimg, shopname,count) {
        let cartIsEmpty = cartWrapper.hasClass('empty');
        loadProduct(proname, proid, price, proimg, shopname);
        //update number of items
        // loadCartCount(cartIsEmpty);
        cartCount.find('li').eq(0).text(count);
        //update total price
        loadCartTotal(price, true);
        //show cart
        cartWrapper.removeClass('empty');
    }

    function loadProduct(proname, proid, price, proimg, shopname) {

        productId = productId + 1;  //总数量
        let quantity = $("#cd-product-" + proid).text();    //该物品的数量
        if (quantity == '') {
            let select = '<span class="select">x<i id="cd-product-' + proid + '">1</i></span>';
            let productAdded = $('<li class="product">' +
                '<div class="product-image"><a href="#0"><img src="' + proimg + '" alt="placeholder"></a></div>' +
                '<div class="product-details">' +
                '<h3><a href="#0"> 菜名&nbsp;&nbsp;:&nbsp;&nbsp;' + proname + '</a></h3>' +
                '<h3><a href="#0"> 店名&nbsp;&nbsp;:&nbsp;&nbsp;' + shopname + '</a></h3>' +
                '<span class="price">￥' + price + '</span>' +
                '<div class="actions">' +
                '<a href="#0" class="delete-item">删除</a>' +
                '<div class="quantity">' +
                '<label for="cd-product-' + proid + '">件数</label>' + select + '</div>' +
                '</div></div></li>');
            cartList.prepend(productAdded);
        }
    }

    function loadCartCount(emptyCart, quantity) {
        if (typeof quantity === 'undefined') {
            let actual = Number(cartCount.find('li').eq(0).text()) + 1;
            let next = actual + 1;

            if (emptyCart) {
                cartCount.find('li').eq(0).text(actual);
                cartCount.find('li').eq(1).text(next);
            } else {
                cartCount.addClass('update-count');

                setTimeout(function () {
                    cartCount.find('li').eq(0).text(actual);
                }, 150);

                setTimeout(function () {
                    cartCount.removeClass('update-count');
                }, 200);

                setTimeout(function () {
                    cartCount.find('li').eq(1).text(next);
                }, 230);
            }
        }
    }

    function loadCartTotal(price, bool) {
        bool ? cartTotal.text((Number(cartTotal.text()) + Number(price)).toFixed(2)) : cartTotal.text((Number(cartTotal.text()) - Number(price)).toFixed(2));
    }

});