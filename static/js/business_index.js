jQuery(document).ready(function ($) {
    window.localStorage.removeItem("user");

    // let userJson = {
    //     name:"tony",
    //     password:"123456"
    //     };
    //
    // let  userStr = JSON.stringify(userJson);//将JSON对象转化成字符串
    //
    // window.localStorage.setItem("user",userStr);
    //

    $.get("http://localhost:3000/pobular_shops", function (data, status) {
        if (status == "success") {
            console.log(data);
            write2Shop(data, "#shop_main");
        }
    });

    function write2Shop(data, shop_id) {
        let shop_main = $(shop_id);
        $.each(data, (idx, obj) => {
            let html = "";
            html += `<div class="col-lg-4 col-md-4 col-sm-6">
                    <a href="menu.html?shopId=${obj.id}" class="fh5co-card-item image-popup">
                        <figure>
                            <div class="overlay">
                            <i class="ti-arrow-circle-right"></i>
                            </div>
                            <img src="${obj.img_url}" alt="Image" class="img-responsive">
                        </figure>
                    </a>
                    <div class="fh5co-text">
                        <h2>${obj.shopName}</h2>
                        <p>${obj.introduce}</p>
                    </div>
                </div>`;
            shop_main.append(html);
        });
    }
    
    let user_login_btn = $('#user_login_btn');
    user_login_btn.on('click', function(event) {
        let username = $('input[name="login_username"]').val();
        let password = $('input[name="login_password"]').val();
        $.post(" http://localhost:3000/comments",
            {
                username:username,
                password:password
            },function(result){
            console.log(result);
                $('#loginModal').modal('hide')
            });
    });

    let register_form_btn = $('#register_form_btn');
    register_form_btn.on('click', function(event) {
        $('#loginModal').modal('hide');
        $('#registerModal').modal();
    });



    let register_save_btn = $('#register_save_btn');
    register_save_btn.on('click',function () {
        let username = $('input[name="registerName"]').val();
        let password = $('input[name="registerPassword"]').val();
        console.log(username);
        console.log(password);
        // $.post(" http://localhost:3000/comments",
        //     {
        //         username:username,
        //         password:password
        //     },function(result){
        //         console.log(result);
        //         $('#myModal').modal('hide')
        //     });
    });

});