jQuery(document).ready(function ($) {
    $.get("http://localhost:3000/shops", function (data, status) {
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
                console.log(shop.shopName);
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

});