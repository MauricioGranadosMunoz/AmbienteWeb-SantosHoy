document.getElementById("logout-cta").addEventListener('click',() => {
    window.localStorage.removeItem('admin-token');
    window.location.href = "/ambienteweb-santoshoy/FrontEnd/userAuth/loginScreen.html";
}); 
