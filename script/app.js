'use static'

var inputfolder = document.getElementById("file-selector").files;

var leftImage = document.getElementById("left");
var centerImage = document.getElementById("center");
var rightImage = document.getElementById("right");
var imageSection = document.getElementById("section");

var totalClicks = 0;
var voteRounds = 25;
Products.all = [];
var imagesSet = [];


function Products(name) {

    this.productname = name.split(".")[0];
    this.imgpath = `assets/${name}`;
    this.clicks = 0;
    this.view = 0;

    Products.all.push(this);

}

for (var i = 0; i < inputfolder.length; i++) {

    new Products(inputfolder[i].name)
}

var left, center, right;

function renderImages() {

    left = randGenerator();
    center = randGenerator();
    right = randGenerator();


    if (left === center || center === right || right === left || imagesSet.includes(left) || imagesSet.includes(center) || imagesSet.includes(right)) {

        renderImages();
        imagesSet = [];

    } else {

        imagesSet = [];
        console.log("imagesSet", imagesSet);
    }


    imagesSet.push(left, center, right);

    leftImage.src = left.imgpath;
    left.view++

    centerImage.src = center.imgpath;
    center.view++


    rightImage.src = right.imgpath;
    right.view++
}


;


renderImages();

imageSection.addEventListener('click', handler);

function handler(event) {
    // event.preventDefault();
    if (totalClicks < voteRounds) {


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

            renderImages();
        }


    } else if (totalClicks === voteRounds) {
        imageSection.removeEventListener('click', handler);
        finalResult();
    }


}

function finalResult() {

    var ulE1 = document.getElementById('finalResult');

    for (var i = 0; i < inputfolder.length; i++) {
        var li = document.createElement('li');
        li.textContent = `${Products.all[i].productname} had ${Products.all[i].clicks} votes and was shown ${Products.all[i].view} times`;
        ulE1.append(li);

    }

    chart();
}





function randGenerator() {
    return Products.all[randomNum(0, inputfolder.length - 1)];
}

function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function chart() {

    var ctx = document.getElementById('myChart').getContext('2d');

    var productsLables = [];
    var productClicks = [];
    var productViews = [];

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