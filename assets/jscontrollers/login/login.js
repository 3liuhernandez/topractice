/**
 * Ajax action to api rest
*/
function login(){
    var $ocrendForm = $(this), __data = {};
    $('#login_form').serializeArray().map(function(x){__data[x.name] = x.value;}); 
       
    if(undefined == $ocrendForm.data('locked') || false == $ocrendForm.data('locked')) {
        $.ajax({
            type : "POST",
            url : "api/login",
            dataType: 'json',
            data : __data,
            beforeSend: function(){ 
                $ocrendForm.data('locked', true) 
            },
            success : function(json) {
                if(json.success == 1) {
                    alert(json.message);
                    setTimeout(function() {
                        location.reload();
                    }, 1000);
                } else {
                    alert(json.message);
                }
            },
            error : function(xhr, status) {
                alert('Ha ocurrido un problema interno');
            },
            complete: function(){ 
                $ocrendForm.data('locked', false);
            } 
        });
    }
}

/**
 * Events
 */
$('#login').click(function(e) {
    e.defaultPrevented;
    login();
});
$('form#login_form input').keypress(function(e) {
    e.defaultPrevented;
    if(e.which == 13) {
        login();

        return false;
    }
});