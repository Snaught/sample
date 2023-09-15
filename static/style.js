document.addEventListener('DOMContentLoaded', function() {
    var header = document.querySelector('header');
    // Apply a random color to the header background
    header.style.backgroundColor = getRandomColor();
    
    // Select all h1 elements
    var h1Elements = document.querySelectorAll('h1');
    // Apply a random color to all h1 elements
    var h1Color = getRandomColor();
    h1Elements.forEach(function(element) {
        element.style.color = h1Color;
    });
    
    var aElements = document.querySelectorAll('a');
    // Apply a random color to all h1 elements
    var aColor = getRandomColor();
    aElements.forEach(function(element) {
        element.style.color = aColor;
    });
    
    // Select all button elements
    var buttons = document.querySelectorAll('button');
    var inputs = document.querySelectorAll('input');
    var canvases = document.querySelectorAll('canvas');
    // Apply a random color to all button backgrounds
    var buttonColor = getRandomColor();
    var buttonColor1 = getRandomColor();
    var buttonColor2 = getRandomColor();
    buttons.forEach(function(button) {
        button.style.backgroundColor = buttonColor;
    });
    inputs.forEach(function(input) {
        input.style.backgroundColor = buttonColor1;
    });
    canvases.forEach(function(canvas) {
        canvas.style.border = '1px solid ' + buttonColor2;
    });

    
    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
});