 ////////////////////////////////////////////////////// AFFICHAGE CONTENU DU HEADER ////////////////////////////////////////////////////
        var contenuHeader = fonctionAffichageHeader();
        document.getElementById("header").innerHTML = contenuHeader;
        ///////////////////////////////////////////////////////////  END /////////////////////////////////////////////////////////////////

        ///////////////////////////////////////////////////////////////  MESSAGE PANIER ///////////////////////////////////////////////

        affichageMessageFlash(); // on affiche un message si besoin

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        if (localStorage.confirmCommande !== "KO") {
            document.getElementById("resultats").innerHTML = '<div class="messageConfirmationCommande"><p>Nous vous remercions pour votre commande n° ' + localStorage.confirmCommande + '</p><p>A bientôt...</p><p><a href="index.html"><i class="far fa-folder-open"></i></a></p></div>';
        } else {
            document.getElementById("resultats").innerHTML = '<div class="messageConfirmationCommande"><p>Oupss problème... Désolé !</p><p>Visitez notre catalogue...</p><p><i class="fas fa-arrow-alt-circle-down"></i></p><p><a href="index.html"><i class="far fa-folder-open"></i></a></p></div>';
        }