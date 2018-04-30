const colorOne = '#' + Math.floor(Math.random() * 16777215).toString(16);
const colorTwo = '#' + Math.floor(Math.random() * 16777215).toString(16);
const colorThree = '#' + Math.floor(Math.random() * 16777215).toString(16);
const colorFour = '#' + Math.floor(Math.random() * 16777215).toString(16);
const colorFive = '#' + Math.floor(Math.random() * 16777215).toString(16);

$('#header-palette-one').css('background-color', colorOne);
$('#header-palette-two').css('background-color', colorTwo);
$('#header-palette-three').css('background-color', colorThree);
$('#header-palette-four').css('background-color', colorFour);
$('#header-palette-five').css('background-color', colorFive);

$('#header-button-refresh').click( () => {
  alert('Handler for .click() called.');
});
