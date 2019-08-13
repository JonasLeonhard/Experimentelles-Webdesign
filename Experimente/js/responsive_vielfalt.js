console.log("js-file loaded");
var _img, _motto; //set in get class
//quotes[quote[txt, auth]]
var quotes = [
    ["You Talk is cheap. Show me the code", "Linus Torvalds"],
    ["A common fallacy is to assume authors of incomprehensible code will be able to express themselves clearly in comments", "Kevlin Henney"],
    ["Good code is it’s own best documentation", "Steve McConnell"],
    ["Measuring programming progress by lines of code is like measuring aircraft building progress by weight", "Bill Gates"],
    ["If debugging is the process of removing bugs, programming must be the process of putting them in", "Edsger Dijkstra"],
];
var currentQuote = "currentQuote not set";
var currentAuthor = "currentAuthor not set";
var currentCharacter_inWriteEffect = 0;
var writing_speed = 100;
var writing_reset_after = 15000; //15sec
var text = "TEST TEXT!"; //current quote text +=increases in writing
var writing = true; //starts and stops writing //set when qoute.length = currentCharacter

var write_effect_TXT = 'ERROR: write_effect_TXT not set in set_Random_Quote';

/*<<<<<<<<<<<<<<<<<<<<<<<<<<>MAIN */
setup(() => {
    typeWriter();
});

function setup(callback) {
    window.addEventListener('resize', browser_Window_Resized);
    get_class(() => {
        browser_Window_Resized();
        callback();
    });
    set_Quote_Random();
}

function browser_Window_Resized() {
    var b_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var b_height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    //___Set Profile Pic Depending on Viewport width:
    if (b_width <= 10000 && b_width > 1200) {
        _img.src = "../src/profile_photo_<=1250.jpg";
    } else if (b_width <= 1200 && b_width > 1050) {
        _img.src = "../src/profile_photo_<=900.jpg";
    } else if (b_width <= 1050 && b_width > 900) {
        _img.src = "../src/profile_photo_<=1000.jpg";
    } else if (b_width <= 900 && b_width > 700) {
        _img.src = "../src/profile_photo_<=750.jpg";
    } else if (b_width <= 700 && b_width > 600) {
        _img.src = "../src/profile_photo_<=600.jpg";
    } else if (b_width <= 600 && b_width > 0) {
        _img.src = "../src/profile_photo_<=500.jpg";
    }
}

function get_class(callback) {
    _img = document.querySelector("#image_loader");
    _motto = document.querySelector(".motto");
    callback();
}

function set_image_loader(image_element, src_) {
    image_element.src = src_;
}

function set_Quote_Random() {
    randomQuote = getRandomIntInclusive(0, quotes.length - 1);
    console.log("RND" + randomQuote);
    currentQuote = quotes[randomQuote][0];
    currentAuthor = quotes[randomQuote][1];
    
    text = currentQuote; //text used to display quote in typeWriter func.
    //console.log("quote set: "+ currentQuote);
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}



function typeWriter() {
    
    if (writing && currentCharacter_inWriteEffect < text.length) {
        //iterate through current qoute - put quote in html, call writing again after speed
        _motto.innerHTML += `${text.charAt(currentCharacter_inWriteEffect)}`;
        currentCharacter_inWriteEffect++;
        setTimeout(typeWriter, writing_speed);
    }

    if(writing && currentCharacter_inWriteEffect == text.length) 
    {
        //hit last character -> stop writing and start writing after timeout
        writing = false;
        myVar = setTimeout(start_Writing, writing_reset_after);
    }
}

function start_Writing(){
    //reset writing to char 0, _motto to empty, get new quote, start writing-> 
    _motto.innerHTML = '<p>"</p>';
    currentCharacter_inWriteEffect = 0;  
    set_Quote_Random();
    writing = true;
    typeWriter();
}