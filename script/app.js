'use static'

var inputfolder = document.getElementById("file-selector").files;
console.log(inputfolder);


var leftImage = document.getElementById("left");
var centerImage = document.getElementById("center");
var rightImage = document.getElementById("right");
var imageSection = document.getElementById("section");

var totalClicks = 0;

Products.all = [];

function Products(name) {

    this.productname = name;
    this.imgpath = `assets/${name}`;
    this.clicks = 0;
    this.view =0;

    Products.all.push(this);
}

for (var i = 0; i < inputfolder.length; i++) {
    // var totla= inputfolder[i].name


    new Products(inputfolder[i].name)

}

var left, center, right;

var images=[];

console.log(images);

function renderImages() {


    left = Products.all[randomNum(0, inputfolder.length - 1)];

    images.push(left.productname);

    for (var i =0; i < images.length;i++){

        if( left.name === images[i].productname){
            console.log(images[i].productname);
            left.view++;

        }
    }
     
    leftImage.src = left.imgpath;

    center = Products.all[randomNum(0, inputfolder.length - 1)];
    images.push(center.productname);

    centerImage.src = center.imgpath;

    right = Products.all[randomNum(0, inputfolder.length - 1)];
    images.push(right.productname);
    rightImage.src = right.imgpath;
}

function checkRep(){
    
}
renderImages();



imageSection.addEventListener('click', function (event) {

    if (totalClicks < 25) {

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

console.log(totalClicks);

function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}