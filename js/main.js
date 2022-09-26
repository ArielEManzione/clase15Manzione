let completo = "NO";
function asignoGoles(){
    for (let i = 0; i < partidosC.length; i++){
        let partido = document.getElementById(`grupoCPartido${(i+1)}`);
        partidosC[i].set_golesA(partido.getElementsByTagName("input")[0].value);   
        partidosC[i].equipoA.set_golesAFavor(partido.getElementsByTagName("input")[0].value);
        partidosC[i].equipoA.set_golesEnContra(partido.getElementsByTagName("input")[1].value);

        partidosC[i].set_golesB(partido.getElementsByTagName("input")[1].value);   
        partidosC[i].equipoB.set_golesAFavor(partido.getElementsByTagName("input")[1].value);
        partidosC[i].equipoB.set_golesEnContra(partido.getElementsByTagName("input")[0].value);

        if( partidosC[i].get_golesA() > partidosC[i].get_golesB()){
            partidosC[i].equipoA.set_puntos(3);
            partidosC[i].equipoB.set_puntos(0);
        }else if(partidosC[i].get_golesA() < partidosC[i].get_golesB()){
            partidosC[i].equipoA.set_puntos(0);
            partidosC[i].equipoB.set_puntos(3);
        }else{
            partidosC[i].equipoA.set_puntos(1);
            partidosC[i].equipoB.set_puntos(1);
        } 
    }
}

let goles = document.getElementsByClassName("goles");
let botonTabla = document.getElementById("botonTabla");
let btnTabla = document.getElementById("btnTabla");

btnTabla.addEventListener("click",function(){
    let h4 = document.getElementById("error");
    completo = "SI";
    for (let gol of goles){
        gol.value == "" ? completo = "NO" : null;
    }
    if (completo == "NO"){
        if (h4 == null){
            let mensajeError = document.createElement("h4");
            mensajeError.innerHTML = `Error! <br>
                                      completar todos los resultados del grupo  <br>
                                      para poder actualizar la tabla`;
            mensajeError.id = "error";
            botonTabla.append(mensajeError);
        }
    }else {        
        
        h4 != null ? h4.remove() : null;
        
        limpiarTabla();

        asignoGoles();
        orden = 1;
        tablaGrupoC.sort(ordenarPuntos);
        crearTabla();
        
        cargardelLS();

        if (partidosC_ls != null){
            let x = (partidosC_ls.findIndex(x => x.usuarId === idUsuario));            
            if (x != -1){
                partidosC_ls.splice(x,1);

            }
        }else{
            partidosC_ls = []; 
        }
        
        if (tablaGrupoC_ls != null){
            let y = (tablaGrupoC_ls.findIndex(y => y.usuarId === idUsuario));
            if (y != -1){
                tablaGrupoC_ls.splice(y,1);
            } 
        }else{
            tablaGrupoC_ls = []; 
        }
        
        if (resultadosC_ls != null){
            let z = (resultadosC_ls.findIndex(z => z.usuarId === idUsuario));
            if (z != -1){
                resultadosC_ls.splice(z,1);
            }
        }else{
            resultadosC_ls = []; 
        }

        let partidosCUsuario = {usuarId: idUsuario, partidosC: partidosC };
        partidosC_ls.push(partidosCUsuario);
        let tablaGrupoCUsuario = {usuarId: idUsuario, tablaGrupoC: tablaGrupoC };  
        tablaGrupoC_ls.push(tablaGrupoCUsuario);      
        let resultadosCCargadosUsuario = {usuarId: idUsuario, resultadosCCargados: "S" };
        resultadosC_ls.push(resultadosCCargadosUsuario);

        localStorage.setItem("grupoC", JSON.stringify(tablaGrupoC_ls));
        localStorage.setItem("partidosC", JSON.stringify(partidosC_ls));
        localStorage.setItem("resultadosCCargados", JSON.stringify(resultadosC_ls));
    }
})

