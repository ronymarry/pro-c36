var database ,dog,dog1,dog2
var position
//var form
var feed,add,tuffy,pull
var foodobject
var Feedtime
var Lastfeed
var food1
//Create variables here

function preload()

{
  dogimg1 = loadImage("images/dogImg.png")
  dogimg2 = loadImage("images/dogImg1.png")
  milk= loadImage("images/Milk.png")
  
	//load images here
}

function setup() {
	createCanvas(1000, 500);
  database = firebase.database();
  console.log(database);
 
  foodobject=new Food()
  dog = createSprite(850,250,10,10);
  dog.addImage(dogimg1)
  dog.scale=0.2

  food1 = createSprite(780,280)
  food1.addImage(milk)
  food1.scale = 0.07

 
  var dogo = database.ref('Food');
  dogo.on("value", readPosition, showError);
  feed = createButton("FEED Dog")
  feed.position(500,15)
  feed.mousePressed(FeedDog)
  add = createButton("ADD FOOD")
  add.position(400,15)
  add.mousePressed(AddFood)
  var tuffy=createInput("Name of dog")
  tuffy.position(650,40)
  var pull = createButton("continu")
  pull.position(800,40)
 
  //tuffy.mousePressed(AddFood)

} 

function draw(){
 background("red");

 foodobject.display()
 
 drawSprites();
  
 fill(255,255,254);
 textSize(15);
text("LAST FEED = 4PM",50,30)


for (var i = 5; i < 1000; i=i+10) 
  {
  
  var dot = createSprite(i, 5, 6, 6);
  dot.shapeColor = "pink";
  
  }
  for (var i = 5; i < 1000; i=i+10) 
  {
  
  var dot1 = createSprite(i, 495, 6, 6);
  dot1.shapeColor = "pink";
  
  }
  for (var i = 5; i < 1000; i=i+10) 
  {
  
  var dot1 = createSprite(995,i, 6, 6);
  dot1.shapeColor = "pink";
  
  }
  for (var i = 5; i < 1000; i=i+10) 
  {
  
  var dot1 = createSprite(5,i, 6, 6);
  dot1.shapeColor = "pink";
  
  }


}
function readPosition(data){
  position = data.val();
  foodobject.updateFoodStock(position)
}

function showError(){
  console.log("Error in writing to the database");
}


function writePosition(nazo){
  if(nazo>0){
    nazo=nazo-1
  }
  else{
    nazo=0
  }
  database.ref('/').set({
    'Food': nazo
  })

}
function AddFood(){
  dog.addImage(dogimg1)
position++
database.ref('/').update({
  Food:position
})


}
function FeedDog(){

dog.addImage(dogimg2)
foodobject.updateFoodStock(foodobject.getFoodStock()-1)
 database.ref('/').update({
   Food:foodobject.getFoodStock(),
   FeedTime:hour ()
 })
}

