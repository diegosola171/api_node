


function parseDate(s) {
  var b = s.split(/\D/);
  return new Date(b[0], --b[1], b[2]);
}

function sumarDia(fecha_inicial) {
  var dia1 = dia2 = parseInt(fecha_inicial[2]);
  var mes1 = mes2 = parseInt(fecha_inicial[1]);
  var anio1 = anio2 = parseInt(fecha_inicial[0]);
  var fecha_final = new Array(3);
  if (dia1 < 28) {
    dia2++;
  } else if (dia1 == 31) {
    dia2 = 1;
    if (mes1 == 12) {
      mes2 = 1;
      anio2++;
    } else {
      mes2++;
    };
  } else if (dia1 == 30 && (mes1 == 1 || mes1 == 3 || mes1 == 5 || mes1 == 7 || mes1 == 8 || mes1 == 10 || mes1 == 12)) {
    dia2++;
  } else if (dia1 == 30) {
    dia2 = 1;
    if (mes1 == 12) {
      mes2 = 1;
      anio2++;
    } else {
      mes2++;
    };
  } else if (dia1 == 29 && mes1 == 2) {
    dia2 = 1;
    mes2++;
  } else if (dia1 == 29) {
    dia2++;
  } else if (dia1 == 28 && mes1 == 2) {
    if (((anio1 % 4) == 0 && (anio1 % 100) != 0) || ((anio1 % 4) == 0 && (anio1 % 100) == 0 && (anio1 % 400) == 0)) {
      dia2++;
    } else {
      dia2 = 1;
      mes2++;
    }
  } else if (dia1 == 28) {
    dia2++;
  }
  fecha_final[0] = String(anio2);
  fecha_final[1] = String(mes2);
  fecha_final[2] = String(dia2);
  return fecha_final;
}

function esFinde(fecha) {
  var d = new Date(fecha[0], fecha[1] - 1, fecha[2]);
  if (d.getDay() == 0 /*domingo*/ || d.getDay() == 6/*sásbado*/) return true;
  else return false;
}

function esFeriado(fecha, pais) {
  var dia = String(fecha[2].padStart(2, "0"));
  var mes = String(fecha[1].padStart(2, "0"));
  var anio = String(fecha[0].padStart(4, "0"));
  var fecha_formato = anio + "-" + mes + "-" + dia;
  var lista_feriados = feriadosAR;
  switch (pais) {
    case "AR":
      lista_feriados = feriadosAR;
      break;
    case "MX":
      lista_feriados = feriadosMX;
      break;
    case "CO":
      lista_feriados = feriadosCO;
      break;
    case "CL":
      lista_feriados = feriadosCL;
      break;
    case "EC":
      lista_feriados = feriadosEC;
      break;
    case "PE":
      lista_feriados = feriadosPE;
      break;
    case "UY":
      lista_feriados = feriadosUY;
      break;
  }
  var i=0;
  var es_feriado = false;
  while((i<lista_feriados.length+1) && !es_feriado){
    if(fecha_formato==lista_feriados[i])es_feriado=true;
    i++;
  }
   // var d = new Date(fecha_inicial[0],fecha_inicial[1]-1, fecha_inicial[2]);
    //if(d.getDay()==0 /*domingo*/ || d.getDay()==6/*sásbado*/) return true;
    /*else*/ return es_feriado;
}


