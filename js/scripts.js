var functionOpenLink = function (a) {
    window.open('http://localhost:3000/api/' + a, '_blank');
}

//ajouter dans le panier avec parametre a = catalogue et b = id
function fonctionConnexionHttp(a) {
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
                return response;
            }
    };
    
    xhttp.open("GET", "http://localhost:3000/api/" + a, true);
    xhttp.send();

}


function getHTTPObject()
{
  var xmlhttp = false;
  /* on essaie de créer l'objet si ce n'est pas déjà fait */
  if (!xmlhttp && typeof XMLHttpRequest != 'undefined')
  {
     try
     {
        xmlhttp = new XMLHttpRequest();
     }
     catch (e)
     {
        xmlhttp = false;
     }
  }

  if (xmlhttp)
  {
     /* on définit ce qui doit se passer quand la page répondra */
     xmlhttp.onreadystatechange=function()
     {
        if (xmlhttp.readyState == 4) /* 4 : état "complete" */
        {
           if (xmlhttp.status == 200) /* 200 : code HTTP pour OK */
           {
              /*
              Traitement de la réponse.
              Ici on affiche la réponse dans une boîte de dialogue.
              */
              alert(xmlhttp.responseText);
           }
        }
     }
  }
  return xmlhttp;
}

