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
    // Apply a random color to all button backgrounds
    var buttonColor = getRandomColor();
    buttons.forEach(function(button) {
        button.style.backgroundColor = buttonColor;
    });
    inputs.forEach(function(input) {
        input.style.backgroundColor = buttonColor;
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