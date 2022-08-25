const adminPageLoad = () => {
    const token = window.localStorage.getItem('admin-token');
    if (token) {
        getUserData(token);
    } else {
        window.location.href = "/userAuth/loginScreen.html";
    }
}

const getUserData = async (token) => {
    const auth = `Bearer ${token}`

    const response = await fetch("http://mgm.social/Backend/getUser.php", {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': auth
        }
    });
    
    response.json().then(data => {
        if(data.success != 0) {
            localStorage.setItem('admin-name', data.user.name);
            document.getElementById("usuario").innerHTML = `<span>Bienvenido</span> ${data.user.name}`;

        } else {
            window.location.href = "/userAuth/loginScreen.html";
        }
    });
}