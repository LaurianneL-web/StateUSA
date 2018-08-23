var app = (function () {
	"use strict";
    
	var displayDataset = function(records) {
        var input = document.getElementById("in");
		var list = document.getElementById("etats");
        //Suppression de tous les enfant de list tant qu'il y en a
        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }
        //Si il n'y a pas de saisie dans l'input on ajoute toute la liste
        if(input.value.length == 0){
            records.forEach(function(r) {
                var li = document.createElement("li");
                list.appendChild(li);
                li.textContent = `${r.name}`;
            });
        }
        //On filtre les objets si les nom des objets commencent par les lettres saisies dans l'input
        var listFiltered = records.filter(function(str){
            return str.name.toLowerCase().startsWith(input.value) == true;
        });
        //On ajoute nos li avec la liste des objets filtrés
		listFiltered.forEach(function(r) {
			var li = document.createElement("li");
			list.appendChild(li);
            li.textContent = `${r.name}`;
		});
	}
	
	var myFirstAjaxGet = function(url) {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", url);
		xhr.onload = function(evt) {
            var input = document.getElementById("in");
            var tab = JSON.parse(this.response);
            input.addEventListener("input", displayDataset.bind("ev",tab));
		};

		xhr.send();

	};

	var start = function () {

		var url = "./states.json";
        
		myFirstAjaxGet(url);
	};

	window.addEventListener("DOMContentLoaded", start);

}());