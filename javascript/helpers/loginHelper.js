document.getElementById("foo").addEventListener('click',() => {
    document.getElementById("error-login").classList.remove('show-error')
    const correo = document.querySelector("#correo").value;
    const pass = document.querySelector("#password").value;
    login(pass,correo);
});

const login = async (pass,correo) => {
    const requestBody = ` 
        {
            "email": "${correo}",
            "password": "${pass}"
        }
    `
    const response = await fetch("http://mgm.social/Backend/login.php", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: requestBody,
    });
        
    response.json().then(data => {
        if(data.token) {
            localStorage.setItem('admin-token', data.token.toString())
            window.location.href = "../adminPanel/admin-dashboard.html";
        } else {
            document.getElementById("error-login").classList.add('show-error');
        }
    });
}