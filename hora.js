var meses = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
var dias = ["dom", "lun", "mar", "mie", "jue", "vie", "sab"];

var bubbly =0; //cuenta las veces que ya mostré "bubbly_config"

var invertido = false;

function mostrarhora() {
    var f = new Date();
    cad1 = String(f.getHours()).padStart(2, "0") + ":" + String(f.getMinutes()).padStart(2, "0") + ":" + String(f.getSeconds()).padStart(2, "0");
    //cad2=String(f.getDate()).padStart(2,"0")+"/"+String(f.getMonth()+1).padStart(2,"0")+"/"+String(f.getFullYear()).padStart(4,"0"); 
    cad2 = dias[f.getDay()] + " " + String(f.getDate()).padStart(2, "0") + " " + meses[f.getMonth()];
    //document.getElementById('hora').textContent = cad1;
    //document.getElementById('fecha').textContent = cad2;
    document.getElementById('fecha_y_hora').textContent = cad1 + " - " + cad2;
}
setInterval(mostrarhora, 200);


document.addEventListener("DOMContentLoaded", function (event) {
    chrome.storage.sync.get({
        stored_invertir: false, //valor por defecto
    }, function (items) {
        invertido = items.stored_invertir;
        if(invertido) document.getElementById('boton_invertir').src = "/img/invertir_2.png";

        
        if(invertido){
            document.getElementById('principal').style.top="0px";
            document.getElementById('principal').style.bottom="auto";
            document.getElementById('bloque_break').style.top="29px";
        } 
        if (chrome.app.window.get('main').outerBounds.height > 50) {
            chrome.app.window.get('main').outerBounds.setSize(220, 29);
            if(!invertido)chrome.app.window.get('main').outerBounds.setPosition(chrome.app.window.get('main').outerBounds.left, chrome.app.window.get('main').outerBounds.top + 221); //solo lo hace si no está invertido
        }
    });
    document.getElementById('button_invertir').addEventListener('click', function (event) {
        chrome.storage.sync.set({
            "stored_invertir": !invertido
        }, function () {
        });
        invertido= !invertido;
        if(invertido){
            document.getElementById('boton_invertir').src = "/img/invertir_2.png";
            var posLeft = chrome.app.window.get('main').outerBounds.left;
            var posTop = chrome.app.window.get('main').outerBounds.top;
            document.getElementById('principal').style.top="0px";
            document.getElementById('principal').style.bottom="auto";
            document.getElementById('bloque_break').style.top="29px";
            chrome.app.window.get('main').outerBounds.setPosition(posLeft, posTop + 221);
        }else{
            document.getElementById('boton_invertir').src = "/img/invertir.png";
            var posLeft = chrome.app.window.get('main').outerBounds.left;
            var posTop = chrome.app.window.get('main').outerBounds.top;
            document.getElementById('principal').style.bottom="0px";
            document.getElementById('principal').style.top="auto";
            document.getElementById('bloque_break').style.top="0px";
            chrome.app.window.get('main').outerBounds.setPosition(posLeft, posTop - 221);
        }
    });

    document.getElementById('bloque_break').style.visibility = "hidden";
    document.getElementById('open_break').addEventListener('click', function (event) {
        var posLeft = chrome.app.window.get('main').outerBounds.left;
        var posTop = chrome.app.window.get('main').outerBounds.top;
        if (window.innerHeight < 150) {
            chrome.app.window.get('main').outerBounds.setSize(220, 250);
            if(!invertido) {chrome.app.window.get('main').outerBounds.setPosition(posLeft, posTop - 221);
            }else  {chrome.app.window.get('main').outerBounds.setPosition(posLeft, posTop);}
            //chrome.app.window.get('main').outerBounds.setPosition(screen.availWidth - 500, screen.availHeight - 250);
            document.getElementById('bloque_break').style.visibility = "visible";
            document.getElementById('boton_abrir').src = "/img/cerrar.png";
            // document.getElementById('principal').style.bottom="0px";
            if (bubbly <10){
                chrome.storage.sync.set({
                    "stored_bubbly": bubbly++
                    }, function () {
                });
            }
        } else {
            if(document.getElementById('div_calendar').style.visibility == "hidden"){
                document.getElementById('bloque_break').style.visibility = "hidden";
                document.getElementById('div_config').style.visibility = "hidden";
                document.getElementById('div_calendar').style.visibility = "hidden";
                document.getElementById('button_config').innerHTML = "⚙"; 
                document.getElementById('boton_abrir').src = "/img/abrir.png";
                chrome.app.window.get('main').outerBounds.setSize(220, 29);
                if(!invertido) {chrome.app.window.get('main').outerBounds.setPosition(posLeft, posTop + 221);
                }else  {chrome.app.window.get('main').outerBounds.setPosition(posLeft, posTop);}

            }else{
                                //chrome.app.window.get('main').outerBounds.setPosition(screen.availWidth - 500, screen.availHeight - 250);
                document.getElementById('bloque_break').style.visibility = "visible";
                document.getElementById('div_calendar').style.visibility = "hidden";
                document.getElementById('boton_abrir').src = "/img/cerrar.png";
                // document.getElementById('principal').style.bottom="0px";
            }
            //chrome.app.window.get('main').outerBounds.setPosition(screen.availWidth - 500, screen.availHeight - 38);

        }

    });
    document.getElementById('button_config').addEventListener('click', function (event) {
        if(document.getElementById('div_config').style.visibility == "hidden"){
            document.getElementById('div_config').style.visibility = "visible";  
            document.getElementById('button_config').innerHTML = "&lt;";  
            document.getElementById('cbox1').checked = notificacionFinal;  
            document.getElementById('cbox2').checked = notificacionBreak;  
            document.getElementById('cbox3').checked = notificacionPost;   
            document.getElementById('cbox5').checked = notificacionPersonalizable1;    
            document.getElementById('cbox6').checked = notificacionPersonalizable2;  
            document.getElementById('hora_personalizable_1').value = horaDePers1_string; 
            document.getElementById('hora_personalizable_2').value = horaDePers2_string; 
            document.getElementById('nombre_personalizable_1').value = nombredePers1; 
            document.getElementById('nombre_personalizable_2').value = nombredePers2; 
            document.getElementById('tipo_personalizable_1').value = tipodePers1; 
            document.getElementById('tipo_personalizable_2').value = tipodePers2; 

            document.getElementById('cbox4').checked = notificacionPausaActiva;   
            document.getElementById('hora_prox_break').value = horaDeBreak_string;  
            document.getElementById('hora_prox_post').value = horaDePost_string;  
            if (bubbly <10){ 
                document.getElementById('bubbly_config').style.display = "none";
                chrome.storage.sync.set({
                    "stored_bubbly": 10
                }, function () {
                });
            }
        }else {
            document.getElementById('div_config').style.visibility = "hidden";  
            document.getElementById('button_config').innerHTML = "⚙"; 

        }
    });
   
    
    document.getElementById('fecha_y_hora').addEventListener('click', function (event) {
        var posLeft = chrome.app.window.get('main').outerBounds.left;
        var posTop = chrome.app.window.get('main').outerBounds.top;
        if (window.innerHeight < 150) {
            chrome.app.window.get('main').outerBounds.setSize(220, 250);
            if(invertido){chrome.app.window.get('main').outerBounds.setPosition(posLeft, posTop);
            }else{chrome.app.window.get('main').outerBounds.setPosition(posLeft, posTop - 221);}
            //chrome.app.window.get('main').outerBounds.setPosition(screen.availWidth - 500, screen.availHeight - 250);
            document.getElementById('div_calendar').style.visibility = "visible";
            // document.getElementById('principal').style.bottom="0px";
        } else {
            if(document.getElementById('div_calendar').style.visibility == "visible"){
            document.getElementById('div_calendar').style.visibility = "hidden";
            document.getElementById('bloque_break').style.visibility = "hidden";
            document.getElementById('div_config').style.visibility = "hidden";
            chrome.app.window.get('main').outerBounds.setSize(220, 29);
            
            if(invertido){chrome.app.window.get('main').outerBounds.setPosition(posLeft, posTop);
            }else{chrome.app.window.get('main').outerBounds.setPosition(posLeft, posTop + 221);}
            //chrome.app.window.get('main').outerBounds.setPosition(screen.availWidth - 500, screen.availHeight - 38);
            }else{
                //chrome.app.window.get('main').outerBounds.setPosition(screen.availWidth - 500, screen.availHeight - 250);
                document.getElementById('div_calendar').style.visibility = "visible";
                document.getElementById('bloque_break').style.visibility = "hidden";
                document.getElementById('div_config').style.visibility = "hidden";
                document.getElementById('boton_abrir').src = "/img/abrir.png";
                document.getElementById('button_config').innerHTML = "⚙"; 
                // document.getElementById('principal').style.bottom="0px";

            }
        }

    });

});