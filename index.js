$(document).ready(function() {
    $.ajax({
        url: './infos.php',
        type: 'POST',
        dataType: 'json',
        success: function(data, status){
            console.log('SUCCESS | data : ', data, ' | statut : ', status);
            setData(data);
        },
        error: function(data, status, error){
            console.log('ERROR | data :', data, ' | status : ', status, ' | error : ', error);
        }
    });


    $('#mailSender').click(function(){
        console.log("terst-");
        var mail = $('#email').val();
        var phone = $('#phone').val();
        
        var canReq;
        if(validateEmail(mail)){
            canReq = true;
        }else{
            displayErrorRdv("Veuillez saisir une adresse mail");
            canReq = false;
        }
        
        if(validatePhone(phone)){
            phone = formatePhone(phone);
        }else{
            if(canReq){
                displayErrorRdv("Veuillez saisir un numéro de téléphone valide");
                canReq = false;
            }
        }

        if($('#firstname').val() == '' || $('#lastname').val() == ''){
            displayErrorRdv("Veuillez saisir votre nom et prénom");
            canReq = false;
        }

        if(canReq){
            $('#messageModalRdv').removeClass('alert alert-danger');
            $('#messageModalRdv').text("");

            console.log($('#extraInfo').val());

            $.ajax({
                url: './mailSender.php',
                type: 'POST',
                dataType: 'json',
                data: {
                    'email': mail,
                    'phone': phone,
                    'gender': $('#gender').val(),
                    'lastname': $('#lastname').val(),
                    'firstname': $('#firstname').val(),
                    'goal': $('#goal').val(),
                    'extraInfo': $('#extraInfo').val(),
                },
                success: function(data, status){
                    console.log('SUCCESS | data : ', data, ' | statut : ', status);
                    $('#exampleModal').modal('toggle');
                    showSnackbar('Demande envoyée', true);
                },
                error: function(data, status, error){
                    console.log('ERROR | data :', data, ' | status : ', status, ' | error : ', error);                    
                    $('#exampleModal').modal('toggle');
                    showSnackbar('Echec de l\'envoie', false);
                }
            })
        }else{
            console.log('bizarre');
        }
     });

     /**
      * show snackbar
      */
     function showSnackbar(message, success){
        var snackbar = $('#snackbar');
        snackbar.addClass('show');
        snackbar.append(message)
        if(success){
            snackbar.addClass('success');
        }
        if(!success){
            snackbar.addClass('error')
        }
        setTimeout(function(){ 
            snackbar.removeClass('success');
            snackbar.removeClass('error');
            snackbar.removeClass('show'); 
        }, 3000);
     }

     /**
      * return true if the given email is a email
      * @param  email 
      */
    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    /**
     * return true if the given string is a phone number
     * @param  phone phone number
     */
    function validatePhone(phone){
        var re = /^\d{10}$/;
        return re.test(phone);
    }

    /**
     * formate phone number into xx.xx.xx.xx.xx
     * @param  phone 
     */
    function formatePhone(phone){
        var phoneFormated = [];
        phoneFormated.push(phone.slice(0,2));
        phoneFormated.push(phone.slice(2,4));
        phoneFormated.push(phone.slice(4,6));
        phoneFormated.push(phone.slice(6,8));
        phoneFormated.push(phone.slice(8,10));
        phone = '';
        for(var i = 0; i < phoneFormated.length ; i++){
            if(i > 0){
                phone = phone+'.'+phoneFormated[i];
            }else{
                phone = phoneFormated[i];
            }
        }

        return phone;
    }

    /**
     * display message error for form
     * @param  message message to display
     */
    function displayErrorRdv(message){
        $('#messageModalRdv').attr('class', 'alert alert-danger')
        $('#messageModalRdv').text(message);
    }

    /**
     * Display * for form depending if condition is validate or not
     */
    $('#email').keyup(function(){
        if(validateEmail($('#email').val())){
            $('#mustFieldEmail').hide();
        }else{
            $('#mustFieldEmail').show();
        }
    });

    $('#phone').keyup(function(){
        if(validatePhone($('#phone').val())){
            $('#mustFieldPhone').hide();
        }else{
            $('#mustFieldPhone').show();
        }
    })

    $('#firstname').keyup(function(){
        if($('#firstname').val() != ''){
            $('#mustFieldFirstname').hide();
        }else{
            $('#mustFieldFirstname').show();
        }
    });

    $('#lastname').keyup(function(){
        if($('#lastname').val() != ''){
            $('#mustFieldLastname').hide();
        }else{
            $('#mustFieldLastname').show();
        }
    });

    /**
     * map data with dom
     * @param data settings
     */
    function setData(data){
        var href = 'tel:'+data.result.adminTel;
        $('.contact_button').attr('href', href);
    }

    /**
     * smooth scroll to target
     * @param  target  element to scroll to
     */
    function smoothScrollTo(target){
        if(target.length){
            $('html, body').stop().animate( {scrollTop: target.offset().top}, 1500 );
        }
    }

    /**
     * active smooth scroll for anchors in nav
     */
    $('.nav-link').click(function(){
        var elementToScrolll = $($(this).attr('href'));
        smoothScrollTo(elementToScrolll);
    });

    /**
     * detect scroll and set animations for block_prestations
     * reset animations when scroll to top
     */
    $(window).scroll(function(e){
        if(1.05 > $(window).scrollTop() / $('#prestations').offset().top > 0.95){
            $('.block_prestation').addClass('animated flipInY');
        }

        if($(window).scrollTop() == 0){
            $('.block_prestation').removeClass('animated flipInY');
        }
    });

    /**
     * Animation for button "rendez-vous"
     */
    setInterval(function(){
        $('.rdv_button_animation').removeClass('animated bounce');
    }, 3000)

    setInterval(function(){
        $('.rdv_button_animation').addClass('animated bounce');
    }, 3500)

});

