var cbx_final;
var cbx_break;
var cbx_post;
var cbx_pausa_activa;
var hora_break;
var hora_post;
const hora_pausa_activa_TM = "08:50";
const hora_pausa_activa_TT = "16:30";
const dia_pausa_activa_TM = 3;//miércoles
const dia_pausa_activa_TT = 4;//jueves
//const pausa_activa_TN = "00:00";
//const dia_pausa_activa_TN = 0;//domingo


function calcularHora(input){ //funcion que calcula la hora en ms. Input es un string "hh:mm"
    var h = new Date();
    var hora = h.getHours();
    var minutos = h.getMinutes();
    var segundos = h.getSeconds();
    var resultado;
    var alarma = new Array(2);
    alarma =input.split(":");
    if (hora < parseInt(alarma[0],10)) {resultado = Date.now() - hora*3600000 -minutos*60000 -segundos*1000 + parseInt(alarma[0],10)*3600000 + parseInt(alarma[1],10)*60000;}
    else if (hora > parseInt(alarma[0],10)) {resultado = Date.now() +86400000 - hora*3600000 -minutos*60000 -segundos*1000 + parseInt(alarma[0],10)*3600000 + parseInt(alarma[1],10)*60000;}
    else if (minutos < parseInt(alarma[1],10)) {resultado = Date.now() - hora*3600000 -minutos*60000 -segundos*1000 + parseInt(alarma[0],10)*3600000 + parseInt(alarma[1],10)*60000;}
    else  {resultado = Date.now() +86400000 - hora*3600000 -minutos*60000 -segundos*1000 + parseInt(alarma[0],10)*3600000 + parseInt(alarma[1],10)*60000;}
    return resultado;
}

function cargar_datos(){
  chrome.storage.sync.get({
    noti_final: true, 
    noti_break: false, 
    noti_post: false,
    prox_break: "",
    prox_post: "",
    noti_personalizable1: false,
    noti_personalizable1_hora: "",
    noti_personalizable1_nombre: "Personalizable 1",
    noti_personalizable1_tipo: "neutro",
    noti_personalizable2: false,
    noti_personalizable2_hora: "",
    noti_personalizable2_nombre: "Personalizable 2",
    noti_personalizable2_tipo: "neutro",
    noti_pausa_activa: true 
  }, function(items) {
    cbx_final = items.noti_final;
    cbx_break = items.noti_break;
    cbx_post = items.noti_post;
    hora_break = items.prox_break;
    hora_post = items.prox_post;
    cbx_pausa_activa = items.noti_pausa_activa;
    document.getElementById('cbox1').checked = items.noti_final;
    document.getElementById('cbox2').checked = items.noti_break;
    document.getElementById('cbox3').checked = items.noti_post;
    document.getElementById('hora_prox_break').value = items.prox_break;
    document.getElementById('hora_prox_post').value = items.prox_post;
    document.getElementById('cbox5').checked = items.noti_personalizable1;
    document.getElementById('hora_personalizable_1').value = items.noti_personalizable1_hora;
    document.getElementById('nombre_personalizable_1').value = items.noti_personalizable1_nombre;
    document.getElementById('tipo_personalizable_1').value = items.noti_personalizable1_tipo;
    document.getElementById('cbox6').checked = items.noti_personalizable2;
    document.getElementById('hora_personalizable_2').value = items.noti_personalizable2_hora;
    document.getElementById('nombre_personalizable_2').value = items.noti_personalizable2_nombre;
    document.getElementById('tipo_personalizable_2').value = items.noti_personalizable2_tipo;
    document.getElementById('cbox4').checked = items.noti_pausa_activa;
    notificacionFinal=items.noti_final;
    notificacionBreak=items.noti_break;
    notificacionPost=items.noti_post;
    notificacionPersonalizable1=items.noti_personalizable1;
    notificacionPersonalizable2=items.noti_personalizable2;
    notificacionPausaActiva=items.noti_pausa_activa;
    horaDeBreak= calcularHora(items.prox_break);
    horaDePost= calcularHora(items.prox_post);
    horaDeBreak_string= items.prox_break;
    horaDePost_string= items.prox_post;

    horaDePers1= calcularHora(items.noti_personalizable1_hora);
    horaDePers2= calcularHora(items.noti_personalizable2_hora);
    horaDePers1_string= items.noti_personalizable1_hora;
    horaDePers2_string= items.noti_personalizable2_hora;
    nombredePers1 = items.noti_personalizable1_nombre;
    nombredePers2 = items.noti_personalizable2_nombre;
    tipodePers1 = items.noti_personalizable1_tipo;
    tipodePers2 = items.noti_personalizable2_tipo;
    

    horaDePausaActiva_TM= calcularHora(hora_pausa_activa_TM);//calcularHora(document.getElementById('hora_prox_post').value);
    horaDePausaActiva_TT= calcularHora(hora_pausa_activa_TT);//calcularHora(document.getElementById('hora_prox_post').value);
    //horaDePausaActiva_TN= hora_pausa_activa_TN;//calcularHora(document.getElementById('hora_prox_post').value);
    diaDePausaActiva_TM=dia_pausa_activa_TM;
    diaDePausaActiva_TT=dia_pausa_activa_TT;
    //diaDePausaActiva_TN=dia_pausa_activa_TN;
  });
}

