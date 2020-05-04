
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
////////////////////////////////////////// END ///////////////////////////////////////////////

///////////////////////////////   Affichage à cote du bouton panier     //////////////////////////////////////////////
var fonctionAffichageHeader = function (){
let affichageCoteBoutonPanier = null;
if(localStorage.getItem("panier") === "vide"){// panier vide
     affichageCoteBoutonPanier = '<button><a href="index.html">Accueil</a></button><button><a href="panier.html" title="0.00€">Panier (0 article)</a></button>';  
 }else{
      const totalDesArticlesDuPanier = functionCalculArticlesDuPanier();// on fait le calcul des articles
      const prixTotalDuPanier = functionCalculPrixTotalDuPanier(); // on fait le calcul total des prix du panier
       let plurielArticleBoutonPanier = "";
        if(totalDesArticlesDuPanier > 1){// mettre S a article ou pas
            plurielArticleBoutonPanier = "articles";
        }else{
            plurielArticleBoutonPanier = "article";
        }
      affichageCoteBoutonPanier = '<button><a href="index.html">Accueil</a></button><button><a href="panier.html" title="'+prixTotalDuPanier+'€">Panier ('+totalDesArticlesDuPanier+' '+plurielArticleBoutonPanier+')</a></button>'; 
 }
return affichageCoteBoutonPanier;
}
     
 //////////////////////////////////////////////  END    ////////////////////////////////////////////////////
 