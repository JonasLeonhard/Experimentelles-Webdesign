/*Script file for unleserlichkeit.html
-> increasingly scambles text depending on viewport-width 

First it creates a Array with each .songtext class-
it then gets each verse and wraps each character in that verse in a <span>
then it loops throught each span applying a transform to each span*/

var gen_txt_wrapper;
var albumcover;
var albumcoverimg;
var albumtitle;
var artist;
var songtitle;
var wrapper;
var loading;
var spanList = []; /*all spans .gen_Char saved here*/
var colors = {
    rainbow: ['red', 'orange', 'yellow', 'green', 'blue', 'purple'],
    stage01: ['#ffffff'], //white only
    stage02: ['#ffffff', '#e8e8e8', '#dbdbdb', '#c4c4c4'],
    stage03: ['#ffffff', '#ce7777', '#779cce', '#844749'],
    stage04: ['#67001f', '#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#f7f7f7', '#d1e5f0', '#92c5de', '#4393c3', '#2166ac', '#053061']
}; //<--gen_Color(colors.div));

setup();


/*__________________________________________________________________________________________________________ */

function setup() {
    window.addEventListener('resize', browser_Window_Resized);
    getClass(wrapSpan);
    wrapper.style.visibility = "visible";
    loading.style.visibility = "hidden";
    loading.style.display = "none";
    browser_Window_Resized();
}

/*__________________________________________________________________________________________________________ */
function browser_Window_Resized() {
    var b_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var b_height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    //console.log("width: " + b_width + " height: " + b_height);

    //console.log("TEST: "+`${test}`);
    /*apply bWidth factor to scatter spanList.gen_Char divs:*/
    //randomness factor increases with width: 0_null_width = smallest ...
    var randomness_factor = 0;
    var null_width = 500; //if null_width = 400 max_randomness = x2 = 800, for randomness_inc = 1; if rand_inc = 0.5 then 1200
    var randomness_increase = 0.9;

    randomness_factor = (b_width / null_width - 1) * randomness_increase;
    if (randomness_factor < 0) {
        randomness_factor = 0;
    } else if (randomness_factor > 1) {
        randomness_factor = 1;
    }

    /*Translate Cover base on randomness_factor to middle of screen*/
    w_cover = (albumcover.offsetLeft +b_width/4)*randomness_factor;
    h_cover = (albumcover.offsetLeft +b_height/3)*randomness_factor;
    rot_cover = ((1 * 10)-1)*randomness_factor
    albumcover.style.transform = `translate(${w_cover}px, ${h_cover}px) rotate(${rot_cover}deg)`;
    
    /*Change albumcoverimg height with randomness factor */
    cover_height = (50 *3)*randomness_factor +100; //<-- smallestSIze * multtobiggesSize
    albumcoverimg.style.height = `${cover_height}px`;

    /*Translate+rotate Title to right of Screen*/
    w_title = (albumtitle.offsetLeft + b_width/2)*randomness_factor;
    h_title = (albumtitle.offsetTop + b_height/10)*randomness_factor;
    rot_title = ((1 * 10)-1)*randomness_factor;
    albumtitle.style.transform = `translate(${w_title}px, ${h_title}px) rotate(${rot_title}deg)`;

    /*Translate Artist to right of screen */
    w_artist = (artist.offsetLeft + b_width/3)*randomness_factor;
    h_artist = (artist.offsetTop + b_height/3)*randomness_factor;
    artist_height = (10)*randomness_factor +1;
    artist.style.transform = `translate(${w_artist}px, ${h_artist}px) scaleY(${artist_height})`;
    
    /*Translate SongTitle to left middle */
  
    h_stitle = (songtitle.offsetTop + b_height/3)*randomness_factor;
    stitle_width = (10)*randomness_factor +1;
    stitle_height = (10)*randomness_factor +1;
    songtitle.style.transform = `translateY(${h_stitle}px) scale(${stitle_width}, ${stitle_height})`;
    /*
  
   
*/
    //list of each character:::
    spanList.forEach(function (element) {
        //randomly offset to a number in -x b_width-x / -y b_height-y - increase with randomness factor
        x = element.offsetLeft;
        y = element.offsetTop;
        rand_X = getRandominRange(-x, b_width - x) * randomness_factor;
        rand_Y = getRandominRange(-y, b_height - y) * randomness_factor;

        element.style.transform = `translate(${rand_X}px, ${rand_Y}px) rotate(${getRandominRange(-90, 90)*randomness_factor}deg)`;
        //element.style.fontSize = `${getRandominRange(0.5, 2)*randomness_factor+ 1}em`;


        //element.style.color = `${getRandomColor()}`;
        /*<-- change color of chars based on randomness_factor increase */
        /*
        if (randomness_factor >= 0 && randomness_factor <= 0.05) {
            element.style.color = `${gen_Color(colors.stage01)}`;
        } else if (randomness_factor >= 0.05 && randomness_factor <= 0.1) {
            element.style.color = `${gen_Color(colors.stage02)}`;
            console.log("stage02");
        } else if(randomness_factor >= 0.1 && randomness_factor <= 0.15){
            element.style.color = `${gen_Color(colors.stage03)}`;
            console.log("stage03");
        }
        */
    }); //end character list for each
    console.log(randomness_factor);
}

