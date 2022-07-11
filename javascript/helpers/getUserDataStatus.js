const adminPageLoad = () => {
    const token = window.localStorage.getItem('admin-token');
    if (token) {
        getUserData(token);
    } else {
        window.location.href = "/ambienteweb-santoshoy/userAuth/loginScreen.html";
    }
}

const getUserData = async (token) => {
    const auth = `Bearer ${token}`

    const response = await fetch("http://localhost/ambienteweb-santoshoy/Backend/getuser.php", {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': auth
        }
    });
    
    response.json().then(data => {
        if(data.success != 0) {
            document.getElementById("usuario").innerHTML = `<span>Bienvenido</span> ${data.user.name}`;

        } else {
            window.location.href = "/ambienteweb-santoshoy/userAuth/loginScreen.html";
        }
    });
}