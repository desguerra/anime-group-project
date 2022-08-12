/** SEARCH BAR SECTION **/

var searchBarFormEl = document.querySelector("#search-bar-form"); // <form> ID
var animeInputEl = document.querySelector("#anime-title"); // form <input> id
var searchBarResEl = document.querySelector("#search-bar-results"); // search results <div> id

var getAnimeData = function(title) {
    var animeNewsUrl = "https://cdn.animenewsnetwork.com/encyclopedia/api.xml?title=~" + title;

    fetch(animeNewsUrl).then(function(res) {
        if (res.ok) {
            // parse XML data
            res.text().then(function(data) {
                var parser = new DOMParser();
                var xml = parser.parseFromString(data, "text/xml");
                console.log(xml);
            });
        } 
        else {
            alert("Error: GitHub User Not Found");
        }
    })
    
    .catch(function(error) {
        // chain `.catch()` onto the end of the `.then()` method
        alert("Unable to connect to GitHub");
    });

};

var formSubmitHandler = function(event) {
    event.preventDefault();

    var animeTitle = animeInputEl.value.trim();

    if (animeTitle) {
        getAnimeData(animeTitle);

        // reset form
        animeInputEl.value = "";
    }
    else {
        // TODO: TURN THIS PLACEHOLDER INTO A MODAL!!!!!!!!!!!!
        console.log("please enter an anime title!!!!!!");
    }

};

searchBarFormEl.addEventListener("submit", formSubmitHandler);