function getClass(callback) {
    /*_________________________________________________________________get the array with each verse in it*/
    console.log("FETCHING HTML ELEMENTS: ... \n .songtext \n .generated_text_wrapper \n ________")

    var classarr = document.querySelectorAll(".songtext");
    gen_txt_wrapper = document.querySelector(".generated_text_wrapper");
    albumcover = document.querySelector(".albumcover");
    albumcoverimg = document.getElementById("albumcover");
    albumtitle = document.querySelector(".albumtitle");
    songtitle = document.querySelector(".songtitle");
    artist = document.querySelector(".artist");
    wrapper = document.querySelector(".wrapper");
    loading = document.querySelector(".loading");
    callback(classarr);
}

function wrapSpan(classarr) {
    /*_________________________________________________________________make a big txt Array with each verse*/
    /** split verse in single characters and wrap in span: */
    /*(1). Go through all characters of the sentence*/
    /**create div for character and append to gen_txt_wrapper */

    console.log("CLASSARR: " + classarr.length + "\n ________");
    console.log("GEN_TXT_WRAPPER initialized... : \n " + gen_txt_wrapper + "\n________");
    var createdDivs = 0;

    newContent = ""; /*<-- inserted later as new html for document */
    for (var i = 0; i < classarr.length; i++) {
        /*<-- verse-Array */

        var verse = classarr[i].innerText; /*<current verse.txt*/
        var verse_obj = document.createElement('div'); /*<create div to append to */
        verse_obj.setAttribute("class", `verse_${(i+1)}`);
        gen_txt_wrapper.appendChild(verse_obj);

        for (j = 0; j < verse.length; j++) {
            /*<-- go through each verse and create div for each character*/

            var substring = verse.substr(j, 1); /**substr = seperate each character */

            // If we have a character, wrap it in span
            if (substring != " " && substring != "%" && substring != "&") {
                newContent = substring;
            } else if (substring == "%") {
                newContent = "&nbsp"; /*<--space */
            } else if (substring == "&") {
                newContent = "<p>";
            }

            /*append div to current verse_obj */
            if (substring != " ") {
                var spanWrap = document.createElement('div');
                spanWrap.setAttribute("class", `${"gen_Char" + " "+ classarr[i].className}`);
                spanWrap.innerHTML = newContent;

                verse_obj.appendChild(spanWrap);
                spanList.push(spanWrap);
                createdDivs++;
            }
        }
    }
    console.log("CREATED DIVS: " + createdDivs);
} /**end wrap Span */

function gen_Color(color_Array) {
    return color_Array[Math.random() * color_Array.length | 0];
}

function getRandominRange(min, max) {
    return Math.random() * (max - min) + min;
}

//function to switch colors.
function switchColors() {
    var r, g, b, rg, gb, rb;
    var range = 255; // controls the range of r,g,b you would like
    //reduce the range if you want more darker colors
    var sep = range / 4; // controls the minimum separation for saturation
    //note- keep sep < range/3 otherwise may crash browser due to performance
    //reduce the sep if you do not mind pastel colors
    //generate r,g,b, values as long as any difference is < separation
    do {
        r = Math.floor(Math.random() * range);
        g = Math.floor(Math.random() * range);
        b = Math.floor(Math.random() * range);

        rg = Math.abs(r - g);
        gb = Math.abs(g - b);
        rb = Math.abs(r - b);
    } while (rg < sep || gb < sep || rb < sep);

    //convert the rgb to hex

    function rgbtohex(rgb) {
        var first, second; // makes the two hex code for each rgb value

        first = Math.floor(rgb / 16); //get first unit of hex
        second = rgb % 16; //get second unit of hex
        // convert to string with hex base 16
        first = first.toString(16);
        second = second.toString(16);
        //concatenate the two units of the hex
        var rgbtohex = first + second;
        //return the two unit hex code for the r,g,b value
        return rgbtohex;
    }

    //convert the r,g,b numbers to hex code by calling the rgbto hex function
    var r_str = rgbtohex(r),
        g_str = rgbtohex(g),
        b_str = rgbtohex(b);
    //concatenate the final string for the output
    var final = '#' + r_str + g_str + b_str;

    //output random color
    return final;
}