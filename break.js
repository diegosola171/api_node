const max_break = 1800000;  //1800000 en milisegundos
const max_pausa = 600000; //600000 en milisegundos
const max_total = max_break + max_pausa;

var en_break = false;
var en_pausa = false;
var hora_inicio = 0;
var break_restante = 0;
var pausa_restante = 0;
var break_restante_in = 0;
var pausa_restante_in = 0;
var pausa_anterior_fin = false;
var break_anterior_fin = false;

var notificacionFinal = false;
var notificacionBreak = false;
var notificacionPost = false;

var notificacionPersonalizable1 = false;
var notificacionPersonalizable2 = false;
var horaDePers1; //en ms
var horaDePers2; //en ms
var horaDePers1_string; //en ms
var horaDePers2_string; //en ms
var nombredePers1 = " ";
var nombredePers2 = " ";
var tipodePers1 = "neutro";
var tipodePers2 = "neutro";

var notificacionPausaActiva = false;
var horaDeBreak; //en ms
var horaDePost; //en ms
var horaDeBreak_string; //en ms
var horaDePost_string; //en ms
var ProxBreak_anterior = false;
var ProxPost_anterior = false;
var ProxPers1_anterior = false;
var ProxPers2_anterior = false;
var horaDePausaActiva_TM; //en ms
var horaDePausaActiva_TT; //en ms
var diaDePausaActiva_TM;
var diaDePausaActiva_TT;
var ProxPausaActiva_anterior = false;



function notificationCreate(titulo, mensaje, Interaction, verificacion) { //titulo y mensaje: strings;  Interaction: boolean (true para que la notificación no se cierre sola); Verificacion: solo se crea la notificación si es True
    if(verificacion){
    var notif = {
        type: "basic",
        title: titulo,
        message: mensaje,
        iconUrl: "/img/icon128.png",
        requireInteraction: Interaction //para que no se cierre la notificación
    };
    chrome.notifications.create(notif);
}
}

