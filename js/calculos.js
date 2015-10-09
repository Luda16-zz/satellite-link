
<script>
//funciones de calculadora en Js


/* si se tiene  una estacion terrena con una antena de 4 mts de diametro alimentado por una potencia de 100 w frecuencia de subida de 
14 GHz, esta radiada al satelite GEO a 36.000 km, el angulo de recepcion es la antena del satelite que es O3db=2° 
La frecuencia del satelite es de 55% y la estacion terrena de 65% en  el satelite la potencia es 20w, frecuencia de trabajo es igual a 12 Ghz que se irradia
con un O3db=4°, la antena de la estacion terrena tiene un diametro de 6 mts con eficiencia de 60% la del satelite es 55% 

Enlace de subida
Calcular la ganancia de la antena


*/

/* Formulas
 * 
 * Free Space Path Loss (FSPL)
 * (4*PI*D*F/C)elevado al cuadrado
 * D: es la distancia del receptor al transmisor (metros)
 * F: intensidad en frecuencia (Hertz)
 * C: velocidad de la luz en el vacio (metros por segundos) */

function ganancia_antena(efictierra,diametro,frecuencia_up,frecuencia_up_hz){
//var pi = 3.1416;
var pi=Math.PI;
var efictierra =efictierra; //eficiencia antena en tierra
frecuencia_up; //frecuencia de subida 
diametro;//metros del diametro
frecuencia_up_hz;//unidad de la frecuencia de subida
var valorFrecuencia= escala_hertz(frecuencia_up,frecuencia_up_hz); //transformo el valor segun la unidad correspondiente
var velocidad_luz=300000000;
var ganancia=efictierra*(Math.pow((pi*diametro*valorFrecuencia/velocidad_luz),2));

var ganancia_total= 10*Math.log10(ganancia);
return ganancia_total;

}


function potenciatx(pot){

var potenciatotal=10*Math.log10(pot);
return potenciatotal;
}

//Calculadora EIRP
/* http://www.pasternack.com/t-calculator-eirp.aspx */
function getPire(potenciatx,ganancia,losscable){
var pire=potenciatx-losscable+ganancia;
return pire;

}


/* Power Density Calculator
 * http://www.pasternack.com/t-calculator-power-density.aspx
 *     */

function densidadmaxima(potenciatx,ganancia,distancia){
	var pi=Math.PI;
var densidad=(potenciatx*ganancia/4*pi*Math.pow(distancia,2));

}

//Calculo potencia de recepcion
//punto 5 ejercicio 1
function potencia_recepcion(variable,distancia,frecuencia){
	var fsl0=variable+20*Math.log(distancia);
	var fsl1=20*Math.log(frecuencia);
	var fsl=fsl0+fsl1;
	
	return fsl;
	
}

//punto 6
function ganancia_antena_receptora(diametro,frecuencia,eficiencia_sat){
	var valor_pie=3.28*diametro; //valor de metro a pie
	var gpx=20*Math.log(valor_pie)+20*Math.log(frecuencia)+10*Math.log(eficiencia_sat)- 49,92;//aun no se que carajo es 49,92?. Constante o Variable?

return gpx;	 
}


//punto 7
function pot_recepcion(pire,fsl,gpx){
	var psl=pire+(-fsl)+gpx;
	return psl;
}

//punto 8 
//calculamos figura merito

function calculo_figura(gpx){
	
	var calc_figura=gpx-10*Math.log(290);//de donde carajo se saca el 290?
	return calc_figura;
}

//punto 9
function last(pire,fsl,calc_figura){
	var k=Math.pow(10,-23);
var boltzman=1.3806*k;
 var fin=pire-fsl+calc_figura-boltzman;
 
 return fin;
	
}




function escala_hertz(valor,unidad){
	if(unidad=="hertz"){
			var valortotal=valor*1;
		}

	if (unidad=="kilohertz"){

    var valortotal=valor*1000;
		}

	if (unidad=="megahertz"){

    var valortotal=valor*1000000;
		}
		
if (unidad=="gigahertz"){

    var valortotal=valor*1000000000;
		}


	if (unidad=="terahertz"){

    var valortotal=valor*1000000000000;
		}

		if (unidad=="petahertz"){

    var valortotal=valor*1000000000000000;
		}

return valortotal;
}




</script> 