// require("dotenv").config();
// var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);

var inquirer = require('inquirer');
var request = require('request');

var searchTerm = "";

function prompt() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "command",
                message: "What would you like to do?",
                choices: ["Get song", "Get movie"],
            },
            // {
            //     type: "input",
            //     name: "searchterm",
            //     message: "What would you like to search for",
            // }
            /* Pass your questions in here */
        ])
        .then(function (answers) {
            console.log(answers);
            if (answers.command==="Get song") {
                console.log("runningfunction")
            }
            if (answers.command==="Get movie"){
                search(answers.command)
                //console.log("newfunction")
                //getMovie(searchTerm)
            }
            // Use user feedback for... whatever!!
        });
}

function search(command) {
    inquirer
        .prompt([
            {
                type: "input",
                name: "searchterm",
                message: "What would you like to search for",
            }
            /* Pass your questions in here */
        ])
        .then(function (answers) {
          searchTerm = answers.searchterm;
            if (command === "Get movie"){
                getMovie(searchTerm)
            }
            // Use user feedback for... whatever!!
        });
}


function getMovie(movie) {
 console.log(movie)
 if (movie==="") {
     console.log("no search term")
     movie="Mr. Nobody"
 }
 var queryurl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=full&tomatoes=true&apikey=trilogy";
 request(queryurl, function(error, response, body){
     if (!error && response.statusCode===200){
         console.log(body)
     }
 })

} 
prompt();