$( document ).ready(() => {
    const addDataE = async (image) => {
        const seleccionTitulo = $('#input-titulo').val();
        const userToken = window.localStorage.getItem('admin-token');
        const nameUser = window.localStorage.getItem('admin-name');
        const dateTime = new Date().toLocaleString();
        const requestBody = `{
            "titulo": "${seleccionTitulo}",
            "descripcion": "qwert123",
            "linkasset": "${image}",
            "autor": "${nameUser}",
            "created": "${dateTime}",
            "tipo": "Sucesos" }`

        const response = await fetch("http://mgm.social/Backend/api/noticias/crear.php", {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${userToken}`
            },
            body: requestBody,
        });
        response.json().then(getNoticiasData());
    }

    const guardarNoticia = async () => {
        const input = document.getElementById('noticia-img-upload');
        let data = new FormData();
        data.append('sendimage', input.files[0]);
        const response = await fetch("http://mgm.social/Backend/api/noticias/crearNoticiaUpload.php", {
            method: 'POST',
            body: data
        });
        response.json().then(data => {
            addDataE(data.images[0]);
        }); 
    }

    const postEliminarNoticia = async ( identificador ) => {
        const requestBody = `{ "id": "${identificador}" }`

        const response = await fetch("http://mgm.social/Backend/api/noticias/delete.php", {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            body: requestBody,
        });
        response.json().then(getNoticiasData());
    }

    const GETNoticiaIndividual = async ( idnoticia ) => {
        const response = await fetch("http://mgm.social/Backend/api/noticias/read.php", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        response.json().then(({ noticias }) => {
            $('#ver-noticias-modal').empty();
            noticias.forEach(({ id, titulo, autor, tipo, descripcion, linkasset, created }) => {
                if(idnoticia==id){
                    $('#ver-noticias-modal').append(`
                    <h1>${titulo}</h1>
                    <h4>${autor}</h4>
                    <h4>${tipo}</h4>
                    <h5>${created}</h5>
                    <img src="http://mgm.social/${linkasset}" alt="imagen noticia" width="500" height="600">
                    <p>${descripcion}</p>
                    `);
                }
            })
        })
    }

    const getSingleNoticiasData = async ( noticiaId ) => {
        const requestBody = `{ "noticia": "${noticiaId}" }`
        const response = await fetch("http://mgm.social/Backend/api/noticias/readsinglenew.php", {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            body: requestBody,
        });
        
        response.json().then(({ titulo, linkasset }) => {
            $("#input-titulo-editar").val(titulo);
            $("#input-img-editar").attr("src",`http://mgm.social/${linkasset}`);
            $( "#input-img-editar" ).addClass( "show" );
        });
    }


    const getNoticiasData = async () => {
        const response = await fetch("http://mgm.social/Backend/api/noticias/read.php", {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }
        });
        response.json().then(({ noticias }) => {
            $('#noticias-container').empty();
            noticias.forEach(({ id, titulo, autor, tipo, descripcion, linkasset, created }) => {
                $('#noticias-container').append(`
                    <div class="card">
                        <div class="card-image-container">
                            <p class="card-id-section">${id}</p>
                            <img src="http://mgm.social/${linkasset}" class="card-img-top" alt="...">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${titulo}</h5>
                            <p class="card-text">${descripcion}</p>
                            <div class="card-noticia-type">
                                <p class="card-fecha"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar" viewBox="0 0 16 16">
                                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                                </svg>${created}</p>
                                <p class="card-author"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                </svg>${autor}</p>
                                <p class="card-tipo">${tipo}</p>
                            </div>
                            <hr>
                            <div class="card-cta-container">
                                <p class="card-cta-opciones">Opciones de noticia<p>
                                <a class="btn btn-success" id="${id}" data-toggle="modal" data-target="#exampleModal2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                                    </svg>
                                </a>
                                <a class="btn btn-warning editNoticiasModalButton" id="${id}" data-toggle="modal" data-target="#editNoticiasModal">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                    </svg>
                                </a>
                                <a href="#" class="btn btn-danger"id="${id}">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                `);
            });
        });
    }

    $( "#logout-cta" ).click(() => {
        window.localStorage.removeItem('admin-token');
        window.location.href = "/userAuth/loginScreen.html";
    });

    $( "#agregar-noticia-cta" ).click(() =>{
        guardarNoticia();
    });

    $('#noticias-container').on('click', '.editNoticiasModalButton', (e) => {
        getSingleNoticiasData(e.target.id);
    });

    $('#noticia-img-upload').on("change", (e) => {
        const output = document.getElementById('output-img');
        output.src = URL.createObjectURL(e.target.files[0]);
        output.classList.add( "show" );
        output.onload = () => {
            URL.revokeObjectURL(output.src)
        }
    });

    $('#noticias-container').on('click','.btn-danger', (e) => {
        e.preventDefault();
        postEliminarNoticia(e.currentTarget.id);
    })

    $('#noticias-container').on('click','.btn-success', (e) => {
        e.preventDefault();
        GETNoticiaIndividual(e.currentTarget.id);
    })

    getNoticiasData();
});