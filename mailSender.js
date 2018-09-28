$(document).ready(function() {
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
                    var snackbar = document.getElementById("snackbar");
                    snackbar.className = "show";
                    setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 3000);
                },
                error: function(data, status, error){
                    console.log('ERROR | data :', data, ' | status : ', status, ' | error : ', error);
                }
            })
        }else{
            console.log('bizarre');
        }
     });

    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function validatePhone(phone){
        var re = /^\d{10}$/;
        return re.test(phone);
    }

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

    function displayErrorRdv(message){
        $('#messageModalRdv').attr('class', 'alert alert-danger')
        $('#messageModalRdv').text(message);
    }

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

});

