/**
 * JEvents Component for Joomla 1.5.x
 *
 * @version     $Id$
 * @package     JEvents
 * @copyright   Copyright (C) 2008-2009 GWE Systems Ltd, 2006-2008 JEvents Project Group
 * @license     GNU/GPLv2, see http://www.gnu.org/licenses/gpl-2.0.html
 * @link        http://www.jevents.net
 */

var myFaderTimeout=null;
var interval=10000;
if (myFaderTimeout) clearTimeout(myFaderTimeout);

var opacities = new Array();
var increments = 10;
var pause = 50;
var currentOpacity = 0;

for (var i=0;i<=increments ;i++){
	opacities[i] = (i*1.0)/(increments*1.0);
}

function closeAllDialogs(){
	currentOpacity=0;
	if (myFaderTimeout) clearTimeout(myFaderTimeout);
	var myDiv = document.getElementById("action_dialog");
	if (myDiv) myDiv.style.visibility="hidden";
	var myDiv = document.getElementById("ical_dialog");
	if (myDiv) myDiv.style.visibility="hidden";	
}

function clickEditButton(){
	closeAllDialogs();
	if (currentOpacity<0) currentOpacity = 0;
	fadeIn("action_dialog");
}

function closedialog() {
	if (currentOpacity>opacities.length) currentOpacity =opacities.length;
	fadeOut("action_dialog");
}

function clickIcalButton(){
	closeAllDialogs();
	if (currentOpacity<0) currentOpacity = 0;
	fadeIn("ical_dialog");
}

function closeical() {
	if (currentOpacity>opacities.length) currentOpacity =opacities.length;
	fadeOut("ical_dialog");
}

function fadeIn(dlg) {
	var myDiv = document.getElementById(dlg);
	currentOpacity++;
	if (currentOpacity>=opacities.length){
		if (myFaderTimeout) clearTimeout(myFaderTimeout);
	}
	else {
		//window.status=opacities[currentOpacity];
		myDiv.style.opacity=opacities[currentOpacity];
		myDiv.style.filter="alpha(opacity="+(100*opacities[currentOpacity])+")";
		myDiv.style.visibility="visible";	
		if (myFaderTimeout) clearTimeout(myFaderTimeout);
		myFaderTimeout = setTimeout("fadeIn('"+dlg+"')",pause);
	}
}

function fadeOut(dlg) {
	var myDiv = document.getElementById(dlg);
	currentOpacity--;
	if (currentOpacity<=0){
		if (myFaderTimeout) clearTimeout(myFaderTimeout);
		myDiv.style.visibility="hidden";
	}
	else {
		myDiv.style.opacity=opacities[currentOpacity];
		//window.status = opacities[currentOpacity];
		myDiv.style.filter="alpha(opacity="+(100*opacities[currentOpacity])+")";
		if (myFaderTimeout) clearTimeout(myFaderTimeout);
		myFaderTimeout = setTimeout("fadeOut('"+dlg+"')",pause);
	}
}
