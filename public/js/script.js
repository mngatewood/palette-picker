const randomNumber = () => {
  return Math.floor(Math.random() * 16777215).toString(16);
}

const refreshPalette = () => {
  const colorOne = ('#' + randomNumber() + '0').substring(0, 7);
  const colorTwo = ('#' + randomNumber() + '0').substring(0, 7);
  const colorThree = ('#' + randomNumber() + '0').substring(0, 7);
  const colorFour = ('#' + randomNumber() + '0').substring(0, 7);
  const colorFive = ('#' + randomNumber() + '0').substring(0, 7);
  
  $('#header-palette-one').css('background-color', colorOne);
  $('#header-palette-two').css('background-color', colorTwo);
  $('#header-palette-three').css('background-color', colorThree);
  $('#header-palette-four').css('background-color', colorFour);
  $('#header-palette-five').css('background-color', colorFive);
  
  $('#header-palette-one span').text(colorOne);
  $('#header-palette-two span').text(colorTwo);
  $('#header-palette-three span').text(colorThree);
  $('#header-palette-four span').text(colorFour);
  $('#header-palette-five span').text(colorFive);
}

refreshPalette();

$('#main-button-refresh').click( () => {
  refreshPalette();
});

$('.lock-button').click( (event) => {
  $(event.target).toggleClass("selected");
});