function generarTitulo(tipo) { //tipo: "bueno", "malo" o "neutro"
    var salida="";
    if(tipo=="bueno"){
        var i= Math.floor(Math.random() * 24); //del 0 al 23
        switch (i) {
            case 0:
                salida="¡Qué alegría!";
                break;
            case 1:
                salida="Vamo lo pibe";
                break;
            case 2:
                salida="¡Demás!";
                break;
            case 3:
                salida="¡Qué emoción!";
                break;
            case 4:
                salida="Así debe ser el paraíso";
                break;
            case 5:
                salida="¡Buenas noticias!";
                break;
            case 6:
                salida="¡Último momento!";
                break;
            case 7:
                salida="shoro d alegria";
                break;
            case 8:
                salida="Mirá qué bueno:";
                break;
            case 9:
                salida="¡Yay!";
                break;
            case 10:
                salida="Nos vimo en Tokio";
                break;
            case 11:
                salida="Chaucito";
                break;
            case 12:
                salida="Si esto es un sueño no quiero despertar";
                break;
            case 13:
                salida="🎉🎊🎈🎂";
                break;
            case 14:
                salida="Ah, pero qué bien";
                break;
            case 15:
                salida="¡Increíble!";
                break;
            case 16:
                salida="Bai 👋";
                break;
            case 17:
                salida="It's been 84 years...";
                break;
            case 18:
                salida="Happiness is closer than it appears";
                break;
            case 19:
                salida="[IMPRESIONADO]";
                break;
            case 20:
                salida="[Grita de alegría]";
                break;
            case 21:
                salida="Estoy feliz";
                break;
            case 22:
                salida="[Cheering in Spanish]";
                break;
            case 23:
                salida="Vine buscando cobre y encontré oro";
                break;
            default:
              break;
          }
    }else if(tipo=="malo"){
        var i= Math.floor(Math.random() * 26); //del 0 al 25
        switch (i) {
            case 0:
                salida="¡Qué pena!";
                break;
            case 1:
                salida="Lo 100to";
                break;
            case 2:
                salida="¡Ufa! :(";
                break;
            case 3:
                salida="¡Qué rápido pasa el tiempo!";
                break;
            case 4:
                salida="¡Hojaldre!";
                break;
            case 5:
                salida="Ey :(";
                break;
            case 6:
                salida="Vení :(";
                break;
            case 7:
                salida="Te tengo malas noticias...";
                break;
            case 8:
                salida="No sé cómo decirte esto, pero";
                break;
            case 9:
                salida="A veces toca sufrir un poco";
                break;
            case 10:
                salida="shoro";
                break;
            case 11:
                salida="Oh no";
                break;
            case 12:
                salida="¿Por quéééééé? 😭😭";
                break;
            case 13:
                salida="¡Noooooo! 😭😭";
                break;
            case 14:
                salida="eso fue muy rápido Scooby 😢";
                break;
            case 15:
                salida="[CRIES IN SPANISH]";
                break;
            case 16:
                salida="¿Ya? 😕";
                break;
            case 17:
                salida="Acompáñame a ver esta triste historia";
                break;
            case 18:
                salida="embeces la bida no es como keremos";
                break;
            case 19:
                salida="Calma, no te alteres";
                break;
            case 20:
                salida="Borra sto men, sta mui sad";
                break;
            case 21:
                salida="¡Chispas, Mickey!";
                break;
            case 22:
                salida="Qué sad";
                break;
            case 23:
                salida="*Pretends to be shocked*";
                break;
            case 24:
                salida="¡Así no!";
                break;
            case 25:
                salida="Todo me male sal";
                break;
            default:
              break;
          }
    }else if(tipo=="neutro"){
        var i= Math.floor(Math.random() * 16); //del 0 al 15
        switch (i) {
            case 0:
                salida="¡Oiga!";
                break;
            case 1:
                salida="Atención";
                break;
            case 2:
                salida="¡Che!";
                break;
            case 3:
                salida="Cuchame una cosa:";
                break;
            case 4:
                salida="Your attention, please";
                break;
            case 5:
                salida="¿Me oyen? ¿Me escuchan?";
                break;
            case 6:
                salida="*Notificación salvaje aparece*";
                break;
            case 7:
                salida="Con permiso";
                break;
            case 8:
                salida="Traigo noticias para ti:";
                break;
            case 9:
                salida="Como usted solicitó, le notifico:";
                break;
            case 10:
                salida="¡Hola! Soy yo de nuevo";
                break;
            case 11:
                salida="Espero no interrumpir, pero:";
                break;
            case 12:
                salida="Me comunican por interno:";
                break;
            case 13:
                salida="A quien corresponda:";
                break;
            case 14:
                salida="To whom it may concern:";
                break;
            case 15:
                salida="Último aviso:";
                break;
            default:
              break;
          }
    };
    return salida;
}

// Guarda las opciones en chrome.storage
function guardar_tiempos() {

    chrome.storage.sync.set({
        "stored_break_left": break_restante,
        "stored_pause_left": pausa_restante,
        "stored_start_time": hora_inicio,
        "stored_break_status": en_break,
        "stored_pause_status": en_pausa,
        "stored_pausa_anterior_fin": pausa_anterior_fin,
        "stored_break_anterior_fin": break_anterior_fin
    }, function () {
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
        stored_pause_status: false,
        stored_pausa_anterior_fin: false,
        stored_break_anterior_fin: false,
        stored_bubbly: 0
    }, function (items) {
        mostrar_minutos(items.stored_break_left, items.stored_pause_left);
        break_restante = items.stored_break_left;
        pausa_restante = items.stored_pause_left;
        en_break = items.stored_break_status;
        en_pausa = items.stored_pause_status;
        hora_inicio = items.stored_start_time;
        pausa_anterior_fin = items.stored_pausa_anterior_fin;
        break_anterior_fin = items.stored_break_anterior_fin;
        bubbly= items.stored_bubbly;
        if ((Date.now() - hora_inicio) > 28800000) { reiniciar_tiempos(); } //21600000 = 6 horas; 28800000 = 8 horas. Reinicia el contador si hace más de 8 horas que no se usa (para evitar que aparezca el break del día anterior)
        var break_restante1= break_restante-(Date.now() - hora_inicio);
        var pausa_restante1= pausa_restante-(Date.now() - hora_inicio);
        if (en_break){
            document.getElementById('break_button').textContent = "Pausar";
            document.getElementById('break_button').style.backgroundColor = "#4CAF50";
            if(break_restante1<0) document.getElementById('break_button_barra').style.color = "red";
            else{
                if((max_total-(max_break-break_restante1)-(max_pausa-pausa_restante1))<0) document.getElementById('break_button_barra').style.color = "#ffe868";
                else document.getElementById('break_button_barra').style.color = "#54ff5b";
            }
        }
        if (en_pausa){
            document.getElementById('pause_button').textContent = "Pausar";
            document.getElementById('pause_button').style.backgroundColor = "#4CAF50";
            if(pausa_restante1<0) document.getElementById('pause_button_barra').style.color = "red";
            else{
                if((max_total-(max_break-break_restante1)-(max_pausa-pausa_restante1))<0) document.getElementById('pause_button_barra').style.color = "#ffe868";
                else document.getElementById('pause_button_barra').style.color = "#54ff5b";
            }
        }
        if (bubbly <10) document.getElementById('bubbly_config').style.display = "block";
    });
}

