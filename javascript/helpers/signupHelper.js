document.getElementById("foo").addEventListener('click',() => {
    document.getElementById("error-login").classList.remove('show-error')
    const nombre = document.querySelector("#name").value;
    const correo = document.querySelector("#email").value;
    const pass = document.querySelector("#password").value;
    login(pass,correo,nombre);
});

const login = async (pass,correo,nombre) => {
    const requestBody = ` 
        {
            "name" : "${nombre}",
            "email": "${correo}",
            "password": "${pass}"
        }
    `
    const response = await fetch("http://mgm.social/Backend/register.php", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: requestBody,
    });
    response.json().then(data => {
        if(data.success == 1) {
            
            window.location.href = "http://mgm.social/userAuth/loginScreen.html";
        } else {
            
        }
    });
    
}


