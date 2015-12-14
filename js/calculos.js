

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

var calculos_result={};

Object.defineProperty(calculos_result,'fspldecibels', {value: '0', writable:true, enumerable:true, configurable:true});
Object.defineProperty(calculos_result,'pire', {value: '0', writable:true, enumerable:true, configurable:true});
Object.defineProperty(calculos_result,'densidad', {value: '0', writable:true, enumerable:true, configurable:true});
Object.defineProperty(calculos_result,'fsl1', {value: '0', writable:true, enumerable:true, configurable:true});
Object.defineProperty(calculos_result,'gan_anten_reci', {value: '0', writable:true, enumerable:true, configurable:true});
Object.defineProperty(calculos_result,'pot_recept', {value: '0', writable:true, enumerable:true, configurable:true});
Object.defineProperty(calculos_result,'figura', {value: '0', writable:true, enumerable:true, configurable:true});
Object.defineProperty(calculos_result,'c_no', {value: '0', writable:true, enumerable:true, configurable:true});

/*Object.defineProperty(calculos_result, 'temp', {value:'0',
  get: function() { return temp; },
  set: function(newValue) { bValue = newValue; },
  enumerable: true,
  configurable: true
});*/
function validarCampoVacio(arregloValores,arregloIds){
//var	valido=true;
var error=0;
	for(i=0;i<arregloValores.length;i++){
if(arregloValores[i]==''){
error++;
		document.getElementById(arregloIds[i]+'_'+i).style.color='red';
		document.getElementById(arregloIds[i]+'_'+i).style.display='block';
		//valido=false;
   }
 else{
   document.getElementById(arregloIds[i]+'_'+i).style.display='none';
   //valido=true;
    }
  }
  if(error>0){
  	valido=false;
  }
  else{
  	valido=true;
  }
return valido;
}

function fspl_decibels(){
		document.getElementById("gainpx1").innerHTML='';
		var arrayValores= new Array();
		var arrayIds= new Array();
		
	var pi=Math.PI;
	var velocidad_luz=300000000;

	var distancia = document.getElementById('distmts').value;
	
	var frecuencia=document.getElementById('frecuehz').value;
	var eficiencia_sat=document.getElementById('eficisate1').value;
	
	    arrayValores[0]=distancia;
		arrayValores[1]=frecuencia;
		arrayValores[2]=eficiencia_sat;
		
		arrayIds[0]='distmts';
		arrayIds[1]='frecuehz';
		arrayIds[2]='eficisate1';
	
	valido=validarCampoVacio(arrayValores,arrayIds);
if(valido==true){	
	
	eficiencia_sat=eficiencia_sat/100;
	var valor=eficiencia_sat*Math.pow((pi*distancia*frecuencia/velocidad_luz),2);
	var valordb=10*Math.log10(valor);
	valordb=valordb.toFixed(3);
	document.densidad.gain.value=valordb; //Colocamos el valor de ganancia en el input de densidad
	document.form_pire.gananc.value=valordb;//Colocamos el valor de ganancia en el input de PIRE
	
	valordbf=valordb.toString().concat(' db');
	calculos_result.fspldecibels=valordbf;
	localStorage["gtx"] =valordb;// esto sirve para guardar 
	document.getElementById("gainpx1").innerHTML=calculos_result.fspldecibels;
	//return valor;	
}	
}


function calculopotenciatx(){
document.getElementById("potenciatxup").innerHTML='';
var pot=document.getElementById('potenciatx').value;
var arrayValores= new Array();
	var arrayIds= new Array();
arrayIds[0]='potenciatx';
arrayValores[0]=pot;
 //alert(valido);
 valido=validarCampoVacio(arrayValores,arrayIds);

if (valido==true){
var potenciatotal=10*Math.log10(pot);
potenciafixed=potenciatotal.toFixed(3);
potenciastring=potenciafixed.toString().concat(' db');
document.form_pire.potx.value=potenciafixed;
document.densidad.potantena.value=potenciafixed;
localStorage["potx"]=potenciafixed;
	document.getElementById("potenciatxup").innerHTML=potenciastring;
}
}


