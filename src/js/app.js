//
// APP
//

document.addEventListener('DOMContentLoaded', function(){
    console.log('ready');
});

var openNav = $('.open-nav');
var blocker = $('.blocker');

openNav.click(function() {
  $('body').addClass('nav-open');
});

blocker.click(function() {
  $('body').removeClass('nav-open');
})