function reiniciar_tiempos() {
    // Seteo valores por defecto, para la primera vez que se usa:
    chrome.storage.sync.set({
        "stored_break_left": max_break, //1800000,
        "stored_pause_left": max_pausa,
        "stored_break_status": false,
        "stored_pause_status": false,
        "stored_break_anterior_fin": false,
        "stored_pausa_anterior_fin": false
    }, function () {
        document.getElementById('break_time').textContent = "30:00";
        document.getElementById('pause_time').textContent = "10:00";
        document.getElementById('tiempo_total').textContent = "00:00";
        document.getElementById('break_time').style.color = "white";
        document.getElementById('pause_time').style.color = "white";
        document.getElementById('tiempo_total').style.color = "white";
        document.getElementById('pause_button').textContent = "Iniciar";
        document.getElementById('pause_button').style.backgroundColor = "#6e6e6e";
        document.getElementById('pause_button_barra').style.color = "white";
        document.getElementById('break_button').textContent = "Iniciar";
        document.getElementById('break_button').style.backgroundColor = "#6e6e6e";
        document.getElementById('break_button_barra').style.color = "white";
        pausa_anterior_fin = false; //para las notificaciones
        break_anterior_fin = false; //para las notificaciones

        break_restante = max_break; //1800000;
        pausa_restante = max_pausa;
        en_break = false;
        en_pausa = false;
        guardar_tiempos();

    });
}

function mostrar_minutos(break_in, pausa_in) { //función que convierte milisegundos en minutos:segundos
    var break_ms = break_in;
    var pausa_ms = pausa_in;
    var signo_br = "";
    var signo_pa = "";
    var signo_tot = "";

    document.getElementById('break_time').style.color = "white";
    document.getElementById('pause_time').style.color = "white";
    document.getElementById('tiempo_total').style.color = "white";
    if (break_ms < 0) {
        break_ms = -break_ms + 1000;
        signo_br = "-";
        document.getElementById('break_time').style.color = "red";
        if (en_break) {
            document.getElementById('break_button_barra').style.color = "red";
            if (!break_anterior_fin) {
                notificationCreate(generarTitulo("malo"), "Terminó el tiempo de break", true, notificacionFinal); //"Terminó el tiempo de break \rshoro :'("
                break_anterior_fin = true;
            }
        }
    }
    if (pausa_ms < 0) {
        pausa_ms = -pausa_ms + 1000;
        signo_pa = "-";
        document.getElementById('pause_time').style.color = "red";
        if (en_pausa) {
            document.getElementById('pause_button_barra').style.color = "red";
            if (!pausa_anterior_fin) {
                notificationCreate(generarTitulo("malo"), "Terminó el tiempo de pausa", true, notificacionFinal);
                pausa_anterior_fin = true;
            }
        }
    }

    var minutos_break = Math.floor(break_ms / 60000);
    var segundos_break = Math.floor((break_ms % 60000) / 1000);
    var minutos_pausa = Math.floor(pausa_ms / 60000);
    var segundos_pausa = Math.floor((pausa_ms % 60000) / 1000);

    var total_ms = max_total - (Math.sign(break_in) * (segundos_break * 1000 + minutos_break * 60000) + Math.sign(pausa_in) * (segundos_pausa * 1000 + minutos_pausa * 60000)); //2400000
    if (total_ms > max_total) {
        document.getElementById('tiempo_total').style.color = "red";
        if (en_break && break_in >= 0) document.getElementById('break_button_barra').style.color = "#ffe868";
        if (en_pausa && pausa_in >= 0) document.getElementById('pause_button_barra').style.color = "#ffe868";
    }
    var minutos_total = Math.floor(total_ms / 60000);
    var segundos_total = Math.floor((total_ms % 60000) / 1000);
    document.getElementById('break_time').textContent = signo_br + String(minutos_break).padStart(2, "0") + ":" + String(segundos_break).padStart(2, "0");
    document.getElementById('pause_time').textContent = signo_pa + String(minutos_pausa).padStart(2, "0") + ":" + String(segundos_pausa).padStart(2, "0");
    document.getElementById('tiempo_total').textContent = signo_tot + String(minutos_total).padStart(2, "0") + ":" + String(segundos_total).padStart(2, "0");
}

