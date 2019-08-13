//change color of classes:
//__COLOR01 : BLACK | __COLOR01_TRI_bottomleft/middle/topleft/topright for triangle bottom left
//__COLOR02 : RED
//__COLOR03 : DARK_PURPLE
//__COLOR04 : PURPLE
//__COLOR05 : LIGHT_PURPLE
var background_col = "marine"
var color01 = "black";
var color02 = "red";
var color03 = "#3500a0";
var color04 = "purple";
var color05 = "#5a2cb6";

//used to stop/start animation:
var run_Animation = true;
var color_animation;

//used for link after :
var link_url = "";
/**Color Array: */
const colors = [
    "#63b598", "#ce7d78", "#ea9e70", "#a48a9e", "#c6e1e8", "#648177", "#0d5ac1",
    "#f205e6", "#1c0365", "#14a9ad", "#4ca2f9", "#a4e43f", "#d298e2", "#6119d0",
    "#d2737d", "#c0a43c", "#f2510e", "#651be6", "#79806e", "#61da5e", "#cd2f00",
    "#9348af", "#01ac53", "#c5a4fb", "#996635", "#b11573", "#4bb473", "#75d89e",
    "#2f3f94", "#2f7b99", "#da967d", "#34891f", "#b0d87b", "#ca4751", "#7e50a8",
    "#c4d647", "#e0eeb8", "#11dec1", "#289812", "#566ca0", "#ffdbe1", "#2f1179",
    "#935b6d", "#916988", "#513d98", "#aead3a", "#9e6d71", "#4b5bdc", "#0cd36d",
    "#250662", "#cb5bea", "#228916", "#ac3e1b", "#df514a", "#539397", "#880977",
    "#f697c1", "#ba96ce", "#679c9d", "#c6c42c", "#5d2c52", "#48b41b", "#e1cf3b",
    "#5be4f0", "#57c4d8", "#a4d17a", "#225b8", "#be608b", "#96b00c", "#088baf",
    "#f158bf", "#e145ba", "#ee91e3", "#05d371", "#5426e0", "#4834d0", "#802234",
    "#6749e8", "#0971f0", "#8fb413", "#b2b4f0", "#c3c89d", "#c9a941", "#41d158",
    "#fb21a3", "#51aed9", "#5bb32d", "#807fb", "#21538e", "#89d534", "#d36647",
    "#7fb411", "#0023b8", "#3b8c2a", "#986b53", "#f50422", "#983f7a", "#ea24a3",
    "#79352c", "#521250", "#c79ed2", "#d6dd92", "#e33e52", "#b2be57", "#fa06ec",
    "#1bb699", "#6b2e5f", "#64820f", "#1c271", "#21538e", "#89d534", "#d36647",
    "#7fb411", "#0023b8", "#3b8c2a", "#986b53", "#f50422", "#983f7a", "#ea24a3",
    "#79352c", "#521250", "#c79ed2", "#d6dd92", "#e33e52", "#b2be57", "#fa06ec",
    "#1bb699", "#6b2e5f", "#64820f", "#1c271", "#9cb64a", "#996c48", "#9ab9b7",
    "#06e052", "#e3a481", "#0eb621", "#fc458e", "#b2db15", "#aa226d", "#792ed8",
    "#73872a", "#520d3a", "#cefcb8", "#a5b3d9", "#7d1d85", "#c4fd57", "#f1ae16",
    "#8fe22a", "#ef6e3c", "#243eeb", "#1dc18", "#dd93fd", "#3f8473", "#e7dbce",
    "#421f79", "#7a3d93", "#635f6d", "#93f2d7", "#9b5c2a", "#15b9ee", "#0f5997",
    "#409188", "#911e20", "#1350ce", "#10e5b1", "#fff4d7", "#cb2582", "#ce00be",
    "#32d5d6", "#17232", "#608572", "#c79bc2", "#00f87c", "#77772a", "#6995ba",
    "#fc6b57", "#f07815", "#8fd883", "#060e27", "#96e591", "#21d52e", "#d00043",
    "#b47162", "#1ec227", "#4f0f6f", "#1d1d58", "#947002", "#bde052", "#e08c56",
    "#28fcfd", "#bb09b", "#36486a", "#d02e29", "#1ae6db", "#3e464c", "#a84a8f",
    "#911e7e", "#3f16d9", "#0f525f", "#ac7c0a", "#b4c086", "#c9d730", "#30cc49",
    "#3d6751", "#fb4c03", "#640fc1", "#62c03e", "#d3493a", "#88aa0b", "#406df9",
    "#615af0", "#4be47", "#2a3434", "#4a543f", "#79bca0", "#a8b8d4", "#00efd4",
    "#7ad236", "#7260d8", "#1deaa7", "#06f43a", "#823c59", "#e3d94c", "#dc1c06",
    "#f53b2a", "#b46238", "#2dfff6", "#a82b89", "#1a8011", "#436a9f", "#1a806a",
    "#4cf09d", "#c188a2", "#67eb4b", "#b308d3", "#fc7e41", "#af3101", "#ff065",
    "#71b1f4", "#a2f8a5", "#e23dd0", "#d3486d", "#00f7f9", "#474893", "#3cec35",
    "#1c65cb", "#5d1d0c", "#2d7d2a", "#ff3420", "#5cdd87", "#a259a4", "#e4ac44",
    "#1bede6", "#8798a4", "#d7790f", "#b2c24f", "#de73c2", "#d70a9c", "#25b67",
    "#88e9b8", "#c2b0e2", "#86e98f", "#ae90e2", "#1a806b", "#436a9e", "#0ec0ff",
    "#f812b3", "#b17fc9", "#8d6c2f", "#d3277a", "#2ca1ae", "#9685eb", "#8a96c6",
    "#dba2e6", "#76fc1b", "#608fa4", "#20f6ba", "#07d7f6", "#dce77a", "#77ecca"
]
//gets word wrapper 'letters'-> used globally
var word_wrapper = document.getElementsByClassName("letters")[0];
var animation_indicator = document.getElementsByClassName("animation_indicator")[0];


