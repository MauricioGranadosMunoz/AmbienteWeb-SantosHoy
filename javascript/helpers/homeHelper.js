$(document).ready(function() {
    $.ajax({
      url : 'http://localhost/ambienteweb-santoshoy/Backend/api/noticias/read.php',
      type : 'GET',
      
      dataType : 'json',
      success : function(json) {
             var items = ''

            json.noticias.forEach(({id, titulo,autor, tipo,descripcion,linkasset,created}) => {
                $('#noticias-container').append(`
                    <div class="card" id="${id}">
                            <img src="http://localhost${linkasset}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${titulo}</h5>
                            <p class="card-text">${descripcion}</p>
                            <div class="card-noticia-type">
                                <p class="card-tipo">${tipo}</p>
                            </div>
                            <a href="#">VER NOTICIA</a>
                        </div>
                    </div>
                `);
            });
      },
      
      error : function(xhr, status) {
          alert('Disculpe, existió un problema');
      },
      complete : function(xhr, status) {
          console.log('Petición realizada');
      }
  });

  })