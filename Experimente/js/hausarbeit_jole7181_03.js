var infinite = document.querySelector(".infinite");
var tiredofDriving = document.querySelectorAll("#stickyclaim"); //later->.classList.remove('hidden');
var breakbutton = document.getElementById("stickybutton");
var claimCounter = 0;
/**Canvas that a pattern on top of infinite scrolling */
var canvas = document.getElementById("pattern");
var context = canvas.getContext("2d");

//get wrapper height/width and change canvas height to it:
let wrapper = document.getElementsByClassName('wrapper')[0];
canvas.width = wrapper.offsetWidth;
canvas.height = wrapper.offsetHeight;
console.log("CANVAS___ w." + canvas.width + " -h." + canvas.height);

//PARTICLE SYSTEM::
var start_posX = canvas.width / 2,
    start_posY = canvas.height / 2;
var particles = [],
    particle_amount = 1500,
    particles_drawn = 0;
maxLife = 100,
    maxSpeed = 2;

//SCROLLING COUNTER:
var scroll_counter = 0;
var timer = null; //timer is 
var is_scrolling = true;
var endloop = false;
var colorArray = ['#B1B1B1', '#747474', '#444444', '#0A0708'];

Start();

//listening for infinity scroll
window.addEventListener('scroll', function () {
    //time for how long you have not scrolled:
    is_scrolling = true;
    scrolling();
});

//listening for clear window:
breakbutton.addEventListener('click', function () {
    endloop = !endloop;
    tiredofDriving[1].classList.add('hidden');
    breakbutton.classList.add("hidden");

}, false);

function scrolling() {
    //from documentation: To reliably obtain the full document height, we should take the maximum of these properties:
    let scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );
    //since pageYoffset is the y position of the top off the screen, we add the height of the window to it.
    let end_of_screen = window.pageYOffset + window.innerHeight;
    // console.log("eos: " + end_of_screen + " ___: " + scrollHeight)
    if (end_of_screen >= scrollHeight - scrollHeight / 3) {
        //console.log("add scroll");
        //append a div to end of page:
        var div = document.createElement("div");


        var stripes = document.createElement("div");
        stripes.style.position = "absolute";
        stripes.style.width = "50%";
        stripes.style.height = "200vh";
        stripes.style.backgroundImage = "linear-gradient(rgb(255, 255, 255) 33%, rgba(255, 255, 255, 0) 0%)";
        stripes.style.backgroundPosition = "right";
        stripes.style.backgroundSize = "5vw 50vw";
        stripes.style.backgroundRepeat = "repeat-y";
        stripes.style.backgroundPositionY = "0vh";
        div.appendChild(stripes);


        infinite.appendChild(div);

        particles_drawn += 10;

        if (particles_drawn % 30 == 0) {
            scroll_counter++;
        }

    }
}

async function Start() {
    //first add the amounts of Rain_drops
    await add_particles();
    console.log("added");
    requestAnimationFrame(draw);
}

function add_particles() {
    //push raindrop objects to rain_drops array
    return new Promise(function (resolve, reject) {
        for (i = 0; i < particle_amount; i++) {
            particles.push({
                posX: Math.random() * (canvas.width - 0) + 0,
                posY: Math.random() * (canvas.height - 0) + 0,
                size: Math.random() * (canvas.width / 50 - 10) + 10,
                gravity: 0,
                life: 50,
                speed_x: Math.random() * (2 - 1) + 1 * (Math.random() < 0.5 ? -1 : 1),
                speed_y: Math.random() * (2 - 1) + 1 * (Math.random() < 0.5 ? -1 : 1),
                color: colorArray[Math.round(Math.random() * (colorArray.length))],
                radians: Math.random() * Math.PI * 2,
                distance_X: Math.random() * (15 - 7) + 7,
                distance_Y: Math.random() * (15 - 7) + 7,
            });
        }
        //always resolve
        if (1) {
            resolve();
        } else {
            reject();
        }

    });

}


function draw() {
    //clear background:
    context.globalAlpha = 0.1;
    if (!is_scrolling) {
        console.log("stopped scrolling: clear window");
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    if (scroll_counter <= 10) {
        context.clearRect(0, 0, canvas.width, canvas.height);
    } else if (scroll_counter >= 15 && scroll_counter < 25 && claimCounter == 0) {
        console.log("show Claim 0");
        tiredofDriving[0].classList.remove('hidden');
        claimCounter++;
    } else if (scroll_counter >= 19 && scroll_counter < 40 && claimCounter == 1) {
        console.log("show Claim 1");
        tiredofDriving[0].classList.add('hidden');
        tiredofDriving[1].classList.remove('hidden');
        breakbutton.classList.remove('hidden');
        claimCounter++;
    }
    //for each particle:
    if(particles_drawn >= particles.length){
        particles_drawn = particles.length;
    }
    for (i = 0; i < particles_drawn; i++) {
        //add speed to position
        let current = particles[i];

        //particles[i].posX += current.speed_x;
        //particles[i].posY += current.speed_y + current.gravity;

        particles[i].radians += 0.05;
        particles[i].posX = current.posX + Math.cos(current.radians) * current.distance_X;
        particles[i].posY = current.posY + Math.sin(current.radians) * current.distance_Y;

        if ((current.posY > canvas.height) || (current.posY < 0) || (current.posX > canvas.width) || (current.posX < 0)) {
            particles[i].posY = Math.random() * (canvas.height - 0) + 0;
            particles[i].posX = Math.random() * (canvas.width - 0) + 0;
        }
        //create polygon with current particle position   
        // Draws a circle of radius 20 at the coordinates 100,100 on the canvas
        context.beginPath();
        context.arc(current.posX, current.posY, current.size * scroll_counter / 100, 0, Math.PI * 2, true);
        context.closePath();
        context.fillStyle = current.color;
        context.fill();
        context.stroke();
    }


    if (!endloop) {
        requestAnimationFrame(draw);
    } else {
        context.clearRect(0, 0, canvas.width, canvas.height); //clear one last time
    }
}
