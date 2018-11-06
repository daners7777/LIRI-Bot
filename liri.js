require("dotenv").config();

var request = require("request");
var keys = require("./keys.js");
var inquirer = require('inquirer');
var Spotify = require("node-spotify-api");
var moment = require('moment');
var fs = require("fs");

var searchTerm = "";

function prompt() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "command",
                message: "What would you like to do?",
                choices: ["Get song", "Get movie", "Get concert", "Do what it says"],
            },
        ])
        .then(function (answers) {
            console.log(answers);
            if (answers.command === "Get song") {
                search(answers.command)
                //console.log("function")
            }
            if (answers.command === "Get movie") {
                search(answers.command)
                //console.log("newFunction")
            }
            if (answers.command === "Get concert") {
                search(answers.command)
                //console.log("newFunction2")
            }
            if (answers.command === "Do what it says") {
                search(answers.command)
                //console.log("newFunction2")
            }

        });
}

function search(command) {
    inquirer
        .prompt([
            {
                type: "input",
                name: "searchterm",
                message: "What would you like to search for?",
            }
        ])
        .then(function (answers) {
            searchTerm = answers.searchterm;
            if (command === "Get movie") {
                getMovie(searchTerm)
            }

            if (command === "Get song") {
                getSong(searchTerm)
            }
            if (command === "Get concert") {
                getConcert(searchTerm)
            }
            if (command === "Do what it says") {
                doWhatItSays(searchTerm)
            }
        });
    }

function getMovie(movie) {
    console.log(movie)
    if (movie === "") {
        console.log("no search term")
        movie = "Mr. Nobody"
    }
    var queryurl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=full&tomatoes=true&apikey=trilogy";
    request(queryurl, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            //console.log(body)

            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
    })
}

function getSong(song) {
    var spotify = new Spotify(keys.spotify);
    if (searchTerm === "") {
        console.log("no search term")
        song = 'Ace of Base: The Sign';
    }
    spotify.search({ type: 'track', query: song }, function (err, data) {
        
        console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
        console.log("Song Name: " + data.tracks.items[0].name);
        console.log("Preview Link: " + data.tracks.items[0].preview_url);
        console.log("Album: " + data.tracks.items[0].album.name);

        if (err) {
            return console.log('Error occurred: ' + err);
        }
    });
}

function getConcert(artist) {
    console.log(artist)
    if (artist === "") {
        console.log("no search term")
        artist = "Tycho"
    }
    var queryurl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    request(queryurl, function (error, response, body) {
        console.log("Venue Name: " + JSON.parse(body)[0].venue.name);
        console.log("Venue Location: " + JSON.parse(body)[0].venue.city);
        console.log("Event Date: " + moment(JSON.parse(body)[0]).format("MM/DD/YYYY"));
        if (!error && response.statusCode === 200) {
            //console.log(body)
        }
    })
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        //console.log(data);
        var dataArr = data.split(",");
        console.log(dataArr);

        prompt();
    });
}

prompt();