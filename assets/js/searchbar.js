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
            console.log("Anime data Not Found");
        }
    })
    
    .catch(function(error) {
        console.log("Unable to connect to Anime News Network");
    });

};

var displayAnimeData = function(event, data) {

    searchBarResEl.textContent = "";

    var animeTitleEl = document.createElement("h2");
    animeTitleEl.textContent = event.target.textContent;
    searchBarResEl.appendChild(animeTitleEl);

    var descBool = false;

    // TODO: GRAB AND DISPLAY DATA FROM API
    var animeTag = data.getElementsByTagName("anime");
    for (var i = 0; i < animeTag.length; i++) {
        var animeTVName = animeTag[i].getAttribute("name");
        var animeTVType = animeTag[i].getAttribute("type");

        if (animeTVName == animeTitleEl.textContent && animeTVType == "TV") {

            var animeInfoLength = animeTag[i].getElementsByTagName("info").length;
            for (var j = 0; j < animeInfoLength; j++) {
                if (animeTag[i].getElementsByTagName("info")[j].getAttribute("type") == "Plot Summary") {
                    var animePlotEl = document.createElement("h3");
                    animePlotEl.textContent = "Plot Summary";

                    searchBarResEl.appendChild(animePlotEl);

                    var animeDescription = animeTag[i].getElementsByTagName("info")[j].textContent;

                    var animeDescEl = document.createElement("div");
                    animeDescEl.textContent = animeDescription;
                    searchBarResEl.appendChild(animeDescEl);

                    descBool = true;
                    break;
                }
            };

            // if no plot summary was found
            if (!descBool) {
                var animePlotEl = document.createElement("h3");
                animePlotEl.textContent = "Plot Summary";

                searchBarResEl.appendChild(animePlotEl);

                var animeNoDescEl = document.createElement("div");
                animeNoDescEl.textContent = "Sorry, no plot summary for this anime was found...";
                searchBarResEl.appendChild(animeNoDescEl);
                
                console.log("Sorry, no plot summary for this anime was found...");
            }

        }
    };
};

var displayTitleData = function(data) {

    searchBarResEl.textContent = "";

    var titleResEl = document.createElement("h2");
    titleResEl.textContent = "Results: ";
    searchBarResEl.appendChild(titleResEl);

    // if anime exists in data
    if (data.getElementsByTagName("anime").length > 0) {

        // get titles of anime that correspond to the search result
        var animeTag = data.getElementsByTagName("anime");
        for (var i = 0; i < animeTag.length; i++) { 
            var animeTVType = animeTag[i].getAttribute("type");
            if (animeTVType == "TV") {
                var animeTitleInfo = animeTag[i].getAttribute("name");

                // for every title, append to the page
                var animeTitleListEl = document.createElement("ul");

                var animeTitleEl = document.createElement("li");
                animeTitleEl.textContent = animeTitleInfo;

                animeTitleListEl.appendChild(animeTitleEl);
                searchBarResEl.appendChild(animeTitleListEl);
                // on click, display anime description
                animeTitleEl.addEventListener("click", function(event) {
                    displayAnimeData(event, data);
                });
            }
        };
        
    }
    // if anime was not found in data
    else {
        var notFoundEl = document.createElement("div");
        notFoundEl.textContent = "No results found. Please try again.";

        searchBarResEl.appendChild(notFoundEl);

        console.log("Anime not found...");
    }
    


};

var formSubmitHandler = function(event) {
    event.preventDefault();

    searchBarResEl.textContent = "";

    var animeTitle = animeInputEl.value.trim();

    if (animeTitle) {
        getFranchiseData(animeTitle);

        // reset form
        animeInputEl.value = "";
    }
    else {
        var notFoundEl = document.createElement("div");
        notFoundEl.textContent = "Please enter an anime title.";

        searchBarResEl.appendChild(notFoundEl);
        
        console.log("please enter an anime title!!!!!!");
    }

};

searchBarFormEl.addEventListener("submit", formSubmitHandler);
