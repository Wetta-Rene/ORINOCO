
/////////////////////fonction calcul total des articles du pannier////////////////////////////
var functionCalculArticlesDuPanier = function(){
var paniers = JSON.parse(localStorage.getItem("panier")); // on recupere le panier en local 
var tableauDeContageArticle = [];
            for(let x in paniers) {
               var lignePanier = paniers[x] ;
                tableauDeContageArticle.push(lignePanier.quantite);
            }
    const reducer = (accumulator, currentValue) => accumulator + currentValue;// calcul sommes de chaque donnee du tableau
    const totalDesArticlesDuPanier = tableauDeContageArticle.reduce(reducer);
return totalDesArticlesDuPanier;
}

////////////////////////////////////////// END ///////////////////////////////////////////////

/////////////////////fonction calcul total des sommes  du pannier////////////////////////////
var functionCalculPrixTotalDuPanier = function(){
var paniers = JSON.parse(localStorage.getItem("panier")); // on recupere le panier en local 
var tableauDeContageDesPrix = [];
            for(let x in paniers) {
               var lignePanier = paniers[x] ;
                tableauDeContageDesPrix.push(lignePanier.prixAjour);
            }
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const prixTotalDuPanier = tableauDeContageDesPrix.reduce(reducer);
return prixTotalDuPanier;
}
////////////////////////////////////////// END ///////////////////////////////////////////////

/////////////////////fonction calcul total des sommes  du pannier////////////////////////////

var fonctionActionPanier = function(a){
var data = JSON.parse(localStorage.getItem("panier")); // on recupere le panier en local 
 var produitTrouve = false;
            for(let x in data) {
                 if(data[x].reference == a){
                     produitTrouve = true;

                     // Augmenter la quantité et le prix
                     data[x].quantite++;
                     data[x].prixAjour = data[x].quantite * data[x].prixUnitaire;
                 }
            }
            // Sauvegarde du panier mis à jour
            localStorage.setItem("panier", JSON.stringify(data));
            window.location.href = "panier.html";// on revient à la page du panier   
    
}

 