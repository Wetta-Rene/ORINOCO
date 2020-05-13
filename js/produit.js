 ////////////////////////////////////////////////////// AFFICHAGE CONTENU DU HEADER ////////////////////////////////////////////////////
        var contenuHeader = fonctionAffichageHeader();
        document.getElementById("header").innerHTML = contenuHeader;
        ///////////////////////////////////////////////////////////  END /////////////////////////////////////////////////////////////////

        ///////////////////////////////////////////////////////////////  MESSAGE PANIER ///////////////////////////////////////////////

        affichageMessageFlash(); // on affiche un message si besoin

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // quelque variables utiles pour la formation de la page html
        const urlComplete = window.location.href; //recupere l'url
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString); //recupere apres le ? de l'url
        const catalogue = urlParams.get('catalogue'); //recupere catalogue
        const idProduit = urlParams.get('produit'); // recupere produit

        //on fait un switch pour la premiere propriete "colors, lenses, varnish   
        let propertyOne = "";
        switch (catalogue) {
            case "teddies":
                propertyOne = "colors";
                break;
            case "cameras":
                propertyOne = "lenses";
                break;
            case "furniture":
                propertyOne = "varnish";
                break;
        }
        //on verifie que les variables existent
        /*requette XML vers le backend pour la page index.html */

        let xhttp;
        if (catalogue == "") {
            document.getElementById("resultats").innerHTML = "";
        }
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let response = JSON.parse(this.responseText);
                // on boucle la premiere propriete /

                var options = response[propertyOne]; // propertyOne transmet sa valeur a options

                var selectOptions = "";
                for (let x in options) {
                    selectOptions += '<option value="' + options[x] + '">' + options[x] + '</option>';
                }
                ///////////////////// modification nombre de quantite possible/////////////////
                var selectOptionsQuantite = "";
                for (y = 1; y < 11; y++) {
                    selectOptionsQuantite += '<option value="' + y + '">' + y + '</option>';
                }
                ///////////////////// END  /////////////////

                let article = '<article class="containerArticlePageProduit"><div class="elementContainerArticle"><img src="' + response.imageUrl + '" ></div><div class="elementContainerArticle"><div class="contentDescriptionArticle"><h2>' + response.name + '</h2><div class="textDescription">' + response.description + '</div><div class="divPrix">Prix: ' + transformPrice(response.price) + ' Euro</div><div id="selectOptionProduit"><form onsubmit="return fonctionSubmitProduit()" id="FormProduit"><label>Quantité: </label><label><select name="quantite" id="quantite">' + selectOptionsQuantite + '</select></label><label> Option: </label><label><select name="option" id="option">' + selectOptions + '</select></label><input type="hidden" name="id" id="id" value="' + idProduit + '"><input type="hidden" name="urlRetour" id="urlRetour" value="' + urlComplete + '"><input type="hidden" name="name" id="name" value="' + response.name + '"><input type="hidden" name="description" id="description" value="' + response.description + '"><input type="hidden" name="prix" id="prix" value="' + response.price + '"><input type="hidden" name="urlImage" id="urlImage" value="' + response.imageUrl + '"><input type="hidden" name="catalogue" id="catalogue" value="' + catalogue + '"><input type="submit" value="Mettre dans le panier" class="boutonSubmitProduit"/></form></div></div></div></div></article>';


                // affichage des details article
                let Resultats = document.getElementById("resultats"); //affichage dans id > resultats
                Resultats.innerHTML = article;



            } //fin du if readyState
        };
        xhttp.open("GET", "http://localhost:3000/api/" + catalogue + "/" + idProduit, true);
        xhttp.send();