function calculopotenciatxdown(){
document.getElementById("potenciatxdown").innerHTML='';
var pot=document.getElementById('downpotenciatx').value;
var arrayValores= new Array();
	var arrayIds= new Array();
arrayIds[0]='potenciatxdown';
arrayValores[0]=pot;
 //alert(valido);
 valido=validarCampoVacio(arrayValores,arrayIds);

if (valido==true){
var potenciatotal=10*Math.log10(pot);
potenciafixed=potenciatotal.toFixed(3);
potenciastring=potenciafixed.toString().concat(' db');
document.formpiredown.potxdown.value=potenciafixed;
document.densidaddown.potantenadown.value=potenciafixed;
localStorage["potxdown"]=potenciafixed;
	document.getElementById("potenciatxdown").innerHTML=potenciastring;
}
}



//Calculadora EIRP
/* http://www.pasternack.com/t-calculator-eirp.aspx */
function getPire(){
	document.getElementById("valpire").innerHTML='';
	var potenciatx=document.getElementById('potx').value;
	var ganancia=document.getElementById('gananc').value;
	//var losscable=document.getElementById('lossc').value;
var arrayValores= new Array();
	var arrayIds= new Array();
	
	arrayIds[0]='potx';
	arrayIds[1]='gananc';
	
	arrayValores[0]=potenciatx;
	arrayValores[1]=ganancia;

  valido=validarCampoVacio(arrayValores,arrayIds);
  
  if (valido==true){
	//indice=document.form_pire.units.selectedIndex; 
	//unidad=document.form_pire.units.options[indice].value;
	var potenciafinal=potenciatx;
	//alert(potenciafinal);
	potenciafinal1=potenciafinal*1;
	//document.densidad.potantena.value=potenciafinal1;
	//losscable1=losscable*1;
	ganancia1=ganancia*1;
	var val_pire=potenciafinal1+ganancia1;
	//-losscable;
	val_pire=val_pire.toFixed(3);
	//document.formirl.irlpire.value=val_pire;
	calculos_result.pire=val_pire;
	localStorage["pire"]=calculos_result.pire;
	document.getElementById("valpire").innerHTML=calculos_result.pire.concat(' db');;



//return pire;
}
}


/* Power Density Calculator
 * http://www.pasternack.com/t-calculator-power-density.aspx
 *     */

function densidadmaxima(){
	document.getElementById('valdensity').innerHTML='';
	var pi=Math.PI;
	var potenciatx=document.getElementById('potantena').value;
	var ganancia=document.getElementById('gain').value;
	var distancia=document.getElementById('distancia').value;
	
	var arrayValores= new Array();
	var arrayIds= new Array();
	
	arrayIds[0]='potantena';
	arrayIds[1]='gain';
	arrayIds[2]='distancia';
	
	arrayValores[0]=potenciatx;
	arrayValores[1]=ganancia;
	arrayValores[2]=distancia;
	

  valido=validarCampoVacio(arrayValores,arrayIds);
	
	if(valido==true){
	var val1=4*pi*Math.pow(distancia,2);
	var val2=potenciatx*ganancia;
	var val3=val2/val1;
	//alert(val3);
	var valfin=10*Math.log10(val3);
	//var val_densidad=(potenciatx*ganancia/4*pi*Math.pow(distancia,2));
	val4=valfin.toFixed(3);
	//alert(val3);
	localStorage["density"]=val4;
	//valor3f=val3.toString().concat(' Watts/mts'.concat('2'.sup()));//.concat('2').sup();
	val4f=val4.toString().concat(' db');
	calculos_result.densidad=val4f;
	document.getElementById('valdensity').innerHTML=calculos_result.densidad;
}
}

function irlDown(){
	document.getElementById('valirldown').innerHTML='';
	//var pi=Math.PI;
	var pire=document.getElementById('irlpiredown').value;
	var fsl=document.getElementById('irlfsldown').value;
	
	var arrayValores= new Array();
	var arrayIds= new Array();
	
	arrayIds[0]='irlpiredown';
	arrayIds[1]='irlfsldown';
	
	arrayValores[0]=pire;
	arrayValores[1]=fsl;
	

  valido=validarCampoVacio(arrayValores,arrayIds);
	
	if(valido==true){
	val_irl=pire-fsl;
	
	val_irl1=val_irl.toFixed(3);
	//alert(val3);
	localStorage["irldown"]=val_irl1;
	//valor3f=val3.toString().concat(' Watts/mts'.concat('2'.sup()));//.concat('2').sup();
	valor=val_irl1.toString().concat(' db');
	document.getElementById('valirldown').innerHTML=valor;
}
}





