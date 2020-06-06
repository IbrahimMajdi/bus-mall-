'use static'

// get the uplaoded images
var inputfolder = document.getElementById("file-selector").files;

// get the  images html tags

var leftImage = document.getElementById("left");
var centerImage = document.getElementById("center");
var rightImage = document.getElementById("right");
var imageSection = document.getElementById("section");

// declare and assign global variables
var totalClicks = 0;
var voteRounds = 25;
Products.all = [];
var imagesSet = [];


// constructor function ( contain the alt and the src of the img )

function Products(name) {

    this.productname = name.split(".")[0];
    this.imgpath = `assets/${name}`;
    this.clicks = 0;
    this.view = 0;

    Products.all.push(this);

}


// iterate through objects to creat them

for (var i = 0; i < inputfolder.length; i++) {

    new Products(inputfolder[i].name)
}

// declare the variables to save the random images

var left, center, right;

// function to render random images

function renderImages() {

    // generate 3 random images
    left = randGenerator();
    center = randGenerator();
    right = randGenerator();

    // make sure there are no tow images are similar on the same round, also no tow rounds have similar images.

    if (left === center || center === right || right === left || imagesSet.includes(left) || imagesSet.includes(center) || imagesSet.includes(right)) {

        renderImages();
        imagesSet = [];

    } else {

        imagesSet = [];
    }

    // push the generated images to an array to compare
    imagesSet.push(left, center, right);

    // assign images src and alt while incrementing image appearance count 

    leftImage.src = left.imgpath;
    leftImage.title = left.productname;
    left.view++

    centerImage.src = center.imgpath;
    centerImage.title = center.productname;
    center.view++


    rightImage.src = right.imgpath;
    rightImage.title = right.productname;
    right.view++
}

// render images at first page lunch
renderImages();

// add event listner for user clicks

imageSection.addEventListener('click', handler);

function handler(event) {

    event.preventDefault();

    if (totalClicks < voteRounds - 1) {


        if (event.target.id !== 'section') {

            totalClicks++;

            if (event.target.id === 'left') {
                left.clicks++;
            }

            if (event.target.id === 'center') {
                center.clicks++;
            }

            if (event.target.id === 'right') {
                right.clicks++;
            }
            SetProducts();

            renderImages();
        }

        // check if the current totalcliks is equal to the fixed voteRounds number to display the final data

    } else if (totalClicks === voteRounds - 1) {
        imageSection.removeEventListener('click', handler);
        finalResult();
    }


}

// render the final data list with a chart for the data

function finalResult() {

    var ulE1 = document.getElementById('finalResult');

    for (var i = 0; i < inputfolder.length; i++) {
        var li = document.createElement('li');
        li.textContent = `${Products.all[i].productname} had ${Products.all[i].clicks} votes and was shown ${Products.all[i].view} times`;
        ulE1.append(li);

    }
    chart();
}

// generaate random product images

function randGenerator() {
    return Products.all[randomNum(0, inputfolder.length - 1)];
}

// helper function to generate random numbers
function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//  arrays to use to fill the chart data
var productsLables = [];
var productClicks = [];
var productViews = [];


// chart js function

function chart() {

    var ctx = document.getElementById('myChart').getContext('2d');

    for (var i = 0; i < Products.all.length; i++) {

        productsLables.push(Products.all[i].productname);
        productClicks.push(Products.all[i].clicks);
        productViews.push(Products.all[i].view);

    }
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: productsLables,
            datasets: [{
                label: ['number of Votes'],
                data: productClicks,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }, {
                label: 'number of Views',
                data: productViews,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

// set local storage
function SetProducts() {

    var data = JSON.stringify(Products.all);
    localStorage.setItem('data', data);

}
// get local storage

function getProducts() {

    var storedData = localStorage.getItem('data');
    if (storedData != null) {

        Products.all = JSON.parse(storedData);
        finalResult();
    }
}
// retrive local storage data
getProducts();