function break_end_time() {
    if (en_break) {
        var h = new Date();
        var seg_rest = Math.floor((break_restante_in % 60000) / 1000);
        var min_rest = Math.trunc(break_restante_in / 60000);

        var ahora_seg = h.getSeconds();
        var ahora_min = h.getMinutes();
        var ahora_hora = h.getHours();
        var segundos_fin = ahora_seg + seg_rest;
        var minutos_fin = ahora_min + min_rest;
        var horas_fin = ahora_hora;
        if (segundos_fin >= 60) {
            segundos_fin = segundos_fin - 60;
            minutos_fin = minutos_fin + 1;
            if (segundos_fin == 0) {
                segundos_fin = 59;
                minutos_fin = minutos_fin - 1;
            }
        }

        if (minutos_fin >= 60) {
            minutos_fin = minutos_fin - 60;
            horas_fin = horas_fin + 1;
        }
        if (horas_fin >= 24) {
            horas_fin = horas_fin - 24;
        }
        document.getElementById('end_time').textContent = "Fin: " + String(horas_fin).padStart(2, "0") + ":" + String(minutos_fin).padStart(2, "0") + " ";
        //document.getElementById('end_time').style = "font-size: 20px; font-family: Rubik;";
        //document.getElementById('end_time_2').textContent = " (aprox)";
        //document.getElementById('end_time_2').style = "font-size: 10px; font-family: Rubik;";
    }
    else {
        document.getElementById('end_time').textContent = " ";
        document.getElementById('end_time_2').textContent = " ";
    }
}

function iniciar_break() {
    if (en_pausa == true) { }
    else if (en_break == true) {
        en_break = false;
        document.getElementById('break_button').textContent = "Iniciar";
        document.getElementById('break_button').style.backgroundColor = "#6e6e6e";
        document.getElementById('break_button_barra').style.color = "white";
        break_restante = break_restante_in;
        guardar_tiempos();
        //chrome.alarms.clear("Break1min", );
        //chrome.alarms.clear("BreakFin", );
    } else {
        en_break = true;
        document.getElementById('break_button').textContent = "Pausar";
        document.getElementById('break_button').style.backgroundColor = "#4CAF50";
        document.getElementById('break_button_barra').style.color = "#54ff5b";
        hora_inicio = Date.now();
        guardar_tiempos();
        //chrome.alarms.create("Break1min", {when: Date.now() + break_restante - 120000});
        //chrome.alarms.create("BreakFin", {when: Date.now() + break_restante});
    }
}
function iniciar_pausa() {
    if (en_break == true) { }
    else if (en_pausa == true) {
        en_pausa = false;
        document.getElementById('pause_button').textContent = "Iniciar";
        document.getElementById('pause_button').style.backgroundColor = "#6e6e6e";
        document.getElementById('pause_button_barra').style.color = "white";
        pausa_restante = pausa_restante_in;
        guardar_tiempos();
        //chrome.alarms.clear("Pausa1min", );
        //chrome.alarms.clear("PausaFin", );
    } else {
        en_pausa = true;
        document.getElementById('pause_button').textContent = "Pausar";
        document.getElementById('pause_button').style.backgroundColor = "#4CAF50";
        document.getElementById('pause_button_barra').style.color = "#54ff5b";
        hora_inicio = Date.now();
        guardar_tiempos();
        //chrome.alarms.create("Pausa1min", {when: Date.now() + pausa_restante - 120000});
        //chrome.alarms.create("PausaFin", {when: Date.now() + pausa_restante});
    }
}

