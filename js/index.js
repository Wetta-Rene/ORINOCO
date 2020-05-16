 ////////////////////////////////////////////////////// AFFICHAGE CONTENU DU HEADER ////////////////////////////////////////////////////
        var contenuHeader = fonctionAffichageHeader();
        document.getElementById("header").innerHTML = contenuHeader;
        ///////////////////////////////////////////////////////////  END /////////////////////////////////////////////////////////////////
        /////////////////  MESSAGE PANIER ////////////////////////

        affichageMessageFlash(); // on affiche un message si besoin

        /////////////////////////////////////////////////////////// 
        /*nettoyage du div en cas de remplissage avant*/
        document.getElementById("resultats").innerHTML = "";

        // ici on peut changer de catalogue "manuellement"
        var catalogue = "teddies"; // ici on peut changer de catalogue cameras, teddies, furniture


        /*requette XML vers le backend pour la page index.html */
        var xhttp;
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var response = JSON.parse(this.responseText);

                var Resultats = document.getElementById("resultats"); //affichage dans id > resultats

                for (var i = 0; i < response.length; i++) {
                    var objet = response[i];


                    var article =
                    '<article class="containerArticle">'+
                        '<a href="produit.html?catalogue=' + catalogue + '&produit=' + objet._id + '">'+
                            '<div class="elementContainerArticle"><img src="' + objet.imageUrl + '" ></div>'+
                                '<div class="elementContainerArticle">'+
                                    '<div class="contentDescriptionArticle">'+
                                        '<h2>' + objet.name + '</h2>'+
                                        '<div class="textDescription">' + objet.description + '</div>'+
                                    '</div>'+
                                '</div>'+
                        '</a>'+
                    '</article>';

                    // affichage des differents article
                    Resultats.innerHTML += article;

                }

            } //fin du if readyState
        };
        xhttp.open("GET", "http://localhost:3000/api/" + catalogue, true);
        xhttp.send();


        //////////////////// SWITCH TITRE DE LA PAGE EN FONCTION DE LA REQUETTE////////////////
        var contenuH1 = "";
        switch (catalogue) {
            case "teddies":
                contenuH1 = "LES NOUNOURS";
                break;
            case "cameras":
                contenuH1 = "LES CAMERAS VINTAGE";
                break;
            case "furniture":
                contenuH1 = "LES MEUBLES ANCIENS";
                break;
        }
        console.log(contenuH1);
        document.getElementById("baliseH1").innerHTML = contenuH1;
        ////////////////////////////////////////// END ///////////////////////////////////////////