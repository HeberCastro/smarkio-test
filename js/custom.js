
	
function controller(){
	botao = document.getElementById('idButton');
	botao.addEventListener('click', function (){
		comentary = document.getElementById('comentary').value;
		addComentary(comentary);
		updateComentariesList();
	});

	var botoes = document.getElementsByClassName("btn-generate-sound");
	for(i=0; i<botoes.length; i++){
		botoes[i].addEventListener('click', getSound);
	}
}

function getSound(){
	const id = event.target.id;
	var xhttp = new XMLHttpRequest();
  	xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	      	alert(this.responseText);
	    }
  	};
  	xhttp.open("GET", "/sound/"+id, true);
  	xhttp.send();

}

function addComentary(comentary){
  	var xhttp = new XMLHttpRequest();
  	xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	      	updateComentariesList();
	    }
  	};
  	xhttp.open("POST", "", true);
  	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  	xhttp.send('comentary='+comentary);
}



function updateComentariesList(){
	var xhttp = new XMLHttpRequest();
  	xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	      	document.getElementById("idHtml").innerHTML = this.responseText;
	      	controller();
	    }
  	};
  	xhttp.open("GET", "/", true);
  	xhttp.send();	
}