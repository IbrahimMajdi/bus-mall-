'use static'

var inputfolder = document.getElementById("file-selector").files;
console.log(inputfolder);


var leftImage = document.getElementById("left");
var centerImage = document.getElementById("center");
var rightImage = document.getElementById("right");
var imageSection = document.getElementById("section");

var totalClicks = 0;
var voteRounds = 25;
Products.all = [];

function Products(name) {

    this.productname = name;
    this.imgpath = `assets/${name}`;
    this.clicks = 0;
    this.view = 0;

    Products.all.push(this);
}

for (var i = 0; i < inputfolder.length; i++) {

    new Products(inputfolder[i].name)

}

var left, center, right;

var images = [];

console.log(images);

function renderImages() {


    left = checkRep();
    // images.push(left.productname);
    leftImage.src = left.imgpath;

    center = checkRep();
    images.push(center.productname);

    centerImage.src = center.imgpath;

    right = checkRep();
    images.push(right.productname);
    rightImage.src = right.imgpath;
}


renderImages();



imageSection.addEventListener('click', function (event) {

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

    } else {
        finalResult();
    }


})

function finalResult() {

    var ulE1 = document.getElementById('finalResult');

    for (var i = 0; i < inputfolder.length; i++) {
        var li = document.createElement('li');
        li.textContent = `${Products.all[i].productname} has ${Products.all[i].clicks} clicks and ${Products.all[i].view} views`;
        ulE1.append(li);

    }

}


function checkRep() {

    images.push(this.productname);
    return Products.all[randomNum(0, inputfolder.length - 1)];
}

function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}