document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('calcular_fecha').addEventListener('click', function (event) {
    //var fecha_hasta = new Date(document.getElementById('date_calendar').valueAsNumber + 86400000*document.getElementById('days_calendar').value);
    /* var anio, mes, dia, fecha_desde = new Array(3);
     fecha_desde = String(document.getElementById('date_calendar').value).split("-");
     anio = fecha_desde[0];
     mes = fecha_desde[1];
     dia = String(parseInt(fecha_desde[2]));
     fecha_desde= anio + "-"  + String(mes) + "-" + String(dia);
     var fecha_hasta = new Date(fecha_desde);//anio + "-"  + mes + "-" + dia);*/
    // fecha_hasta.setDate(); //en ms
    //var fecha_hasta = d.setDate( fecha_hasta + document.getElementById('days_calendar').value);

    if (document.getElementById('days_calendar').value != 0 && document.getElementById('business_days_calendar').value != 0) { //si hay días corridos y hábiles para contar. No se sabe cuál se quiere calcular.
      document.getElementById('fecha_calculada').textContent = "Error: elegir Corridos o Hábiles.";

    } else if (document.getElementById('date_calendar').value == "") { //si la fecha de inicio no está definida
      document.getElementById('fecha_calculada').textContent = "Error. Elegir fecha de inicio.";

    } else if (document.getElementById('days_calendar').value != 0) { //para calcular días corridos
      if(document.getElementById('days_calendar').value <500){
      var fecha_desde = parseDate(document.getElementById('date_calendar').value);
      //fecha_desde.setDate(fecha_desde + document.getElementById('days_calendar').value*86400000);
      var d = new Date();
      var fecha_hasta = new Date(d.setTime(fecha_desde.getTime() + document.getElementById('days_calendar').value * 86400000));
      document.getElementById('fecha_calculada').textContent = "Vence (C): " + String(fecha_hasta.getDate()).padStart(2, "0") + "/" + (String(fecha_hasta.getMonth() + 1).padStart(2, "0")) + "/" + String(fecha_hasta.getFullYear());//String(d.getDate(fecha_hasta)).padStart(2,"0") + "/" + String(d.getMonth(fecha_hasta)+1).padStart(2,"0") + "/" + String(d.getFullYear(fecha_hasta));
      }else  document.getElementById('fecha_calculada').textContent = "Error: plazo demasiado largo.";
    } else if (document.getElementById('business_days_calendar').value != 0 && document.getElementById('site_selector').value == "none") { //si quiero calcular días hábiles pero no cargué el país
      document.getElementById('fecha_calculada').textContent = "Error. Elegir país.";
    } else if (document.getElementById('business_days_calendar').value != 0 && document.getElementById('site_selector').value != "none") { //para calcular días hábiles
      
      if(document.getElementById('business_days_calendar').value <500){
      //document.getElementById('fecha_calculada').textContent="Vence (H): XX/XX/XXXX";
      //fecha final = fecha de días corridos - días inhábiles (feriados) - sábados y domingos + feriados que caen sábado o domingo;
      var dias_a_contar = document.getElementById('business_days_calendar').value; //días hábiles que quiero sumar
      var dias_habiles_contados = 0; //quiero parar cuando sea igual a dias_a_contar
      var pais = document.getElementById('site_selector').value;
      var fecha_desde = (document.getElementById('date_calendar').value).split(/\D/);; // fecha_desde[0]=yyyy   fecha_desde[1]=mm     fecha_desde[2]=dd
      var fecha_intermedia = fecha_desde; //fecha que voy teniendo a medida que pasan los días

      while (dias_habiles_contados < dias_a_contar) {
        fecha_intermedia = sumarDia(fecha_intermedia); //siempre sumo un día a la fecha final. Sea hábil o no
        //if(fecha_intermedia **es inhabil** || fecha_intermedia **es fin de semana** ){
        if (esFeriado(fecha_intermedia, pais) || esFinde(fecha_intermedia)) {
        } else dias_habiles_contados++;
      }
      //var fecha_hasta = new Date(d.setTime( fecha_intermedia.getTime()));
      document.getElementById('fecha_calculada').textContent = "Vence (H): " + String(fecha_intermedia[2]) + "/" + String(fecha_intermedia[1]) + "/" + String(fecha_intermedia[0]);//+ String(fecha_hasta.getDate()).padStart(2,"0") + "/" + (String(fecha_hasta.getMonth()+1).padStart(2,"0")) + "/" +String(fecha_hasta.getFullYear());//String(d.getDate(fecha_hasta)).padStart(2,"0") + "/" + String(d.getMonth(fecha_hasta)+1).padStart(2,"0") + "/" + String(d.getFullYear(fecha_hasta));
    }else  document.getElementById('fecha_calculada').textContent = "Error: plazo demasiado largo.";




    } else if(document.getElementById('days_calendar').value == 0 && document.getElementById('business_days_calendar').value == 0){
      document.getElementById('fecha_calculada').textContent = "Error: ingresar plazo para calcular.";
    } else { document.getElementById('fecha_calculada').textContent = "Error desconocido."; } //si hay algún otro error que no fue contemplado

    //String(f.getDate()).padStart(2,"0")
  });
  document.getElementById('date_calendar').addEventListener('input', function (event) {
    document.getElementById('fecha_calculada').textContent = "Vence: ";

  });
  document.getElementById('days_calendar').addEventListener('input', function (event) {
    document.getElementById('fecha_calculada').textContent = "Vence: ";

  });
  document.getElementById('calendar_reset').addEventListener('click', function (event) {
    var fecha_hoy = new Date();
    document.getElementById('date_calendar').value = String(fecha_hoy.getFullYear()) + "-" + String((fecha_hoy.getMonth() + 1)).padStart(2, "0") + "-" + String(fecha_hoy.getDate()).padStart(2, "0");
    document.getElementById('fecha_calculada').textContent = "Vence: ";
    document.getElementById('days_calendar').value = "0";
    document.getElementById('business_days_calendar').value = "0";
    document.getElementById('site_selector').value = "none";
  });
  document.getElementById('calendar_today').addEventListener('click', function (event) {
    var fecha_hoy = new Date();
    document.getElementById('date_calendar').value = String(fecha_hoy.getFullYear()) + "-" + String((fecha_hoy.getMonth() + 1)).padStart(2, "0") + "-" + String(fecha_hoy.getDate()).padStart(2, "0");
    document.getElementById('fecha_calculada').textContent = "Vence: ";
  });
  document.getElementById('borrar_corridos').addEventListener('click', function (event) {
    document.getElementById('days_calendar').value = "0";
    document.getElementById('fecha_calculada').textContent = "Vence: ";
  });
  document.getElementById('borrar_habiles').addEventListener('click', function (event) {
    document.getElementById('business_days_calendar').value = "0";
    document.getElementById('fecha_calculada').textContent = "Vence: ";
  });
  var fecha_hoy = new Date();
  document.getElementById('date_calendar').value = String(fecha_hoy.getFullYear()) + "-" + String((fecha_hoy.getMonth() + 1)).padStart(2, "0") + "-" + String(fecha_hoy.getDate()).padStart(2, "0");
});