/** SEARCH BAR SECTION **/

var searchBarFormEl = document.querySelector("#search-bar-form"); // <form> ID
var animeInputEl = document.querySelector("#anime-title"); // form <input> id
var searchBarResEl = document.querySelector("#search-bar-results"); // search results <div> id

var getFranchiseData = function(title) {
    var franNewsUrl = "https://cdn.animenewsnetwork.com/encyclopedia/api.xml?title=~" + title;

    fetch(franNewsUrl).then(function(res) {
        if (res.ok) {
            // parse XML data
            res.text().then(function(data) {
                var parser = new DOMParser();
                var xml = parser.parseFromString(data, "text/xml");

                // testing XML data output //
                console.log(xml);

                displayTitleData(xml);

            });
        } 
        else {
            alert("Error: Anime title Not Found");
        }
    })
    
    .catch(function(error) {
        alert("Unable to connect to Anime News Network");
    });

};

var displayTitleData = function(data) {
    
    var animeTag = data.getElementsByTagName("anime");
    for (var i = 0; i < animeTag.length; i++) { 

        var animeTVType = animeTag[i].getAttribute("type");
        if (animeTVType == "TV") {

            var animeTitle = animeTag[i].getElementsByTagName("info")[1].textContent;
            console.log(animeTitle);

            // get ID of only the anime
            // var animeID = animeTag[i].getAttribute("id");
            // console.log(animeID);

        }
    };

};

var formSubmitHandler = function(event) {
    event.preventDefault();

    var animeTitle = animeInputEl.value.trim();

    if (animeTitle) {
        getFranchiseData(animeTitle);

        // reset form
        animeInputEl.value = "";
    }
    else {
        // TODO: TURN THIS PLACEHOLDER INTO A MODAL!!!!!!!!!!!!
        console.log("please enter an anime title!!!!!!");
    }

};

searchBarFormEl.addEventListener("submit", formSubmitHandler);
