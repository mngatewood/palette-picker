[![Build Status](https://travis-ci.org/mngatewood/palette-picker.svg?branch=master)](https://travis-ci.org/mngatewood/palette-picker)

# Palette Picker

![Screenshot](https://raw.githubusercontent.com/mngatewood/palette-picker/master/public/readme/Screen%20Shot%202018-05-31%20at%209.13.29%20AM.png)

## Synopsis

Palette Picker is an application that allows the user to display a collection of random colors and selectively save chosen colors to a project.  

[Production Build](https://palette-picker-heroku.herokuapp.com/)

## Installing Palette Picker

1. [Clone this repository to your local machine.](https://help.github.com/articles/cloning-a-repository/).

2. Navigate to palette-picker in your terminal by typing `cd palette-picker`.

3. Run `npm install` from your terminal.

4. Run `npm start` from your terminal.

Palette Picker will build and run on localhost:3000.

-- or --

Run the production build [here](https://palette-picker-heroku.herokuapp.com/)

## Testing Palette Picker

1. Navigate to the palette-picker directory in your terminal. 

2. Run `npm test` from your terminal. 

## Using Palette Picker

When the spin button is clicked, the application will display five random colors on the screen.  Clicking the lock button beneath the individual colors will "lock-in" that color and prevent it from changing when the spin button is subsequently clicked.  When the user is satisfied with the selection of colors, they may create a project folder in which to save their chosen palette.  To create a project, enter a name in the field titled "Enter Project Name" and click the "Create Project" button.  To save a palette, enter a name in the field titled "Enter Palette Name", select a saved project in which to save the palette, and click the "Save Palette" button.  Projects and palettes will be displayed at the bottom of the screen.

## Built With

* JavaScript
* jQuery
* CSS
* Express
* Knex
* Tested with Mocha and Chai

## Contributors

[Michael Gatewood](https://github.com/mngatewood)