/**____________________________________________________________________________________
 * ___Main_______________________________________________________________________________
 * ____________________________________________________________________________________
 */

//colorize once to have random loading page:
color01 = colors[Math.floor(Math.random() * colors.length)];
color02 = colors[Math.floor(Math.random() * colors.length)];
color03 = colors[Math.floor(Math.random() * colors.length)];
color04 = colors[Math.floor(Math.random() * colors.length)];
color05 = colors[Math.floor(Math.random() * colors.length)];
background_col = colors[Math.floor(Math.random() * colors.length)];
colorize();

//start animations when page is loaded:
color_animation();
flyin_animation();

//Stop and start color_animation on mousclick
document.addEventListener("click", function () {
    run_Animation = !run_Animation;
    console.log("runAnimation:" + run_Animation);
    if (run_Animation) {
        color_animation();//restart the animation if true;
        animation_indicator.innerHTML = `click to stop animation`;
    } else {
        animation_indicator.innerHTML = `click to start animation`;
    }
});

/**Each link in the menu gets a listener,
 * when clicking on a link, the link gets supressed until the 'flyout_animation'
 * is done -> the animation calls the link passed in event after it is done::
 */
var menu = document.querySelectorAll('.menu a');
menu.forEach(element => {
    element.addEventListener('click', function (event) {
        event.preventDefault();
        clearInterval(color_animation); //stop animating colors, this prevents positional debugs
        flyout_animation(event);
    });
});



/**____________________________________________________________________________________
 * ___Functions_______________________________________________________________________________
 * ____________________________________________________________________________________
 */
function color_animation() {
    var frames = 0;
    let color_animation = setInterval(frame, 1500); //used globally to unset in flyout animation

    function frame() {
        if (!run_Animation) {
            clearInterval(color_animation);
            console.log("___Endloop: flyin_animation FRAME:" + frames);
        } else {
            //apply animation here //99 instead of 100 to account for the last frame
            color01 = colors[Math.floor(Math.random() * colors.length)];
            color02 = colors[Math.floor(Math.random() * colors.length)];
            color03 = colors[Math.floor(Math.random() * colors.length)];
            color04 = colors[Math.floor(Math.random() * colors.length)];
            color05 = colors[Math.floor(Math.random() * colors.length)];
            background_col = colors[Math.floor(Math.random() * colors.length)];
            colorize();
            frames++;
        }
    }
}


function flyin_animation() {
    /*Animate that letters flies in from the bottom to the middle of the screen*/
    var flyin_animation = setInterval(frame, 0.03);

    var frames = 0;
    var end_frame = 100;

    function frame() {
        var anim_percent = Math.floor((frames / end_frame) * 100); //get the percentage of the animation
        if (anim_percent == 100) {
            clearInterval(flyin_animation);
            console.log("___Endloop: flyin_animation FRAME:" + frames);
        } else {
            word_wrapper.style.transform = `translateY(${99 - anim_percent}vw)`; //99 instead of 100 to account for the last frame
            frames++;
        }
    }
}