function irlup(){
	document.getElementById('valirlup').innerHTML='';
	//var pi=Math.PI;
	var pire=document.getElementById('irlpire').value;
	var fsl=document.getElementById('irlfsl').value;
	
	var arrayValores= new Array();
	var arrayIds= new Array();
	
	arrayIds[0]='irlpire';
	arrayIds[1]='irlfsl';
	
	arrayValores[0]=pire;
	arrayValores[1]=fsl;
	

  valido=validarCampoVacio(arrayValores,arrayIds);
	
	if(valido==true){
	val_irl=pire-fsl;
	
	val_irl1=val_irl.toFixed(3);
	//alert(val3);
	localStorage["irl"]=val_irl1;
	//valor3f=val3.toString().concat(' Watts/mts'.concat('2'.sup()));//.concat('2').sup();
	valor=val_irl1.toString().concat(' db');
	document.getElementById('valirlup').innerHTML=valor;
}
}



//Funcion que esta en el punto 5
function fsl_segundo(){
	document.getElementById('vfsl1').innerHTML='';
	var distancia_kms=document.getElementById('distancia1').value;

	
	var frecuencia_mhz=document.getElementById('frecuencia1').value;
	
	var arrayValores= new Array();
	var arrayIds= new Array();
	
	arrayIds[0]='fsldistancia';
	arrayIds[1]='fslfrecuencia';
	
	arrayValores[0]=distancia_kms;
	arrayValores[1]=frecuencia_mhz;

  valido=validarCampoVacio(arrayValores,arrayIds);
	
	if(valido==true){	
	var valor = 20*Math.log10(distancia_kms)+20*Math.log10(frecuencia_mhz)+32.45;
	valor=valor.toFixed(3);
	localStorage["fsl"]=valor;
	valorf=valor.toString().concat(' db');
	calculos_result.fsl1=valorf;
	//document.formirl.irlfsl.value=valor;
	document.getElementById('vfsl1').innerHTML=calculos_result.fsl1;
	}
//return valor;
	
}

function conversion_longitud(valor,unidad){
	if (unidad=="Kms"){
		result=valor*1;
	}
	if (unidad=="Meters"){
		result=valor*0.001;
	}
	
	if (unidad=="Miles"){
		result=valor*1.60934;
	}
	
	if (unidad=="Feet"){
		result=valor*0.0003048;
	}
	
	return result;
}
//punto 6
function ganancia_antena_receptora(){
	document.getElementById('gainpx').innerHTML='';

	valmts=document.getElementById('distpies').value;
	frecuencia=document.getElementById('frecuemhz').value;
	eficiencia_sat=document.getElementById('eficisate2').value;
	
	var arrayValores= new Array();
	var arrayIds= new Array();
	
	arrayIds[0]='distpies';
	arrayIds[1]='frecuemhz';
	arrayIds[2]='eficisate2';
	
	arrayValores[0]=valmts;
	arrayValores[1]=frecuencia;
	arrayValores[2]=eficiencia_sat;
	
	  valido=validarCampoVacio(arrayValores,arrayIds);
	if(valido==true){
	eficiencia_sat=eficiencia_sat/100;
	//alert(eficiencia_sat);
	var gp1=20*Math.log10(valmts)+20*Math.log10(frecuencia)+10*Math.log10(eficiencia_sat)- 49.92;
	
	var gpx=gp1;
	 gpx=gpx.toFixed(3);
	 localStorage["grx"]=gpx;
    gpxf=gpx.toString().concat(' dbi');
    calculos_result.gan_anten_reci=gpxf;
    //localStorage["gain_recep"]=calculos_result.gan_anten_reci;
	document.form_potrecept.ganancia_recept.value=gpx;
	document.form_figura.gain2.value=gpx;
	document.getElementById('gainpx').innerHTML=calculos_result.gan_anten_reci;
	}
//return gpx;	 
}



