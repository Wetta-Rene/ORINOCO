var functionOpenLink = function (a) {
    window.open('http://localhost:3000/api/' + a, '_blank');
}


/*requette XML vers le backend pour la page index.html */
function showCustomer(catalogue) {
    /*nettoyage du div en cas de remplissage avant*/
    document.getElementById("resultats").innerHTML = "";
    var xhttp;
    if (catalogue == "") {
        document.getElementById("resultats").innerHTML = "";
        return;
    }
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);

            var Resultats = document.getElementById("resultats");

            for (var i = 0; i < response.length; i++){
                var objet = response[i];
                
                var article = '<article class="containerArticle"><div class="elementContainerArticle"><img src="'+ objet.imageUrl +'" ></div><div class="elementContainerArticle"><div class="contentDescriptionArticle"><h2>'+ objet.name +'</h2><div class="textDescription">'+ objet.description +'</div><div class="lienPageCustomArticle"><a href="produit.html?catalogue='+catalogue+'&produit='+[i]+'"> >> Personnalisé ce produit</a></div></div></div></article>';

                /*affichage des differents article*/
                Resultats.innerHTML += article;      

            }
            
        }//fin du if readyState
    };
    xhttp.open("GET", "http://localhost:3000/api/" + catalogue, true);
    xhttp.send();
}



/*requette XML vers le backend pour la page produit.html (index) */