function flyout_animation(event) {
    /**gets called when the clicked listener of .menu a links are clicked, 
     * the link doesnt get called, instead the letters flyout with this animation ->
     * after the animation is done the link gets called;
     */
    var flyin_animation = setInterval(frame, 0.2);

    var frames = 0;
    var end_frame = 100;

    function frame() {
        var anim_percent = Math.floor((frames / end_frame) * 100); //get the percentage of the animation
        if (anim_percent == 100) {
            clearInterval(flyin_animation);
            console.log("___Endloop: flyout_animation FRAME:" + frames + " call linked url:");
            url = event.target.href;
            window.open(url, '_self');
        } else {
            word_wrapper.style.transform = `translateY(${0 + anim_percent}vw)`; //99 instead of 100 to account for the last frame
            frames++;
        }
    }
}

function colorize() {
    //___BLACK COLOR TO:
    change_Color("__COLOR01", color01, "Background");
    change_Color("__COLOR01_TRI_bottomleft", color01, "borderCol_bottomleft")
    //___RED COLOR TO
    change_Color("__COLOR02", color02, "Background");
    change_Color("__COLOR02_TRI_bottomleft", color02, "borderCol_bottomleft");
    //___DARK_PURPLE TO
    change_Color("__COLOR03", color03, "Background");
    change_Color("__COLOR03_TRI_middle", color03, "borderCol_middle")
    change_Color("__COLOR03_TRI_topleft", color03, "borderCol_topleft");
    //___PURPLE TO 
    change_Color("__COLOR04", color04, "Background");
    change_Color("__COLOR04_TRI_topright", color04, "borderCol_topright");
    change_Color("__COLOR04_TRI_topleft", color04, "borderCol_topleft");
    //___LIGHT PURPLE TO
    change_Color("__COLOR05", color05, "Background");
    change_Color("__COLOR05_TRI_middle", color05, "borderCol_middle");
    change_Color("__COLOR05_TRI_bottomleft", color05, "borderCol_bottomleft");
    change_Color("__COLOR05_TRI_topleft", color05, "borderCol_topleft");

    //___CHANGE BACKGROUND TO
    document.body.style.backgroundColor = background_col;

    //___CHANGE INDICATOR BACK TO
    change_Color("animation_indicator", increase_brightness(background_col, 10), "Background");
    change_Color("animation_indicator", increase_brightness(background_col, 85), "color");
    change_Color("animation_indicator", increase_brightness(background_col, -75), "shadow");
}


function change_Color(element_className, Css_color, MODE) {
    elements = document.getElementsByClassName(element_className);

    for (var i = 0; i < elements.length; i++) {

        if (MODE == "Background") {
            elements[i].style.backgroundColor = Css_color;
        } else if (MODE == "borderCol_bottomleft") {
            elements[i].style.borderColor = `transparent transparent transparent ${Css_color}`;
        } else if (MODE == "borderCol_middle") {
            elements[i].style.borderColor = `${Css_color} transparent transparent transparent`;
        } else if (MODE == "borderCol_topleft") {
            elements[i].style.borderColor = `${Css_color} transparent transparent transparent`;
        } else if (MODE == "borderCol_topright") {
            elements[i].style.borderColor = `transparent ${Css_color} transparent transparent `;
        } else if (MODE == "color") {
            elements[i].style.color = `${Css_color}`;
        } else if (MODE == "shadow") {
            elements[i].style.textShadow = `2px 2px ${Css_color}`;
        }

    }
}

function increase_brightness(hex, percent) {
    /**CODE 'IN THIS FUNCTION' TAKEN FROM->
     * https://stackoverflow.com/questions/6443990/javascript-calculate-brighter-colour 
     * 26.06.2019
     */
    // strip the leading # if it's there
    hex = hex.replace(/^\s*#|\s*$/g, '');

    // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
    if (hex.length == 3) {
        hex = hex.replace(/(.)/g, '$1$1');
    }

    var r = parseInt(hex.substr(0, 2), 16),
        g = parseInt(hex.substr(2, 2), 16),
        b = parseInt(hex.substr(4, 2), 16);

    return '#' +
        ((0 | (1 << 8) + r + (256 - r) * percent / 100).toString(16)).substr(1) +
        ((0 | (1 << 8) + g + (256 - g) * percent / 100).toString(16)).substr(1) +
        ((0 | (1 << 8) + b + (256 - b) * percent / 100).toString(16)).substr(1);
}