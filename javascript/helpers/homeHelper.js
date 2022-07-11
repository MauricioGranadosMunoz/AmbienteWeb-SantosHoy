$(document).ready(function() {
    $.ajax({
      url : 'http://localhost/ambienteweb-santoshoy/Backend/api/noticias/read.php',
      type : 'GET',
      
      dataType : 'json',
      success : function(json) {
             var items = ''
            json.noticias.forEach(noticia => {
                console.log(noticia.titulo)
                console.log(noticia.linkasset)
                img=' <div class="card">'+
                //'<img src="http://localhost"'+noticia.linkasset+' class="card-img-top" alt="...">'+
                '<img src="http://localhost/ambienteweb-santoshoy/assets/apiUploads/2022-07-08/imagen-2022-07-08-05-27-08.jpg" class="card-img-top" alt="...">'+
                    '<div class="card-body">'+
                        '<h5 class="card-title">'+noticia.titulo+'</h5>'+
                            '<div class="card-detalle">'+
                                 '<a href="#" class="btn btn-primary">Detalles</a>'+
                            '</div>'+
                     '</div>'+
                '</div>'
                items = items + img
            });
            console.log(json);
            $('#noticias-container').append(`${items}`);
      },
      
      error : function(xhr, status) {
          alert('Disculpe, existió un problema');
      },
      complete : function(xhr, status) {
          console.log('Petición realizada');
      }
  });

  })