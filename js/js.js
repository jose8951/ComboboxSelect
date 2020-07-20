$(function () {
    mostrarCombo();

enviar();


})

function mostrarCombo() {
    var parametros = {
        'func': 'editar'
    };
    $.ajax({
        url: 'php/cargar_listas.php',
        method: 'post',
        data: parametros,
        success: function (data) {
            data = $.parseJSON(data); //ya tengo una array
            // console.log(data);
            muestraResultados(data);
        },
        error: function (xhr, status) {
            alert("Disculpe, existió un problema");
        }
    });

    $('#lista_reproduccion').on('change', function () {
        let id = $('#lista_reproduccion').val();
        // alert("vamos " + id);
        let parametros = {
            'func': 'video',
            'busc': id
        };
        $.ajax({
            url: 'php/cargar_listas.php',
            method: 'post',
            data: parametros,
            success: function (videos) {
                videos = $.parseJSON(videos);
                if(videos){
                    muestraVideos(videos);
                }else{
                    let resultado = '<option  value="0">No hay videos</option>';
                    $('#videos').html(resultado);
                }
                
            },
            error: function (xhr, status) {
                alert("disculpel, existio un problema");
            }
        });
    });



   
}

function enviar(){
    $('#enviar').on('click', function(){
    
        let resultado='lista de reproducción: ';
      //  resultado += $('#lista_reproduccion').val();
      resultado+=$ ('#lista_reproduccion option:selected').text();
        resultado += ' - video elegido: ';
      //  resultado+= $('#videos').val();
        resultado+= $('#videos option:selected').text();
       $('#resultado1').html(resultado);
    })


/*
 $(document).on('click', '#enviar', function() {
         alert("dentro enviar");
    });
*/
}

function muestraVideos(videos) {
    let resultado = '<option value="0">Elige un video</option>';
    videos.forEach(function (element) {
        resultado+= '<option value='+element.id+'>'+element.nombre +'</option>';
    });

    $('#videos').html(resultado);
}



function muestraResultados(data) {
    //console.log(data);
    let resultado = '<option value="0">Elige una opción</option>';
    data.forEach(function (element) {
        resultado += '<option value=' + element.id + ' >' + element.nombre + '</option>';
    });

    $('#lista_reproduccion').html(resultado);


}