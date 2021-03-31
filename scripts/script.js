// reference:
// https://codepen.io/rzencoder/pen/dNNNVz
// https://codepen.io/LoganneF/pen/RwNZROx
// https://gamedevelopment.tutsplus.com/tutorials/create-a-whack-a-mole-game-in-html5-with-easeljs--active-10438
// https://www.discoverdev.io/blog/series/js30/30-whack-a-mole/

const $plates = $('.plate-box');
const $btnGamePlay = $('.btn-gameplay');

// const $text = $('.text');
// const $testPlate = $('#testPlate');
const $foods = $('.food-box');
const $scoreBoard = $('#scoreBoard');
const $highestScore = $('#highest-score');
const timeBoard = document.getElementById('timeBoard');
const messageGameOver = $('.message-gameover'); 
const $cursor = $('.game-area-containter .plate-container');
const $foodImage = $('.food-image');
var sound = document.getElementById('sound');


let timeUp = false;
let score = 0;
let highestScore = 0;


$btnGamePlay.click(function(){

    if($btnGamePlay.text() === 'Start Game'){
        startGame();
    } else{
        stopGame();
        console.log('Game Stopped');
        $foods.hide();
    }
});

function playSound(){
    sound.play();
}


const foodImages = createImages();

function createImages(){
    let images = [];

    let oneImage;
    oneImage = `images/banhmi.png`;
    images.push(oneImage);
    oneImage = `images/banhcuon.png`;
    images.push(oneImage);
    oneImage = `images/banhtrangtron.png`;
    images.push(oneImage);
    oneImage = `images/bunbohue.png`;
    images.push(oneImage);

    return images;
}


function ranNum(){
    let ranNum = Math.floor(Math.random() * foodImages.length);
    return ranNum;
}

let lastIndex = 0;
function randomFood(){

    let index = Math.floor(Math.random() * $foods.length);
    
    while(lastIndex === index){
        index = Math.floor(Math.random() * $foods.length);
    }

    lastIndex = index;
    var $oneFood = $foods[index];
    return $oneFood;
};

function randomTime(min, max){
    return Math.round(Math.random() * (max - min) + min);
}

const minTime = 200;
const maxTime = 2000;


function foodNameCount(){
    let foodShowUp = randomFood();
    let ranNumber = ranNum(); 

    $(foodShowUp).css({'background-image': `url("${foodImages[ranNumber]}")`, 'background-size': 'cover'});
    $(foodShowUp).attr('value', `${ranNumber}`);
    console.log($(foodShowUp).attr('value'));
    

    return foodShowUp;
}


function showUp(){
    const time = randomTime(minTime, maxTime);
       
    
    let foodShowUp = foodNameCount();   

    
    $(foodShowUp).fadeIn();   
    
    console.log('food show up');

    setTimeout(function(){
        $(foodShowUp).fadeOut();
        if(!timeUp) showUp();
    }, time);    
           
}


function addScore(){    
    score++;
    $foods.addClass('.avoid-clicks');    
    console.log(score);
    if(score >= highestScore){
        highestScore = score;
    }
    $scoreBoard.text(`${score}`);
    $highestScore.text(`${highestScore}`);
    setTimeout(function(){
        $foods.removeClass('.avoid-clicks');
    }, 200);    
}



let timer;

function timeCount(){
    const timeInterval = 1000;
    const incrementer = 1;
    let count = 0;    

    timer = setInterval(function(){
        count = count + incrementer;
        timeBoard.innerHTML = `${count} s`;
        if(count >= 20){
            clearInterval(timer);
        }
    }, timeInterval);
}


let banhtrangtronCount = 0;
let banhcuonCount = 0;
let banhmiCount = 0;
let bunbohueCount = 0;

//hit the food to score
$foods.on('click focus tap', function(){

    let foodNameCode = $(this).attr('value');
    console.log(foodNameCode);

    if($(this).hasClass('.avoid-clicks') || timeUp){
        
        console.log('clicked');
        return;
    } else{     
        
        playSound();
        $(this).hide();        
        console.log('you got it');
        addScore();
        if(foodNameCode == 0){
            banhmiCount++;
            $foodImage.children('p').eq(0).text(`Banh Mi x ${banhmiCount}`);            
        } else if(foodNameCode == 1){
            banhcuonCount++;
            $foodImage.children('p').eq(1).text(`Banh Cuon x ${banhcuonCount}`);
        } else if(foodNameCode == 2){
            banhtrangtronCount++;
            $foodImage.children('p').eq(2).text(`Banh Trang Tron x ${banhtrangtronCount}`);
        } else if(foodNameCode == 3){            
            bunbohueCount++;
            $foodImage.children('p').eq(3).text(`Bun Ho Hue x ${bunbohueCount}`);
        }      
    }  
})

var timeOut;

function startGame(){
    $btnGamePlay.text('Stop Game');
    messageGameOver.hide();
    timeCount();
    score = 0;
    banhtrangtronCount = 0;
    banhcuonCount = 0;
    banhmiCount = 0;
    bunbohueCount = 0;
    $scoreBoard.text(`${score}`);
    $foodImage.children('p').eq(0).text(`Banh Mi`);
    $foodImage.children('p').eq(1).text(`Banh Cuon`);
    $foodImage.children('p').eq(2).text(`Banh Trang Tron`);
    $foodImage.children('p').eq(3).text(`Bun Ho Hue`);

    timeUp = false;
    showUp();
    timeOut = setTimeout(function (){
        timeUp = true;
        console.log('time is up');
        $btnGamePlay.text('Start Game');
        messageGameOver.text(`You Scored:  ${score}`);
        messageGameOver.show();
    }, 20000);
}

function stopGame(){
    $btnGamePlay.text('Start Game');
    timeUp = true;
    
    clearTimeout(timeOut);
    clearInterval(timer);
    console.log('time stops');    
    
    setTimeout(function(){
        $foods.hide();
        console.log('food hide');
    }, 800);
    
}