function guardar_opciones() {  
  if(cbox2.checked==true && document.getElementById('hora_prox_break').value==""){
    mensaje= document.getElementById('msg')
    mensaje.textContent = "Error. Hora de Break no definida.";
    mensaje.style.color=  "#bc0303";
    setTimeout(function() {
      mensaje.textContent = '';
    }, 1500);
  }else if(cbox3.checked==true && document.getElementById('hora_prox_post').value==""){
    mensaje= document.getElementById('msg')
    mensaje.textContent = "Error. Hora de Post no definida.";
    mensaje.style.color=  "#bc0303";
    setTimeout(function() {
      mensaje.textContent = '';
    }, 1500);
  }else if(cbox5.checked==true && (document.getElementById('hora_personalizable_1').value=="" || document.getElementById('nombre_personalizable_1').value=="")){
    mensaje= document.getElementById('msg')
    mensaje.textContent = "Error. Notificación mal definida.";
    mensaje.style.color=  "#bc0303";
    setTimeout(function() {
      mensaje.textContent = '';
    }, 1500);
  }else if(cbox6.checked==true && (document.getElementById('hora_personalizable_2').value=="" || document.getElementById('nombre_personalizable_2').value=="")){
    mensaje= document.getElementById('msg')
    mensaje.textContent = "Error. Notificación mal definida.";
    mensaje.style.color=  "#bc0303";
    setTimeout(function() {
      mensaje.textContent = '';
    }, 1500);
  }else{
  chrome.storage.sync.set({
    "noti_final": document.getElementById('cbox1').checked,
    "noti_break": document.getElementById('cbox2').checked,
    "noti_post": document.getElementById('cbox3').checked,
    "prox_break": document.getElementById('hora_prox_break').value,
    "prox_post": document.getElementById('hora_prox_post').value,
    
    "noti_personalizable1": document.getElementById('cbox5').checked,
    "noti_personalizable1_hora": document.getElementById('hora_personalizable_1').value,
    "noti_personalizable1_nombre": document.getElementById('nombre_personalizable_1').value,
    "noti_personalizable1_tipo": document.getElementById('tipo_personalizable_1').value,
    
    "noti_personalizable2": document.getElementById('cbox6').checked,
    "noti_personalizable2_hora": document.getElementById('hora_personalizable_2').value,
    "noti_personalizable2_nombre": document.getElementById('nombre_personalizable_2').value,
    "noti_personalizable2_tipo": document.getElementById('tipo_personalizable_2').value,

    "noti_pausa_activa": document.getElementById('cbox4').checked,
    //"hora_pausa_activa": document.getElementById('hora_pausa_activa_selector').value,
    //"dia_pausa_activa": document.getElementById('dia_pausa_activa_selector').value
    }, function() {
    });
    notificacionFinal=document.getElementById('cbox1').checked;
    notificacionBreak=document.getElementById('cbox2').checked;
    notificacionPost=document.getElementById('cbox3').checked;
    notificacionPersonalizable1=document.getElementById('cbox5').checked;
    notificacionPersonalizable2= document.getElementById('cbox6').checked;
    notificacionPausaActiva=document.getElementById('cbox4').checked;
    ProxBreak_anterior= false;
    ProxPost_anterior= false;
    ProxPers1_anterior= false; //personalizable
    ProxPers2_anterior= false;
    ProxPausaActiva_anterior= false;
    horaDeBreak= calcularHora(document.getElementById('hora_prox_break').value);
    horaDePost= calcularHora(document.getElementById('hora_prox_post').value);
    horaDeBreak_string= document.getElementById('hora_prox_break').value;
    horaDePost_string= document.getElementById('hora_prox_post').value;
    
    horaDePers1= calcularHora(document.getElementById('hora_personalizable_1').value);
    horaDePers2= calcularHora(document.getElementById('hora_personalizable_2').value);
    horaDePers1_string= document.getElementById('hora_personalizable_1').value;
    horaDePers2_string= document.getElementById('hora_personalizable_2').value;
    nombredePers1= document.getElementById('nombre_personalizable_1').value;
    nombredePers2= document.getElementById('nombre_personalizable_2').value;
    tipodePers1= document.getElementById('tipo_personalizable_1').value;
    tipodePers2= document.getElementById('tipo_personalizable_2').value;

    horaDePausaActiva_TM= calcularHora(hora_pausa_activa_TM);//calcularHora(document.getElementById('hora_prox_post').value);
    horaDePausaActiva_TT= calcularHora(hora_pausa_activa_TT);//calcularHora(document.getElementById('hora_prox_post').value);
    //horaDePausaActiva_TN= hora_pausa_activa_TN;//calcularHora(document.getElementById('hora_prox_post').value);
    diaDePausaActiva_TM=dia_pausa_activa_TM;
    diaDePausaActiva_TT=dia_pausa_activa_TT;
    //diaDePausaActiva_TN=dia_pausa_activa_TN;
    mensaje= document.getElementById('msg');
    mensaje.textContent = "Guardado.";
    mensaje.style.color=  "white";
    setTimeout(function() {
      mensaje.textContent = '';
    }, 800);
  }
}





