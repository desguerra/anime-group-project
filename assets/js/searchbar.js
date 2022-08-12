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

                // get ID of only the anime
                var animeTag = xml.getElementsByTagName("anime");
                for (var i = 0; i < animeTag.length; i++) { 
                    if (animeTag[i].getAttribute("type") == "TV") {
                        var animeID = animeTag[i].getAttribute("id");
                        console.log(animeID);
                    }
                };

                // testing XML data output //
                console.log(xml);

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

// var getAnimeData = function(animeID) {
//     var animeURL = "https://cdn.animenewsnetwork.com/encyclopedia/api.xml?anime=" + animeID;

//     fetch(franNewsUrl).then(function(res) {
//         if (res.ok) {
//             // parse XML data
//             res.text().then(function(data) {
//                 // var parser = new DOMParser();
//                 // var xml = parser.parseFromString(data, "text/xml");
//                 // console.log(xml);
//             });
//         } 
//         else {
//             alert("Error: Anime ID Not Found");
//         }
//     })
    
//     .catch(function(error) {
//         alert("Unable to connect to Anime News Network");
//     });
// };

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