//punto 7
function potencia_recepcion(){
	//var psl=pire+(-fsl)+gpx;
	document.getElementById('gainrecept').innerHTML='';
		pire=document.getElementById('pire').value;
	fsl=document.getElementById('perdida').value;
	gpx=document.getElementById('ganancia_recept').value;

	
	var arrayValores= new Array();
	var arrayIds= new Array();
	
	arrayIds[0]='pire';
	arrayIds[1]='perdida';
	arrayIds[2]='ganancia_recept';
	
	arrayValores[0]=pire;
	arrayValores[1]=fsl;
	arrayValores[2]=gpx;
	
	  valido=validarCampoVacio(arrayValores,arrayIds);
	
	if(valido==true){
	pire1=pire*1;
	fsl1=fsl*1;
	gpx1=gpx*1;
	var psl=pire1+(-fsl1)+gpx1;
	psl1=psl.toFixed(3);
	calculos_result.pot_recept=psl1;
	localStorage["rsl"]=psl1;
	pslstr=psl1.toString().concat(' db');
	document.getElementById('gainrecept').innerHTML=pslstr;
	//return psl;
	}
}
function pasar(){
    window.location="up-two.html";
	//document.form_potrecept.pire.value=localStorage["pire"];
	//document.form_potrecept.perdida.value=localStorage["fsl"];
	//document.getElementById('pire').value=localStorage["pire"];
	//document.getElementById('perdida').value=localStorage["fsl"];
	//document.getElementById('ganancia_recept').value=localStorage["gain_recep"];
}
function carga(){
	document.form_potrecept.pire.value=localStorage["pire"];
	document.form_potrecept.perdida.value=localStorage["fsl"];
	document.form_cnr.pirecnr.value=localStorage["pire"];
	document.form_cnr.perdidacnr.value=localStorage["fsl"];
	document.formirl.irlpire.value=localStorage["pire"];
	document.formirl.irlfsl.value=localStorage["fsl"];
}

function cargadown(){
	document.formpotreceptdown.piredown.value=localStorage["piredown"];
	document.formpotreceptdown.perdidadown.value=localStorage["fsldown"];
	document.formcnrdown.pirecnrdown.value=localStorage["piredown"];
	document.formcnrdown.perdidacnrdown.value=localStorage["fsldown"];
	document.formirldown.irlpiredown.value=localStorage["piredown"];
	document.formirldown.irlfsldown.value=localStorage["fsldown"];
}


//Aqui cargamos los datos en la tabla1
function carga_resultados_up(){
	//alert(localStorage["irl"]);
	document.getElementById('gtxresult').innerHTML=localStorage["gtx"].toString().concat(" Db");
	document.getElementById('ptxresult').innerHTML= localStorage["potx"].toString().concat(" Db");
	document.getElementById('pireresult').innerHTML=localStorage["pire"].toString().concat("Db");
	document.getElementById('densidadresult').innerHTML=localStorage["density"].toString().concat("Db");
document.getElementById('fslresult').innerHTML=localStorage["fsl"].toString().concat("Db");
document.getElementById('irlresult').innerHTML= localStorage["irl"].toString().concat("Db");
document.getElementById('grxresult').innerHTML= localStorage["grx"].toString().concat("Db");
document.getElementById('rslresult').innerHTML= localStorage["rsl"].toString().concat("Db");
document.getElementById('gtresult').innerHTML= localStorage["gt"].toString().concat("Db");
document.getElementById('cnresult').innerHTML= localStorage["cn"].toString().concat("Db");

	
}

function cargaResultadosDown(){
	document.getElementById('ptxresultup').innerHTML=localStorage["potx"];
	document.getElementById('ptxresultdown').innerHTML=localStorage["potxdown"];
	document.getElementById('gtxresultdown').innerHTML=localStorage["gtxdown"];
	document.getElementById('pireresultdown').innerHTML=localStorage["piredown"];
	document.getElementById('densidadresultdown').innerHTML=localStorage["densitydown"];
document.getElementById('fslresultdown').innerHTML=localStorage["fsldown"];
document.getElementById('grxresultdown').innerHTML= localStorage["grxdown"];
document.getElementById('rslresultdown').innerHTML= localStorage["rsldown"];
document.getElementById('gtresultdown').innerHTML= localStorage["gtdown"];
document.getElementById('cnresultdown').innerHTML= localStorage["cndown"];
document.getElementById('irlresult').innerHTML= localStorage["irl"];
document.getElementById('irlresultdown').innerHTML= localStorage["irldown"];
document.getElementById('gtxresultup').innerHTML=localStorage["gtx"];
	document.getElementById('pireresultup').innerHTML=localStorage["pire"];
	document.getElementById('densidadresultup').innerHTML=localStorage["density"];
document.getElementById('fslresultup').innerHTML=localStorage["fsl"];
document.getElementById('grxresultup').innerHTML= localStorage["grx"];
document.getElementById('rslresultup').innerHTML= localStorage["rsl"];
document.getElementById('gtresultup').innerHTML= localStorage["gt"];
document.getElementById('cnresultup').innerHTML= localStorage["cn"];
	
}