/*

const max_break = 1800000;  //1800000 en milisegundos
const max_pausa = 600000; //en milisegundos
const max_total = max_break + max_pausa;

var en_break = false;
var en_pausa = false;
var hora_inicio = 0;
var break_restante = 0;
var pausa_restante = 0;
var break_restante_in = 0;
var pausa_restante_in = 0;

// Guarda las opciones en chrome.storage
function guardar_tiempos() {  
  
  chrome.storage.sync.set({
    "stored_break_left": break_restante,
    "stored_pause_left": pausa_restante,
    "stored_start_time": hora_inicio,
    "stored_break_status": en_break,
    "stored_pause_status": en_pausa
    }, function() {
    });
}

// Carga la p�gina de opciones con las opciones guardadas en chrome.storage
function mostrar_tiempos() { //al abrir la pagina
  // Seteo valores por defecto, para la primera vez que se usa:
  chrome.storage.sync.get({
    stored_break_left: max_break, //milisegundos en 30 minutos
    stored_pause_left: max_pausa, //milisegundos en 10 minutos
    stored_start_time: 0,
    stored_break_status: false,
    stored_pause_status: false
  }, function(items) {
    mostrar_minutos(items.stored_break_left, items.stored_pause_left);
    break_restante = items.stored_break_left;
    pausa_restante = items.stored_pause_left;
    en_break = items.stored_break_status;
    en_pausa = items.stored_pause_status;
    hora_inicio = items.stored_start_time;
    if((Date.now() - hora_inicio)>28800000) {reiniciar_tiempos();} //21600000 = 6 horas; 28800000 = 8 horas. Reinicia el contador si hace más de 8 horas que no se usa (para evitar que aparezca el break del día anterior)
  });
}

function reiniciar_tiempos() {
  // Seteo valores por defecto, para la primera vez que se usa:
  chrome.storage.sync.set({
    "stored_break_left": max_break, //1800000,
    "stored_pause_left": max_pausa,
    "stored_break_status": false,
    "stored_pause_status": false
    }, function() {
    document.getElementById('break_time').textContent = "30:00";
    document.getElementById('pause_time').textContent = "10:00";
    document.getElementById('tiempo_total').textContent = "00:00";
    document.getElementById('break_time').style = "color: white; font-family: Rubik; ";
    document.getElementById('pause_time').style = "color: white; font-family: Rubik; ";
    document.getElementById('tiempo_total').style = "color: white; font-family: Rubik; ";
      
    break_restante = max_break; //1800000;
    pausa_restante = max_pausa;
    en_break = false;
    en_pausa = false;
    guardar_tiempos();
    try {
        chrome.alarms.clear("Pausa1min", );
        chrome.alarms.clear("PausaFin", );
    }catch(err) {}
    try {
        chrome.alarms.clear("Break1min", );
        chrome.alarms.clear("BreakFin", );
    }catch(err) {}
   
    });
}

function mostrar_minutos(break_in, pausa_in){ //fución que convierte milisegundos en minutos:segundos
  var break_ms = break_in;
  var pausa_ms = pausa_in;
  var signo_br = "";
  var signo_pa = "";
  var signo_tot = "";
  
  document.getElementById('break_time').style = "color: white; font-family: Rubik;";
  document.getElementById('pause_time').style = "color: white; font-family: Rubik;";
  document.getElementById('tiempo_total').style = "color: white; font-family: Rubik;";
  if (break_ms < 0){
    break_ms = -break_ms+1000;
    signo_br = "-";
    document.getElementById('break_time').style = "color: red;"
  }
  if (pausa_ms < 0){
    pausa_ms = -pausa_ms+1000;
    signo_pa = "-";
    document.getElementById('pause_time').style = "color: red;"
  }

  var minutos_break = Math.floor(break_ms/60000);
  var segundos_break = Math.floor((break_ms % 60000)/1000);
  var minutos_pausa = Math.floor(pausa_ms/60000);
  var segundos_pausa = Math.floor((pausa_ms % 60000)/1000);

  var total_ms = max_total - (Math.sign(break_in)*(segundos_break*1000 + minutos_break*60000) + Math.sign(pausa_in)*(segundos_pausa*1000 + minutos_pausa*60000)); //2400000
  if (total_ms > max_total){
    document.getElementById('tiempo_total').style = "color: red;"
  }
  var minutos_total = Math.floor(total_ms/60000);
  var segundos_total = Math.floor((total_ms % 60000)/1000);
  document.getElementById('break_time').textContent = signo_br + String(minutos_break).padStart(2,"0") + ":" + String(segundos_break).padStart(2,"0");
  document.getElementById('pause_time').textContent = signo_pa + String(minutos_pausa).padStart(2,"0") + ":" + String(segundos_pausa).padStart(2,"0");
  document.getElementById('tiempo_total').textContent = signo_tot + String(minutos_total).padStart(2,"0") + ":" + String(segundos_total).padStart(2,"0");
}

function break_end_time(){
  if(en_break){
    var h = new Date();
    var seg_rest = Math.floor((break_restante_in % 60000)/1000);
    var min_rest =  Math.trunc(break_restante_in/60000); 

    var ahora_seg = h.getSeconds();
    var ahora_min = h.getMinutes();
    var ahora_hora = h.getHours();
    var segundos_fin = ahora_seg + seg_rest;
    var minutos_fin = ahora_min + min_rest;
    var horas_fin = ahora_hora;
    if (segundos_fin >=60){
      segundos_fin = segundos_fin-60;
      minutos_fin = minutos_fin+1;
      if (segundos_fin == 0){
        segundos_fin = 59;
        minutos_fin = minutos_fin-1;
      }
    }
    
    if (minutos_fin >=60){
      minutos_fin = minutos_fin-60;
      horas_fin = horas_fin+1;
    }
    if (horas_fin >=24){
      horas_fin = horas_fin-24;
    }
    document.getElementById('end_time').textContent = "Hora de fin del Break: " + String(horas_fin).padStart(2,"0") + ":" + String(minutos_fin).padStart(2,"0") + " ";
    document.getElementById('end_time').style = "font-size: 20px; font-family: Rubik;";
    document.getElementById('end_time_2').textContent = " (aprox)";
    document.getElementById('end_time_2').style = "font-size: 10px; font-family: Rubik;";
  }
  else {
    document.getElementById('end_time').textContent = " ";
    document.getElementById('end_time_2').textContent = " ";
  }
}

function iniciar_break() {
  if(en_pausa == true){}
  else if(en_break == true){
    en_break = false;
    break_restante = break_restante_in;
    guardar_tiempos();
    chrome.alarms.clear("Break1min", );
    chrome.alarms.clear("BreakFin", );
  }else{
    en_break = true;
    hora_inicio = Date.now();
    guardar_tiempos();
    chrome.alarms.create("Break1min", {when: Date.now() + break_restante - 120000});
    chrome.alarms.create("BreakFin", {when: Date.now() + break_restante});
  }
}
function iniciar_pausa() {
  if(en_break == true){}
  else if(en_pausa == true){
    en_pausa = false;
    pausa_restante = pausa_restante_in;
    guardar_tiempos();
    chrome.alarms.clear("Pausa1min", );
    chrome.alarms.clear("PausaFin", );
  }else{
    en_pausa = true;
    hora_inicio = Date.now();
    guardar_tiempos();
    chrome.alarms.create("Pausa1min", {when: Date.now() + pausa_restante - 120000});
    chrome.alarms.create("PausaFin", {when: Date.now() + pausa_restante});
  }
}

function contador(){
  break_restante_in = break_restante;
  pausa_restante_in = pausa_restante;
  if(en_break == true){
    break_restante_in = break_restante - (Date.now() - hora_inicio);
    mostrar_minutos(break_restante_in, pausa_restante_in);
    document.getElementById('break_button').textContent = "Pausar";
    document.getElementById('break_button').style = "background-color: #4CAF50";
  }else if(en_pausa == true){
    pausa_restante_in = pausa_restante - (Date.now() - hora_inicio);
    mostrar_minutos(break_restante_in, pausa_restante_in);
    document.getElementById('pause_button').textContent = "Pausar";
    document.getElementById('pause_button').style = "background-color: #4CAF50";
  }else{
    document.getElementById('break_button').textContent = "Iniciar";
    document.getElementById('break_button').style = "background-color: #6e6e6e";
    document.getElementById('pause_button').textContent = "Iniciar";
    document.getElementById('pause_button').style = "background-color: #6e6e6e";
  }
  break_end_time();
}



document.addEventListener('DOMContentLoaded', function(){
  mostrar_tiempos();
  document.getElementById('break_button').addEventListener('click',
      iniciar_break);
  document.getElementById('pause_button').addEventListener('click',
      iniciar_pausa);
  document.getElementById('reset_button').addEventListener('click',
      reiniciar_tiempos);
});
setInterval(contador, 100);
*/


document.addEventListener('DOMContentLoaded', function(){
  cargar_datos();
  document.getElementById('guardar_opciones').addEventListener('click',
    guardar_opciones);
});



/*
document.addEventListener('DOMContentLoaded', function(){
  setInterval(function(){
    document.getElementById('titu').textContent = document.getElementById('hora_prox_post').value;
  },1000);
});*/