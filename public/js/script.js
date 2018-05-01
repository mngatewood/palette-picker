let randomNumber = Math.floor(Math.random() * 16777215).toString(16);
let randomHex = '#' + randomNumber;

const colorOnePre = '#' + Math.floor(Math.random() * 16777215).toString(16);
const colorTwoPre = '#' + Math.floor(Math.random() * 16777215).toString(16);
const colorThreePre = '#' + Math.floor(Math.random() * 16777215).toString(16);
const colorFourPre = '#' + Math.floor(Math.random() * 16777215).toString(16);
const colorFivePre = '#' + Math.floor(Math.random() * 16777215).toString(16);
const colorOne = '#' + Math.floor(Math.random() * 16777215).toString(16);
const colorTwo = '#' + Math.floor(Math.random() * 16777215).toString(16);
const colorThree = '#' + Math.floor(Math.random() * 16777215).toString(16);
const colorFour = '#' + Math.floor(Math.random() * 16777215).toString(16);
const colorFive = '#' + Math.floor(Math.random() * 16777215).toString(16);
const colorOnePost = '#' + Math.floor(Math.random() * 16777215).toString(16);
const colorTwoPost = '#' + Math.floor(Math.random() * 16777215).toString(16);
const colorThreePost = '#' + Math.floor(Math.random() * 16777215).toString(16);
const colorFourPost = '#' + Math.floor(Math.random() * 16777215).toString(16);
const colorFivePost = '#' + Math.floor(Math.random() * 16777215).toString(16);


// document.getElementById("header-palette-one-pre").style.backgroundImage = "-webkit-linear-gradient("#000" , " + colorOnePre + ")"
// $('#header-palette-two-pre').css('background-color', colorTwoPre);
// $('#header-palette-three-pre').css('background-color', colorThreePre);
// $('#header-palette-four-pre').css('background-color', colorFourPre);
// $('#header-palette-five-pre').css('background-color', colorFivePre);
$('#header-palette-one').css('background-color', colorOne);
$('#header-palette-two').css('background-color', colorTwo);
$('#header-palette-three').css('background-color', colorThree);
$('#header-palette-four').css('background-color', colorFour);
$('#header-palette-five').css('background-color', colorFive);
// $('#header-palette-one-post').css('background-color', colorOnePost);
// $('#header-palette-two-post').css('background-color', colorTwoPost);
// $('#header-palette-three-post').css('background-color', colorThreePost);
// $('#header-palette-four-post').css('background-color', colorFourPost);
// $('#header-palette-five-post').css('background-color', colorFivePost);

$('#header-button-refresh').click( () => {
  alert('Handler for .click() called.');
});