//punto 8 
//calculamos figura merito
function calculo_figura(){
	document.getElementById('figuramerito').innerHTML='';	
	gprec=document.getElementById('gain2').value;
	temperatura=document.getElementById('temp').value;
	
	
	var arrayValores= new Array();
	var arrayIds= new Array();
	
	arrayIds[0]='gain2';
	arrayIds[1]='temp';

	
	arrayValores[0]=gprec;
	arrayValores[1]=temperatura;
	
	
	  valido=validarCampoVacio(arrayValores,arrayIds);
	if(valido==true){
	var calc_figura=gprec-10*Math.log10(temperatura);
	calc_figura1=calc_figura.toFixed(3);
	figurastr=calc_figura1.toString().concat(' db/k');
	localStorage["gt"]=calc_figura1;
	document.form_cnr.figuracnr.value=calc_figura1;
	document.getElementById('figuramerito').innerHTML=figurastr;
	//return calc_figura;
	}
}


function last(){
	 document.getElementById('valcnr').innerHTML='';
	var k=Math.pow(10,-23);
	pirecnr=document.getElementById('pirecnr').value;
	fslcnr=document.getElementById('perdidacnr').value;
	figuracnr=document.getElementById('figuracnr').value;
	
var arrayValores= new Array();
	var arrayIds= new Array();
	
	arrayIds[0]='pirecnr';
	arrayIds[1]='perdidacnr';
	arrayIds[2]='figuracnr';

	
	arrayValores[0]=pirecnr;
	arrayValores[1]=fslcnr;
	arrayValores[2]=figuracnr;
	
	
	  valido=validarCampoVacio(arrayValores,arrayIds);	
	
	if(valido==true){
var boltzman=1.3806*k;
pirecnr1=pirecnr*1;
fslcnr1=fslcnr*1;
figuracnr1=figuracnr*1;
boltzman1=boltzman*1;

 var cnr=pirecnr1-fslcnr1+figuracnr1-boltzman1;
 cnrfin=cnr.toFixed(3);
 localStorage["cn"]=cnrfin;
 cnrstr=cnrfin.toString().concat(' db/Hz');
 document.getElementById('valcnr').innerHTML=cnrstr;
	}
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


function escala_watts(valor, unidad){
	if(unidad=="Watts"){
		var valortotal=valor*1;
	}

	if(unidad=="Miliwatts"){
		var valortotal=valor*1000;
	}	


	if(unidad=="dBm"){
		var valortotal=10*Math.log10(1000*valor);
	}

	if(unidad=="dbw"){
		var valortotal=10*Math.log10(valor);
	}

	return valortotal;
}

function conversor(valor){
	valorstr=valor.toString().replace('.',',');
	return valorstr;
}

function gananciaAntenaBajando(){
	document.getElementById('antenareceptora').innerHTML='';
	var pi=Math.PI;
	var valorsatelital=document.getElementById('satelitedown').value;
	var satelitedown=valorsatelital/100;
	var anguloreceptor=document.getElementById('anguloantena').value;
	
	var arrayValores= new Array();
	var arrayIds= new Array();
	
	arrayIds[0]='satelitedown';
	arrayIds[1]='anguloantena';

	
	arrayValores[0]=valorsatelital;
	arrayValores[1]=anguloreceptor;
	
	
	  valido=validarCampoVacio(arrayValores,arrayIds);	
	
	if(valido==true){
	var gain=Math.pow(70*pi/anguloreceptor,2);
	gainres=gain*satelitedown;
	gainfinal1=10*Math.log10(gainres);
	gainfinal=gainfinal1.toFixed(3);
	document.formpiredown.ganancdown.value=gainfinal;
	document.densidaddown.gaindown.value=gainfinal;
	gainfinalstr=gainfinal.toString().concat(' dbi');
	localStorage["gtxdown"] =gainfinal;// esto sirve para guardar 
	document.getElementById('antenareceptora').innerHTML=gainfinalstr;
	}
}

function getPireDown(){
	document.getElementById("valpiredown").innerHTML='';
	var potenciatx=document.getElementById('potxdown').value;
	var ganancia=document.getElementById('ganancdown').value;

var arrayValores= new Array();
	var arrayIds= new Array();
	
	arrayIds[0]='potxdown';
	arrayIds[1]='ganancdown';

	
	arrayValores[0]=potenciatx;
	arrayValores[1]=ganancia;
	
	
	  valido=validarCampoVacio(arrayValores,arrayIds);	
if(valido==true){
	//indice=document.formpiredown.units.selectedIndex; 
	//unidad=document.formpiredown.units.options[indice].value;
	var potenciafinal=potenciatx;
    //alert(potenciafinal);
   //document.densidaddown.potantenadown.value=potenciafinal.toFixed(3);
	potenciafinal1=potenciafinal*1;
	//losscable1=losscable*1;
	ganancia1=ganancia*1;
	var val_pire=potenciafinal1+ganancia1;
	//-losscable;
	val_pire=val_pire.toFixed(3);
	//document.formirldown.irlpiredown.value=val_pire;
	localStorage["piredown"]=val_pire;
	document.getElementById("valpiredown").innerHTML=val_pire;

}
//return pire;

}

function densidadMaximaDown(){
	var pi=Math.PI;
		document.getElementById('valdensitydown').innerHTML='';
	var potenciatx=document.getElementById('potantenadown').value;
	var ganancia=document.getElementById('gaindown').value;
	var distancia=document.getElementById('distanciadown').value;
	
	var arrayValores= new Array();
	var arrayIds= new Array();
	
	arrayIds[0]='potantenadown';
	arrayIds[1]='gaindown';
arrayIds[2]='distanciadown';
	
	arrayValores[0]=potenciatx;
	arrayValores[1]=ganancia;
	arrayValores[2]=distancia;
	
	  valido=validarCampoVacio(arrayValores,arrayIds);	
	if(valido==true){
	var val1=4*pi*Math.pow(distancia,2);
	var val2=potenciatx*ganancia;
	var val3=val2/val1;
	var valfin=10*Math.log10(val3);
	//var val_densidad=(potenciatx*ganancia/4*pi*Math.pow(distancia,2));
	val4=valfin.toFixed(3);
	//alert(val3);
	localStorage["densitydown"]=val4;
	//valor3f=val3.toString().concat(' Watts/mts'.concat('2'.sup()));//.concat('2').sup();
	//calculos_result.densidad=val4;
	document.getElementById('valdensitydown').innerHTML=val4;
}
}

function fslDown(){
	document.getElementById('vfsl1down').innerHTML='';
	var distancia_kms=document.getElementById('distancia1down').value;
		
	var frecuencia_mhz=document.getElementById('frecuencia1down').value;
	var arrayValores= new Array();
	var arrayIds= new Array();
	
	arrayIds[0]='distancia1down';
	arrayIds[1]='frecuencia1down';

	
	arrayValores[0]=distancia_kms;
	arrayValores[1]=frecuencia_mhz;
	  valido=validarCampoVacio(arrayValores,arrayIds);
	  
	  if(valido==true){
	  
	var valor = 20*Math.log10(distancia_kms)+20*Math.log10(frecuencia_mhz)+32.45;
	valor=valor.toFixed(3);
	//document.formirldown.irlfsldown.value=valor;
	localStorage["fsldown"]=valor;
	valorf=valor.toString().concat(' db');
	//calculos_result.fsl1=valorf;
	document.getElementById('vfsl1down').innerHTML=valorf;
//return valor;
}	
}

function gananciaAntenaReceptoraDown(){
	document.getElementById('gainpxdown').innerHTML='';
	valmts=document.getElementById('distpiesdown').value;
	frecuencia=document.getElementById('frecuemhzdown').value;
	eficiencia_sat=document.getElementById('eficisate2down').value;
	
	var arrayValores= new Array();
	var arrayIds= new Array();
	
	arrayIds[0]='distpiesdown';
	arrayIds[1]='frecuemhzdown';
	arrayIds[2]='eficisate2down';
	
	arrayValores[0]=valmts;
	arrayValores[1]=frecuencia;
	arrayValores[2]=eficiencia_sat;
	  valido=validarCampoVacio(arrayValores,arrayIds);
	if(valido==true){
	eficiencia_sat=eficiencia_sat/100;
	//alert(eficiencia_sat);
	var gp1=20*Math.log10(valmts)+20*Math.log10(frecuencia)+10*Math.log10(eficiencia_sat)- 49.92;
	
	var gpx=gp1;
	 gpx=gpx.toFixed(3);
	 localStorage["grxdown"]=gpx;
    gpxf=gpx.toString().concat(' dbi');
    //calculos_result.gan_anten_reci=gpxf;
    //localStorage["gain_recep"]=calculos_result.gan_anten_reci;
	document.formpotreceptdown.gananciareceptdown.value=gpx;
	document.formfiguradown.gain2down.value=gpx;
	document.getElementById('gainpxdown').innerHTML=gpxf;
	}
}

function potenciaRecepcionDown(){
	document.getElementById('gainreceptdown').innerHTML='';
	pire=document.getElementById('piredown').value;
	fsl=document.getElementById('perdidadown').value;
	gpx=document.getElementById('gananciareceptdown').value;

	
	var arrayValores= new Array();
	var arrayIds= new Array();
	
	arrayIds[0]='piredown';
	arrayIds[1]='perdidadown';
	arrayIds[2]='gananciareceptdown';
	
	arrayValores[0]=pire;
	arrayValores[1]=fsl;
	arrayValores[2]=gpx;
	  valido=validarCampoVacio(arrayValores,arrayIds);
	
	if(valido==true){
	pire1=pire*1;
	fsl1=fsl*1;
	gpx1=gpx*1;
	var psl=pire1+(-fsl1)+gpx1;
	psl1=psl.toFixed(3);
	calculos_result.pot_recept=psl1;
	localStorage["rsldown"]=psl1;
	pslstr=psl1.toString().concat(' db');
	document.getElementById('gainreceptdown').innerHTML=pslstr;
	//return psl;
	}
}

function calculoFiguraDown(){
	document.getElementById('figurameritodown').innerHTML='';
	gprec=document.getElementById('gain2down').value;
	temperatura=document.getElementById('tempdown').value;
	var arrayValores= new Array();
	var arrayIds= new Array();
	
	arrayIds[0]='gain2down';
	arrayIds[1]='tempdown';
	
	arrayValores[0]=gprec;
	arrayValores[1]=temperatura;
	
	  valido=validarCampoVacio(arrayValores,arrayIds);
	if(valido==true){
	
	var calc_figura=gprec-10*Math.log10(temperatura);
	calc_figura1=calc_figura.toFixed(3);
	figurastr=calc_figura1.toString().concat(' db/k');
	localStorage["gtdown"]=calc_figura1;
	document.formcnrdown.figuracnrdown.value=calc_figura1;
	document.getElementById('figurameritodown').innerHTML=figurastr;
	//return calc_figura;
	}
}

function lastDown(){
	var k=Math.pow(10,-23);
	pirecnr=document.getElementById('pirecnrdown').value;
	fslcnr=document.getElementById('perdidacnrdown').value;
	figuracnr=document.getElementById('figuracnrdown').value;

    var arrayValores= new Array();
	var arrayIds= new Array();
	
	arrayIds[0]='pirecnrdown';
	arrayIds[1]='perdidacnrdown';
	arrayIds[2]='figuracnrdown';
		
	arrayValores[0]=pirecnr;
	arrayValores[1]=fslcnr;
	arrayValores[2]=figuracnr;
	
	  valido=validarCampoVacio(arrayValores,arrayIds);	
	if(valido==true){
var boltzman=1.3806*k;
pirecnr1=pirecnr*1;
fslcnr1=fslcnr*1;
figuracnr1=figuracnr*1;
boltzmanwatts=10*Math.log10(boltzman);
boltzman1=boltzmanwatts*1;
 var cnr=pirecnr1-fslcnr1+figuracnr1-boltzman1;
 cnrfin=cnr.toFixed(3);
 localStorage["cndown"]=cnrfin;
 cnrstr=cnrfin.toString().concat(' db');
 document.getElementById('valcnrdown').innerHTML=cnrstr;
	}
}

