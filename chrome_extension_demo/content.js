// var script = document.createElement('script');
// script.src = 'https://code.jquery.com/jquery-3.1.1.min.js';
// script.type = 'text/javascript';
// document.getElementsByTagName('head')[0].appendChild(script);

console.log("Hello world");


$('div').click(function(a) {
    a.preventDefault()
});

$('iframe').click(function(a) {
    a.preventDefault()
    $(this).text('bye iframe');
    $(this).hide(3000, "linear");
});

$('a').click(function(a) {
    a.preventDefault()
    $(this).text('bye link');
    $(this).hide(3000, "linear");
});

$('header').click(function(a) {
    a.preventDefault()
    $(this).text('bye header');
    $(this).hide(3000, "linear");
});

$('h1').click(function(a) {
    a.preventDefault()
    $(this).text('bye h1');
    $(this).hide(3000, "linear");
});

$('h2').click(function(a) {
    a.preventDefault()
    $(this).text('bye h2');
    $(this).hide(3000, "linear");
});

$('h3').click(function(a) {
    a.preventDefault()
    $(this).text('bye h3');
    $(this).hide(3000, "linear");
});

$('h4').click(function(a) {
    a.preventDefault()
    $(this).text('bye h4');
    $(this).hide(3000, "linear");
});


$('h5').click(function(a) {
    a.preventDefault()
    $(this).text('bye h5');
    $(this).hide(3000, "linear");
});

$('h6').click(function(a) {
    a.preventDefault()
    $(this).text('bye h6');
    $(this).hide(3000, "linear");
});

$('p').click(function(a) {
    a.preventDefault()
    $(this).text('bye p');
    $(this).hide(3000, "linear");
});



$('img').click(function(a) {
    a.preventDefault()
    $(this).text('bye img');
    $(this).hide(3000, "linear");
});

$('fieldset').click(function(a) {
    a.preventDefault()
    $(this).text('bye field');
    $(this).hide(3000, "linear");
});

$('form').click(function(a) {
    a.preventDefault()
    $(this).text('bye form');
    $(this).hide(3000, "linear");
});

$('span').click(function(a) {
    a.preventDefault()
    $(this).text('bye span');
    $(this).hide(3000, "linear");
});

$('ul').click(function(a) {
    a.preventDefault()
    $(this).text('bye list');
    $(this).hide(3000, "linear");
});

$('li').click(function(a) {
    a.preventDefault()
    $(this).text('bye list');
    $(this).hide(3000, "linear");
});
