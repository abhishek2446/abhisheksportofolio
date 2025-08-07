let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    menu.classList.remove('bx-x');
    navbar.classList.remove('active');
}

const typed = new Typed('#multiple-text',  {
    strings: ['Web Developer','Graphic Designer','Content Creator','Video Editor','Ads Expert','Freelancing Expert'],
    typeSpeed: 80,
    backSpeed: 80,
    backDelay: 1200,
    loop: true,
 });
 const typeds = new Typed('#multiple-text1',  {
    strings: ['Web Developer','Graphic Designer','Content Creator','Video Editor','Ads Expert','Freelancing Expert'],
    typeSpeed: 150,
    backSpeed: 80,
    backDelay: 1200,
    loop: true,
 });