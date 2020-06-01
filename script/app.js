'use static'

var inputfolder = document.getElementById("file-selector").files;
// console.log(inputfolder);


var leftImage = document.getElementById("left");
var centerImage = document.getElementById("center");
var rightImage = document.getElementById("right");
var imageSection = document.getElementById("section");

var totalClicks = 0;
var voteRounds = 5;
Products.all = [];
var images = [];


// console.log('allproducts', Products.all);

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

    console.log(left);


    if (left === center || center === right || right == left) {
        renderImages();
    }

    leftImage.src = left.imgpath;
    left.view++
    // console.log('left value',left);

    centerImage.src = center.imgpath;
    center.view++
    // console.log('center value',center);


    rightImage.src = right.imgpath;
    right.view++

}


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

}





function randGenerator() {
    return Products.all[randomNum(0, inputfolder.length - 1)];
}

function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}