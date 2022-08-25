$(document).ready(function () {
    $.ajax({
        url: 'http://localhost/ambienteweb-santoshoy/Backend/api/noticias/read.php',
        type: 'GET',

        dataType: 'json',
        success: function (json) {
            var items = ''

            json.noticias.forEach(({ id, titulo, autor, tipo, descripcion, linkasset, created }) => {
                $('#noticias-container').append(`
                    <div class="card">
                            <img src="http://localhost${linkasset}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${titulo}</h5>
                            <p class="card-text">${descripcion}</p>
                            <div class="card-noticia-type">
                                <p class="card-tipo">${tipo}</p>
                            </div>
                            <div class="div-visualizar-noticia">
                                <a class="verNoticiasModalButton" id="${id}">Leer más</a>
                            </div>
                        </div>
                    </div>
                `);

                /*
                $('#noticias-container2').append(`
                    <div class="card" id="${id}">
                            <img src="http://localhost${linkasset}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${titulo}</h5>
                            <p class="card-text">${descripcion}</p> 
                            <div class="card-noticia-type">
                                <p class="card-tipo">${tipo}</p>
                            </div>
                            <div class="div-visualizar-noticia">
                                <button type="button" class="btn btn-success" onclick="window.open('./newsDetail.html', '_blank');">Visualizar Noticia</button>
                            </div>
                        </div>
                    </div>
                `);
                */
            });

        },

        error: function (xhr, status) {
            alert('Disculpe, existió un problema');
        },
        complete: function (xhr, status) {
            console.log('Petición realizada');
        }
    });





    const getDetailData = async () => {
        const noticiaId = window.localStorage.getItem('noticia-id');
        const requestBody = `{ "noticia": "${noticiaId}" }`
        const response = await fetch("http://localhost/ambienteweb-santoshoy/Backend/api/noticias/readsinglenew.php", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: requestBody,
        });

        response.json().then(({ id, linkasset, titulo, descripcion, tipo, autor, created }) => {
            $('#dettale-noticias-container').append(`
                    <div class="news-detail">
                            <img src="http://localhost${linkasset}" class="card-img-top-news" alt="...">
                        <div class="content-container-details">
                            <h5 class="card-news-title">${titulo}</h5>
                            <p class="card-text">${descripcion}</p>
                            <div class="card-noticia-type">
                                <p class="card-tipo">${tipo}</p>
                            </div>
                            <div class="card-noticia-type">
                                <p class="card-autor">${autor}</p>
                            </div>
                            <div class="card-noticia-type">
                                <p class="card-created">${created}</p>
                            </div>
                            <div class="div-visualizar-noticia">
                                <button type="button" class="btn btn-success" onclick="window.open('./index.html', '_self');">Atrás</button>
                            </div>
                            <br>
                        </div>
                    </div>
                `);
        });
    }
    getDetailData();


    $('#noticias-container').on('click', '.verNoticiasModalButton', (e) => {
        localStorage.setItem('noticia-id', e.target.id)
        window.open("./newsDetail.html", "_self")
    });


})
