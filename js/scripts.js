/////////////////////////////// INITIALISATION D'UN PANIER    //////////////////////////////////////////////
if (localStorage.getItem("panier") === null) {
    localStorage.setItem("panier", "vide");
    localStorage.setItem("messagePanier", "vide");
}

////////////////////////////////////////// END ///////////////////////////////////////////////

///////////////////// FONCTIN CALCUL TOTAL DES ARTICLES DU PANIER ////////////////////////////
var functionCalculArticlesDuPanier = function () {
    var paniers = JSON.parse(localStorage.getItem("panier")); // on recupere le panier en local 
    var quantite = 0;
    for (let x in paniers) {
        quantite += parseInt(paniers[x].quantite);
    }

    return quantite;
}
////////////////////////////////////////// END ///////////////////////////////////////////////

///////////////////// FONCTION CALCUL TOTAL PRIX DU PANIER ////////////////////////////
var functionCalculPrixTotalDuPanier = function () {
    var paniers = JSON.parse(localStorage.getItem("panier")); // on recupere le panier en local 
    var tableauDeContageDesPrix = [];
    for (let x in paniers) {
        var lignePanier = paniers[x];
        tableauDeContageDesPrix.push(lignePanier.prixAjour);
    }
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const prixTotalDuPanier = tableauDeContageDesPrix.reduce(reducer);

    return prixTotalDuPanier;
}
////////////////////////////////////////// END ///////////////////////////////////////////////



///////////////////////////////   AFFICHAGE DU HEADER DES PAGES DU SITE    //////////////////////////////////////////////
var fonctionAffichageHeader = function () {
    let contenuHeader = null;
    if (localStorage.getItem("panier") === "vide") { // panier vide
        contenuHeader = '<button class="bouton"><a href="index.html">Accueil / Catalogue</a></button><button class="bouton"><a href="panier.html" title="0.00€">Panier (0 article)</a></button>';
    } else {
        const totalDesArticlesDuPanier = functionCalculArticlesDuPanier(); // on fait le calcul des articles
        const prixTotalDuPanier = functionCalculPrixTotalDuPanier(); // on fait le calcul total des prix du panier
        let plurielArticleBoutonPanier = "";
        if (totalDesArticlesDuPanier > 1) { // mettre S a article ou pas
            plurielArticleBoutonPanier = "articles";
        } else {
            plurielArticleBoutonPanier = "article";
        }

        contenuHeader = '<button><a href="index.html">Accueil / Catalogue</a></button><button><a href="panier.html" title="' + prixTotalDuPanier + '€">Panier (' + totalDesArticlesDuPanier + ' ' + plurielArticleBoutonPanier + ')</a></button><button onclick="fonctionClearPanier()">Vider le panier</button>';
    }

    return contenuHeader;
}

//////////////////////////////////////////////  END    ////////////////////////////////////////////////////

///////////////////////////////   AFFICHAGE EN EURO   ///////////////////////////////////////////
function transformPrice(price) {
    let price_string = price.toString();
    let partie_euro = price_string.slice(0, price_string.length - 2);
    let partie_centimes = price_string.slice(price_string.length - 2, price_string.length);
    let affichage = partie_euro + "." + partie_centimes;
    return affichage;
}
////////////////////////////////////////// END ///////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////// GESTION DU PANIER /////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////// MESSAGE FLASH UTILISATEUR  //////////////////////////////////////////////////
var affichageMessageFlash = function () {
    let message = localStorage.messagePanier;
    if (message != "vide") {
        let affichageMessageFlash = '<div id="textFlashMessage">' + message + '</div>';
        document.getElementById("flashMessage").innerHTML = '<div id="textFlashMessage">' + message + '</div>';
    }
    localStorage.messagePanier = "vide"; // on remet vide en cas de rechargement de la page
}

//////////////////////////////////////////// SUPPRIMER UN PRODUIT ////////////////////////////////////////////
let fonctionDelete = function (a) { // supprimer un produit du panier
    var data = JSON.parse(localStorage.getItem("panier")); // on recupere le panier en local
    if (data.length == 1) { // on va supprimer le dernier produit
        localStorage.removeItem("panier");
        localStorage.setItem("panier", "vide");
        localStorage.setItem("messagePanier", "Panier vidé !")
        window.location.href = "panier.html"; // on revient à la page d'acceuil */ 
    } else {
        localStorage.messagePanier = "Produit supprimé !"; // message utilisateur
        data.splice(a, 1); // on supprime l'objet correspondant
        localStorage.setItem("panier", JSON.stringify(data)); // Sauvegarde du panier mis à jour
        window.location.href = "panier.html"; // on revient à la page d'acceuil */ 
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////// MODIFICATION QUANTITE PLUS////////////////////////////////////////////

var fonctionQuantitePlus = function(a) {
    var data = JSON.parse(localStorage.getItem("panier")); // on recupere le panier en local

    // Sauvegarde du panier mis à jour
    //localStorage.setItem("panier", JSON.stringify(data));
    //window.location.href = "panier.html"; // on revient à la page du panier    
}
////////////////////////////////////////// END ///////////////////////////////////////////////
//////////////////////////// MODIFICATION QUANTITE MOINS////////////////////////////////////////////

var fonctionQuantiteMoins = function(a) {
    var data = JSON.parse(localStorage.getItem("panier")); // on recupere le panier en local 
    var produitTrouve = false;
    for (let x in data) {
        if (data[x] == a) {
            produitTrouve = true;
            // Augmenter la quantité et le prix
            data[x].quantite--;
            data[x].prixAjour = data[x].quantite * data[x].prixUnitaire;
        }
    }
    // Sauvegarde du panier mis à jour
    localStorage.setItem("panier", JSON.stringify(data));
    window.location.href = "panier.html"; // on revient à la page du panier    
}
////////////////////////////////////////// END ///////////////////////////////////////////////
//////////////////////////// VIDER LE PANIER PAR BOUTON DU HEADER ////////////////////////////////////////////

var fonctionClearPanier = function(){
    localStorage.panier = "vide"; // on met la valeur de panier a vide
    localStorage.messagePanier = "Panier vidé !";
    window.location.href = "index.html"; //et on va page accueil
}

//////////////////////////////////////////////////////////////// END GESTION DU PANIER /////////////////////////////////////////////////////////////////////


































