let usuarios = [];
let btnnew;
let ingresa;
let graba;
let index;
let usuario;
let pass; 
let divNuevoUser; 
let mailNuevo;
let usuarioNuevo;
let passNueva; 
let ls_usuarios;
let json;

ls_usuarios = JSON.parse(localStorage.getItem("usuarios"));

usuario = document.getElementById("usuario");
pass = document.getElementById("pass");
ingresa = document.getElementById("ingresa");
btnnew = document.getElementById("new");
divNuevoUser = document.getElementById("divNuevoUser");
mailNuevo = document.getElementById("mailNuevo");
usuarioNuevo = document.getElementById("usuarioNuevo");
passNueva = document.getElementById("passNueva");
graba = document.getElementById("confirma"); 

divNuevoUser.classList.add("div_hide");

function usuarioInexistente(){
    Toastify({
        text: "Usuario inexistente",                
        duration: 2000,
        position:"center",
        style:{
            background:"rgba(134, 21, 21, 0.67)"                    
        }
    }).showToast();
}

function passwordIncorrecta(){
    Toastify({
        text: "Contraseña incorrecta",                
        duration: 2000,
        position:"center",
        style:{
            background:"rgba(134, 21, 21, 0.67)"                    
        }
    }).showToast();
}


usuario.addEventListener("change", function(){
    if (usuario.value != ""){
        if (ls_usuarios != null){
            let x = (ls_usuarios.findIndex(x => x.username === usuario.value));
            if ( x  == -1){
                usuarioInexistente();
                usuario.value = "";
            }
        }
        else{
            usuarioInexistente();
        }
    }
});

ingresa.addEventListener("click", function(){
    if (usuario.value != ""){
        if (ls_usuarios != null){
            let x = ls_usuarios.findIndex(x => x.username === usuario.value);
            if ( (ls_usuarios[x].password)  != (pass.value)){
                passwordIncorrecta();
                pass.value = "";
            }
            else{
                usuario.value = "";
                pass.value = "";
                window.location.replace("main.html?id="+x);
            }
        }
        else{   
            usuarioInexistente()
            usuario.value = "";
            pass.value = "";
            }
    }
});

btnnew.addEventListener("click", function(){
    divNuevoUser.classList.remove("div_hide");
});


mailNuevo.addEventListener("change", function(){
    if (mailNuevo.value != ""){
        if (ls_usuarios != null){
            let x = (ls_usuarios.findIndex(x => x.email === mailNuevo.value));
            if ( x  != -1){
                Toastify({
                    text: "Correo electrónico ya registrado",            
                    duration: 2000,
                    position:"center",
                    style:{
                        background:"rgba(134, 21, 21, 0.67)"                    
                    }
                    }).showToast();
                mailNuevo.value = "";
            }  
        }
    }
});

usuarioNuevo.addEventListener("change", function(){
    if (usuarioNuevo.value != ""){
        if (ls_usuarios != null){
            let x = (ls_usuarios.findIndex(x => x.username === usuarioNuevo.value));
            if ( x  != -1){
                Toastify({
                    text: "Nombre de usuario ya utilizado",            
                    duration: 2000,
                    position:"center",
                    style:{
                        background:"rgba(134, 21, 21, 0.67)"                    
                    }
                    }).showToast();
                usuarioNuevo.value = "";
            }  
        }
    }
});

graba.addEventListener("click", function(){
    if (mailNuevo.value == "" || usuarioNuevo.value == "" || passNueva.value == ""){
        Toastify({
            text: "Complete los datos solicitados",            
            duration: 2000,
            position:"center",
            style:{
                background:"rgba(134, 21, 21, 0.67)"                    
            }
            }).showToast();
    }
    else{        
        ls_usuarios != null ? usuarios = ls_usuarios : usuarios = [];
        let id = usuarios.length;
        let User = {email:mailNuevo.value, username:usuarioNuevo.value, password:passNueva.value, idUsuario: id};
        usuarios.push(User); 
        ls_usuarios= JSON.stringify(usuarios); 
        localStorage.setItem("usuarios", ls_usuarios);
        divNuevoUser.classList.add("div_hide");
        mailNuevo.value = ""; usuarioNuevo.value = ""; passNueva.value = "";
        ls_usuarios = localStorage.getItem("usuarios");
        ls_usuarios = JSON.parse(ls_usuarios);
        window.location.replace("main.html?id="+ id); 
    }
});
