/** SEARCH BAR SECTION **/

var searchBarFormEl = document.querySelector("#search-bar-form"); // <form> ID
var animeInputEl = document.querySelector("#anime-title"); // form <input> id

var formSubmitHandler = function(event) {
    event.preventDefault();

    var animeTitle = animeInputEl.value.trim();

    if (animeTitle) {
        console.log(animeTitle);

        // reset form
        animeInputEl.value = "";
    }
    else {
        // TODO: TURN THIS PLACEHOLDER INTO A MODAL!!!!!!!!!!!!
        console.log("please enter an anime title!!!!!!");
    }

};

searchBarFormEl.addEventListener("submit", formSubmitHandler);
