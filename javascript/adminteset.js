$( document ).ready(() => {
    const mostrarNoticia = (id) => {
        var id = id;
        const requestBody = `{"id": "${id}"}`
        $.ajax({
          url : 'http://localhost/ambienteweb-santoshoy/Backend/api/noticias/delete.php',
          type : 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //'Authorization' : `Bearer ${userToken}`
            },
            body: requestBody,
          success : function(json) {
            console.table(json)
          },
      
          error : function(xhr, status) {
              alert('Disculpe, existió un problema');
          },
      
          complete : function(xhr, status) {
              alert('Petición realizada');
          }
      });
      }





    $('.btn-success').on('click', (e) => {
        e.preventDefault();
        console.log(this)
        var id = $(this).id;
        console.log(id)
        //console.log(valorBebida)
        //mostrarNoticia(id)
      })
});