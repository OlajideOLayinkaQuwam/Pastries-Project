

const loaderContainer = document.querySelector('.loader-container')
		const pageContent=document.querySelector('#page-content')
		window.addEventListener('load', ()=>{
                  loaderContainer.classList.add('hidden')
				  pageContent.classList.add('visible')



    })

 


gsap.registerPlugin(ScrollTrigger);


const containers = gsap.utils.toArray(".cta-animation");


containers.forEach((container) => {


  const tl = gsap.timeline({
    scrollTrigger: {
      
      trigger: container,

    
      start: "top 100%",

      end: "bottom 20%",


      scrub: true,

     
      markers: false,


    }
  });


  tl.fromTo(container,
    { x: -1000, opacity: 0 },           
    { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
  );


  tl.to(container,
    { x: 0, opacity: 1, duration: 0.8 } 
  );


  tl.to(container,
    { x: 100, opacity: 0, duration: 0.6, ease: "power2.in" } 
  );



});







let menuIcon =document.querySelector('.menu-bar svg');

let navLinks =document.querySelector('.nav-links');


    menuIcon.addEventListener('click', (e) => {
      e.stopPropagation(); 
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        navLinks.classList.add('hide');
      } else {
        navLinks.classList.remove('hide');
        navLinks.classList.add('active');
      }
    });

    document.body.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        navLinks.classList.add('hide');
      }
    });

    navLinks.addEventListener('click', (e) => {
      e.stopPropagation();
    });






  gsap.registerPlugin(ScrollTrigger);

  const items = document.querySelectorAll(".slidese");

  items.forEach((item, index) => {
    const img = item.querySelector("img");

    const caption = item.querySelector(".caption");

    if (!img.complete) {
      img.addEventListener("load", () => createAnimation(item, img, caption, index));
    } else {
      createAnimation(item, img, caption, index);
    }
  });

 
  function createAnimation(item, img, caption, index) {
  
    let direction;
    if (index % 3 === 0) direction = { x: -100, y: 0 };  
    else if (index % 3 === 1) direction = { x: 100, y: 0 }; 
    else direction = { x: 0, y: 100 }; 

    
    gsap.fromTo(
      [img, caption], 
      {
        ...direction, 
        opacity: 0,  
      },
      {
        x: 0,          
        y: 0,
        opacity: 1,   
        duration: 1,   
        ease: "power2.out",
        scrollTrigger: {
          trigger: item,
          start: "top 90%", 
          end: "top 10%",   
          scrub: true,      
          toggleActions: "play none none reverse",
        },
      }
    );
  }



const mediaQuery = window.matchMedia('(max-width:68.875rem)');
const mediaQuery1 = window.matchMedia('(max-width:57.8125rem)');

const text = document.querySelector('.text3');
const text1 = document.querySelector('.text4');
const text2 = document.querySelector('.text-8');
const text3 = document.querySelector('.text-9');
const text4 = document.querySelector('.text-10');



let mediaChange = (e)=>{
if(e.matches){
    text.textContent= 'Bringing joy to your all your celebrations'
    text1.textContent ='Let make every occasion unforgettable'

    text2.textContent= 'You are in the Right place for your Events'
    text3.textContent ='Made with love served with joy'
   text4.textContent = 'Let make today a little sweeter together'

}
else{
    text.textContent = 'There is always something sweet waiting to brighten your day'
    text1.textContent = 'Whether you are planning an event or just craving  a treat'

    text2.textContent = 'Pastries & Events crafted with passion and purpose ✍️'
    text3.textContent = 'Freshly baked, beautiful made and lovely shared'
    text4.textContent = 'Creating moments that taste as good as they look'

}
}


mediaChange(mediaQuery,mediaQuery1)
mediaQuery.addEventListener('change', mediaChange)
mediaQuery1.addEventListener('change', mediaChange)


















