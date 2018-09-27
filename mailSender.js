$(document).ready(function() {
    $('#mailSender').click(function(){
        var mail = $('#email').val();
        var phone = $('#phone').val();
        
        canReq = false;
        if(validateEmail(mail)){
            canReq = true;
        }else{
            $('#messageModalRdv').attr('class', 'alert alert-danger')
            $('#messageModalRdv').text("Veuillez saisir une adresse mail valide");
        }

        if(validatePhone(phone)){
           canReq = true;
           console.log('valide phone');
        }else{
            $('#messageModalRdv').attr('class', 'alert alert-danger')
            $('#messageModalRdv').text("Veuillez saisir un numéro de téléphone valide");
            canReq = false;
        }

        if(canReq){
            $('#messageModalRdv').removeClass('alert alert-danger');
            $('#messageModalRdv').text("");

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
                },
                success: function(data, status){
                    console.log('SUCCESS | data : ', data, ' | statut : ', status);
                },
                error: function(data, status, error){
                    console.log('ERROR | data :', data, ' | status : ', status, ' | error : ', error);
                }
            })
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

});

