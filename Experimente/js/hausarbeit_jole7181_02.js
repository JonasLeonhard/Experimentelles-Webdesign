
/**Canvas that draws rain inside of the cube */
var canvas = document.getElementById("rain");
var context = canvas.getContext("2d");

//get wrapper height/width and change canvas height to it:
let wrapper = document.getElementById('rain_wrapper');
canvas.width = wrapper.offsetWidth;
canvas.height = wrapper.offsetHeight;

//Declare Rain -> Properties:!
var rain_drops = [],
maxSpeed = 2, minSpeed = 1, gravity_inc = 0.01,
maxWidth = 10, minWidth = 5, maxHeight = 10, minHeight = 5,
maxBlur = 3, minBlur = 0, //amount of pre blur images 0,1,2,3 -> 4blur stages
rain_spacer = 5,
rain_amount = innerWidth / rain_spacer,
i;

//Create images:
var img_raindrop= new Image();   // Create new img element
img_raindrop.src = '../src/rain_drop.png';
var img_raindrop_02= new Image();   //Blur 01
img_raindrop_02.src = '../src/rain_drop02.png';
var img_raindrop_03= new Image();   //Blur 02
img_raindrop_03.src = '../src/rain_drop03.png';
var img_raindrop_04= new Image();   //Blur 03
img_raindrop_04.src = '../src/rain_drop04.png';

/** MAIN_____________________________________________________________________________________________ */
Start();

window.addEventListener('resize', function(event){
    //move both men to middle of front-cube
    moveMen();
});

/** FUNCTIONS:_______________________________________________________________________________________ */
async function Start(){
    //first add the amounts of Rain_drops
    moveMen();
    await addrain_drops();
    draw();
}
function addrain_drops(){
    //push raindrop objects to rain_drops array
    return new Promise(function(resolve, reject) {
        rain_pos_x = 0; //<- x position last raindrop put in array

        for (i = 0; i < rain_amount; i++){
            rain_pos_x += rain_spacer;
            rain_drops.push({
                x: rain_pos_x,
                y: Math.round(Math.random()*canvas.height),
                width: Math.random()* (maxWidth - minWidth) + minWidth,
                height: Math.random()* (maxHeight - minHeight) + minHeight,
                //Math.random() * (max - min) + min; //+1 min speed so speed is minimun 1 
                speed: Math.random()* (maxSpeed - minSpeed) + minSpeed , 
                gravity: 0,
                blurindex: Math.ceil(Math.random()* (maxBlur - minBlur) + minBlur)
            });
        }

        //always resolve
        if(1)
        {
            resolve();
        }else{
            reject();
        }
       
    });
    
}

function draw(){
    //clear background:
    context.clearRect(0,0,canvas.width,canvas.height);
    
    for (i = 0; i < rain_drops.length; i++){

        let current = rain_drops[i];

        
        //context.fillRect(current.x, current.y, current.width, current.height);
        if(current.blurindex == 0)
        {
            context.drawImage(img_raindrop, current.x, current.y, current.width, current.height);
        }else if(current.blurindex == 1)
        {
            context.drawImage(img_raindrop_02, current.x, current.y, current.width, current.height);
        }else if(current.blurindex == 2)
        {
            context.drawImage(img_raindrop_03, current.x, current.y, current.width, current.height);
        }else if(current.blurindex == 3)
        {
            context.drawImage(img_raindrop_04, current.x, current.y, current.width, current.height);
        }
        
        //slightly increase currents gravity
        if(current.speed <= maxSpeed)
        {
            current.gravity += gravity_inc;
        }


        //->add the speed parameter to the current raindrop y value
        current.y += current.speed + current.gravity;
        
        //->reset the raindrops y value if its outside of the canvas
        if (current.y > canvas.height)
        {
            current.y = 0 - current.height;
            current.gravity = 0; //reset gravity
        }
           
    }
    
    requestAnimationFrame(draw);
    
}

function moveMen(){
    //moves the men to the middle of the cube::
    let men_top = document.querySelector(".man");
    let men_back = document.querySelector(".moving_back");
    let men_wrapper = document.querySelector(".man_wrapper");

    var translateX = (men_wrapper.offsetWidth/2)-(men_top.offsetWidth/2); 
    men_top.style.transform = `translateX(${translateX}px)`;
    men_back.style.transform =`translateX(${translateX}px)`;
}
