
let partidosC_ls = JSON.parse(localStorage.getItem("partidosC"));
let tablaGrupoC_ls = JSON.parse(localStorage.getItem("grupoC"));
let resultadosC_ls = JSON.parse(localStorage.getItem("resultadosCCargados"));

function cargarDatos(datos){
    return datos.usuarId == idUsuario;
}

function cargarPartidosUsuario(){
    
    if (partidosC_ls != null){
        let partidosCusuario = partidosC_ls.find(cargarDatos);
        if (partidosCusuario === undefined){
            return null;
        }else{
            return partidosCusuario.partidosC;
        }
    }else{
        return null;
    }
    
}

function cargarResultadosCCargadosUsuario(){

    if (resultadosC_ls != null){
        let resiltadosCusuario = resultadosC_ls.find(cargarDatos);
        if (resiltadosCusuario === undefined){
            return null;
        }else{
            return resiltadosCusuario.resultadosCCargados;
        }
    }else{
        return null;
    }
}

function cargarTablaGrupoCUsuario(){
    
    if (tablaGrupoC_ls != null){
        let tablaGrupoCusuario = tablaGrupoC_ls.find(cargarDatos);
        if (tablaGrupoCusuario === undefined){
            return null;
        }else{
            return tablaGrupoCusuario.tablaGrupoC;
        }
    }else{
        return null;
    }
}


function cargardelLS(){
    partidosC_ls = JSON.parse(localStorage.getItem("partidosC"));
    tablaGrupoC_ls = JSON.parse(localStorage.getItem("grupoC"));
    resultadosC_ls = JSON.parse(localStorage.getItem("resultadosCCargados"));
}


let clima = document.getElementById("clima");

fetch("https://api.openweathermap.org/data/2.5/weather?q=Qatar&units=metric&lang=es&appid=4d08f9f324a199776566c6122f9f9646")
    .then( respuesta => respuesta.json())
    .then( informacionRespuesta => {
        clima.innerHTML = `<span class='navbar-text'> Temperatura en ${informacionRespuesta.name}: ${informacionRespuesta.main.temp} °C </span><br>`
    })
