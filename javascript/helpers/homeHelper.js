$(document).ready(function () {
    $.ajax({
        url: 'http://mgm.social/Backend/api/noticias/read.php',
        type: 'GET',

        dataType: 'json',
        success: function (json) {
            var items = ''

            json.noticias.forEach(({ id, titulo, autor, tipo, descripcion, linkasset, created }) => {
                $('#noticias-container').append(`
                    <div class="card home-page animate__animated animate__fadeIn">
                        <div class="card-img-container">
                            <img src="http://mgm.social/${linkasset}" class="card-img-top" alt="...">
                            <div class="card-img-body">
                                <h5 class="card-title">${titulo}</h5>
                            </div>
                         </div>  
                        <div class="card-body">
                            <div class="card-noticia-type">
                                <p class="card-tipo ${tipo.toLowerCase()}">${tipo}</p>
                            </div>
                            <p class="card-text">${descripcion}</p>
                            <div class="div-visualizar-noticia">
                                <a class="verNoticiasModalButton" id="${id}">Leer más</a>
                            </div>
                        </div>
                    </div>
                `);

                /*
                $('#noticias-container2').append(`
                    <div class="card" id="${id}">
                            <img src="http://mgm.social/${linkasset}" class="card-img-top" alt="...">
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
        const response = await fetch("http://mgm.social/Backend/api/noticias/readsinglenew.php", {
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
                        <div class="detail-image-container animate__animated animate__slideInLeft">
                            <img src="http://mgm.social/${linkasset}" class="card-img-top-news" alt="...">
                        </div>
                        <div class="content-container-details">
                            <div class="card-noticia-type">
                                <p class="card-tipo ${tipo.toLowerCase()}">${tipo}</p>
                            </div>
                            <h5 class="card-news-title">${titulo}</h5>
                            <p class="card-text">${descripcion}</p>
                            <p class="card-fecha"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar" viewBox="0 0 16 16">
                            <div class="card-noticia-type">
                                <p class="card-fecha"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar" viewBox="0 0 16 16">
                                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                                </svg>${created}</p>
                                <p class="card-author"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                </svg>${autor}</p>
                            </div>
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