function contador() {
    break_restante_in = break_restante;
    pausa_restante_in = pausa_restante;
    if (en_break == true) {
        break_restante_in = break_restante - (Date.now() - hora_inicio);
        mostrar_minutos(break_restante_in, pausa_restante_in);
    } else if (en_pausa == true) {
        pausa_restante_in = pausa_restante - (Date.now() - hora_inicio);
        mostrar_minutos(break_restante_in, pausa_restante_in);
    } else {
    }
    if ((Date.now() - horaDeBreak >= 0) && !ProxBreak_anterior) {
        notificationCreate(generarTitulo("bueno"), "Hora de ponerse en Próximo: Break", false, notificacionBreak);
        ProxBreak_anterior = true;
    }
    if ((Date.now() - horaDePost >= 0) && !ProxPost_anterior) {
        notificationCreate(generarTitulo("bueno"), "Hora de ponerse en Próximo: Post", false, notificacionPost);
        ProxPost_anterior = true;
    }
    if ((Date.now() - horaDePers1 >= 0) && !ProxPers1_anterior) {
        notificationCreate(generarTitulo(tipodePers1), nombredePers1, false, notificacionPersonalizable1);
        ProxPers1_anterior = true;
    }
    if ((Date.now() - horaDePers2 >= 0) && !ProxPers2_anterior) {
        notificationCreate(generarTitulo(tipodePers2), nombredePers2, false, notificacionPersonalizable2);
        ProxPers2_anterior = true;
    }
    var d = new Date();
    var n = d.getDay();
    if ((Date.now() - horaDePausaActiva_TM >= 0) && n==diaDePausaActiva_TM && !ProxPausaActiva_anterior) {
        notificationCreate(generarTitulo("bueno"), "¡En 10 minutos empiezan las tandas de Pausa Activa! 🤸🤸‍♀️ Fijate tu horario", false, notificacionPausaActiva);
        ProxPausaActiva_anterior = true;
    }
    if ((Date.now() - horaDePausaActiva_TT >= 0) && n==diaDePausaActiva_TT && !ProxPausaActiva_anterior) {
        notificationCreate(generarTitulo("bueno"), "¡En 10 minutos empiezan las tandas de Pausa Activa! 🤸🤸‍♀️ Fijate tu horario", false, notificacionPausaActiva);
        ProxPausaActiva_anterior = true;
    }
    /*if ((Date.now() - horaDePausaActiva_TN >= 0) && Date.getDay()==diaDePausaActiva_TN && !ProxPausaActiva_anterior) {
        notificationCreate(generarTitulo("bueno"), "Empiezan las tandas de pausa activa. Fijate tu horario", false, notificacionPausaActiva);
        ProxPausaActiva_anterior = true;
    }*/
    break_end_time();
}


document.addEventListener('DOMContentLoaded', function () {
    mostrar_tiempos();
    document.getElementById('break_button').addEventListener('click',
        iniciar_break);
    document.getElementById('pause_button').addEventListener('click',
        iniciar_pausa);
    document.getElementById('break_button_barra').addEventListener('click',
        iniciar_break);
    document.getElementById('pause_button_barra').addEventListener('click',
        iniciar_pausa);
    document.getElementById('reset_button').addEventListener('click',
        reiniciar_tiempos);
    document.getElementById('close_bubbly_config').addEventListener('click',
    function () {
        document.getElementById('bubbly_config').style.display = "none";
        chrome.storage.sync.set({
            "stored_bubbly": 10
        }, function () {
        });
    });
});
setInterval(contador, 100);