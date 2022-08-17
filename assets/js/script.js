var apiUrl= "https://api.jikan.moe/v4/anime?q=&sfw";
var result = [];


function searchAnime(event){
    /*fetch anime data from Jikan */
    fetch(apiUrl).then(function(response){
     if(response.ok){
        response.json().then(function(data){
            
            /*Push data into an array */
            for(var i in data)
            result.push([i,data[i]]);

            /*selects a random number from 0 - length of array */
            var random = Math.floor(Math.random() * result[1][1].length)

            /* assigns variable to the element selected */
            var randomUrl = result[1][1][random].url;

            /* opens the URL in a new tab */
            window.open(randomUrl, '_blank').focus();
        });
     }
     else{
        alert("There was a problem with your request");
     }
    });
}



function pageLoaded(){
    const form=document.getElementById('random-button');
    form.addEventListener('click', searchAnime);
   
}
 window.addEventListener("load", pageLoaded);