const gameContainer = document.getElementById("game");


randomColors=[]

const COLORS = [
  ['red'],
  ["blue"],
  ["green"],
  ["orange"],
  ["purple"],
  ["red"],
  ["blue"],
  ["green"],
  ["orange"],
  ["purple"]
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors() {
  
  playBtn();
}

//function to create divs
function createDisplay(colorArray){
  
  for (let color of colorArray) {
    
      // create a new div
      const newDiv = document.createElement("div");

      // give it a class attribute for the value we are looping over
      newDiv.classList.add(color[0]);

      // newDiv.style.backgroundColor=color[1];
      // newDiv.className+= ' show';

      //add color class to divs
      newDiv.className+=' color';

      // call a function handleCardClick when a div is clicked on
      // newDiv.addEventListener("click", handleCardClick);

      // append the div to the element with an id of game
      gameContainer.append(newDiv);
  }
}

let openedDiv=0;

// Delegating the event listener
gameContainer.addEventListener('click',function(e){
  
  //looping through classes for 'Done' class
  for(let class1 of e.target.classList){
      //if the div has already been clicked do nothing
      if(class1=='Done'){ 
        return;
      }
    }

  //increase opened div by 1, if less or equal to 2 run code, unless wait for  second1
  openedDiv++;
  if(openedDiv<=2){
    //loop through parent's classes  
    for(let class1 of e.target.classList){
      //if the div has already been clicked do nothing
      if(class1=='Done'){        
        noEvent(e)
        return;
      }
      if(class1=='color'){
        
        handleCardClick(e);
      }
    }
  }
  //reset opened div and wait for one second
  else if(openedDiv>2){
    openedDiv=0;
    const count1=setTimeout(function(){      
      clearTimeout(count1);
    },1000);
  }
  
})


let firstDivColor=null;
var index=null;
var score=100;
var divsOpened=0;
//saving the lowest score
localStorage.setItem('LowestScore',score);

//onclick listener function for divs
function handleCardClick(event) {
  
  if(firstDivColor==null){
    
    //if firstDiv is empty first set background color
    const divColor=event.target.classList[0];
    event.target.style.backgroundColor=divColor;
    firstDivColor=divColor;

    // get index of div in parent div
    const parent = event.target.parentNode;
    // The equivalent of parent.children.indexOf(child)
    index = Array.prototype.indexOf.call(parent.children, event.target);
    
    
  }
  else{

    // get index of div in parent div
    const parent = event.target.parentNode;
    // The equivalent of parent.children.indexOf(child)
    const index2 = Array.prototype.indexOf.call(parent.children, event.target);

    //Making sure user cant click on the same tile
    if(index!=index2){
        //if first div is not empty first set background color
      const divColor=event.target.classList[0];
      event.target.style.backgroundColor=divColor;
      
      //if the divs color match 
      if(divColor==firstDivColor){
        //if its a match add a class to remove the onclick listener
        divsOpened++;
        event.target.className+=" Done";
        event.target.parentNode.children[index].className+=" Done";
        console.log(event.target.classList);
        console.log(event.target.parentNode.children[index].classList);
        firstDivColor=null;
        openedDiv=0;
        
        
      }
      else{
        //if the colors dont match remove the colors after one second and reset the firstDiv variables
        const firstDiv=event.target.parentNode.children[index];
        openedDiv++;
        score--;
        storageScore=localStorage.getItem('score');
        
        if(score<parseInt(localStorage.getItem('LowestScore'))){
          localStorage.setItem('LowestScore',score);
        }
        
        let a=setTimeout(function(){
          firstDiv.style.backgroundColor=null;
          openedDiv=0;
          clearTimeout(a);
        },1000);
        
        let b=setTimeout(function(){
          event.target.style.backgroundColor=null;
          clearTimeout(b);
        },1000);
        index=null;
        firstDivColor=null;
      }
    }
    else{
      openedDiv=1;
      return;
    }
  }
  //displaying score at end of game
  if(divsOpened==5){
    let b=setTimeout(function(){
      alert("Your score is "+score);
      if (confirm("Restart!")) {
        replay();
      } else {
      }
      clearTimeout(b);
    },500);
    

  }
  
}

//create the play button to start
function playBtn(){
  const play=document.createElement('i');
  play.className+=' fas fa-play-circle fa-8x start';
  const body=document.querySelector('body');
  body.appendChild(play);
  play.addEventListener('click',function(event){
    shuffledColors = shuffle(COLORS);
    restartBtn();
  });
}

//create restart button
function restartBtn(){
  const restartBtn=document.createElement('i');
  restartBtn.className+=' fas fa-retweet fa-5x restart';
  const header=document.querySelector('#head');
  header.appendChild(restartBtn);

  //remove start button
  const play=document.querySelector('.start');
  play.parentNode.removeChild(play);

  //recreate divs
  shuffledColors = shuffle(COLORS)
  createDisplay(shuffledColors);
  restartBtn.addEventListener('click',function(e){

    replay();
  });
  
}

function replay(){
  
  //remove divs
  while (gameContainer.hasChildNodes()) {
    gameContainer.removeChild(gameContainer.lastChild);
  }

  //clear variables
  score=100;
  firstDivColor=null;
  index=null;
  divsOpened=0;

  //create display
  shuffledColors = shuffle(COLORS)
  createDisplay(shuffledColors);
}

// when the DOM loads
createDivsForColors();