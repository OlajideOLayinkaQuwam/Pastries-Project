

const loaderContainer = document.querySelector('.loader-container')
		const pageContent=document.querySelector('#page-content')
		window.addEventListener('load', ()=>{
                  loaderContainer.classList.add('hidden')
				  pageContent.classList.add('visible')



    })

  /* =========================
   GSAP Scroll Animation
   Slides element in from left, holds it in center for reading,
   then slides it out to the right when scrolled past.
   Works for multiple elements with the class .text-container.
   ========================= */

/* Register the ScrollTrigger plugin with GSAP so we can use scroll-based triggers.
   This must be called once before using ScrollTrigger. */
gsap.registerPlugin(ScrollTrigger);

/* gsap.utils.toArray converts a selector or NodeList into a real array.
   Here we select every element with the class "text-container" so each can have its own timeline. */
const containers = gsap.utils.toArray(".cta-animation");

/* Loop over every found container and create a scroll-linked timeline for each one.
   Using a separate timeline per element avoids conflicts when multiple elements are on the page. */
containers.forEach((container) => {

  /* Create a timeline instance for this specific container.
     We configure ScrollTrigger inside the timeline so the whole timeline is controlled by scrolling. */
  const tl = gsap.timeline({
    scrollTrigger: {
      /* The element that will start/end the scroll-based animation */
      trigger: container,

      /* When the top of the trigger hits 80% down from the top of the viewport, the animation starts.
         Format: "triggerEdge viewportEdge" (e.g., "top 80%"). Adjust to taste. */
      start: "top 100%",

      /* When the bottom of the trigger reaches 20% from the top of the viewport, the animation ends.
         This gives us a scoll window where the element is visible and the timeline runs. */
      end: "bottom 20%",

      /* scrub: true links the timeline progress to the scrollbar position.
         That makes the animation smooth and reversible as you scroll up/down. */
      scrub: true,

      /* markers: false hides the debug markers. Set to true while developing to see start/end lines. */
      markers: false,

      /* Optionally, you can add once: false to allow repeated triggers; by default scrub + the timeline
         will be reversible as you scroll. We leave defaults for typical behavior. */
    }
  });

  /* ---------------------------------------------------------
     TIMELINE STEPS
     We define three main steps on the timeline:
       1) fromTo() - slide in from the left and fade in
       2) hold()   - keep it centered so user can read
       3) to()     - slide out to the right and fade out
     Because the timeline is scrubbed by ScrollTrigger, these steps map to scroll position.
     --------------------------------------------------------- */

  /* Step 1: Slide in from the left and fade in.
     - We use fromTo so we explicitly control starting and ending values.
     - x: -200 moves it 200px left from its natural position (you can use percentages if desired).
     - opacity: 0 starts it invisible and ends at 1 (visible).
     - duration here is a timeline duration reference; with scrub the actual timing is tied to scroll distance. */
  tl.fromTo(container,
    { x: -1000, opacity: 0 },           // from: slightly left and invisible
    { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" } // to: centered and visible
  );

  /* Step 2: Hold / pause while visible.
     - We add a small tween that keeps the element at x:0 and opacity:1.
     - This creates a small section of the timeline where the element remains readable in the center.
     - Increase the duration value to make the 'hold' section larger (so it stays visible for a longer scroll distance). */
  tl.to(container,
    { x: 0, opacity: 1, duration: 0.8 } // hold in place; duration controls how much scroll distance this hold occupies
  );

  /* Step 3: Slide out to the right and fade out.
     - x: 200 moves it off to the right by 200px.
     - opacity: 0 fades it out as it leaves.
     - ease: "power2.in" makes the exit feel natural as it accelerates away. */
  tl.to(container,
    { x: 100, opacity: 0, duration: 0.6, ease: "power2.in" } // exit to the right
  );

  /* NOTE: Because scrub is true, when the user scrolls back up the timeline reverses:
     - The element will re-enter from the left, hold, then exit to the right again as appropriate.
     - If you prefer the element to re-appear from the right when scrolling up, we would need a different logic;
       this code keeps entry-from-left / exit-to-right behavior both directions so the element is readable.
   */
});







let menuIcon =document.querySelector('.menu-bar svg');

let navLinks =document.querySelector('.nav-links');


 // Toggle menu on click
    menuIcon.addEventListener('click', (e) => {
      e.stopPropagation(); // prevent triggering body click
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        navLinks.classList.add('hide');
      } else {
        navLinks.classList.remove('hide');
        navLinks.classList.add('active');
      }
    });

    // Hide menu when clicking outside or on a link
    document.body.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        navLinks.classList.add('hide');
      }
    });

    // Prevent closing when clicking inside the menu
    navLinks.addEventListener('click', (e) => {
      e.stopPropagation();
    });






 // Register ScrollTrigger plugin with GSAP
  gsap.registerPlugin(ScrollTrigger);

  // Select all items in the gallery (each one contains an image and optional text)
  const items = document.querySelectorAll(".slidese");

  // Loop through every gallery item individually
  items.forEach((item, index) => {
    // Get the image inside this gallery item
    const img = item.querySelector("img");

    // Get the optional text (caption) if it exists
    const caption = item.querySelector(".caption");

    // Add optional safety for lazy loading — wait until the image is loaded
    if (!img.complete) {
      img.addEventListener("load", () => createAnimation(item, img, caption, index));
    } else {
      // If the image is already loaded, create the animation immediately
      createAnimation(item, img, caption, index);
    }
  });

  // This function creates the animation for each image (and its caption if available)
  function createAnimation(item, img, caption, index) {
    // Decide the slide direction pattern
    // index % 3 → pattern repeats every 3 items: left, right, bottom
    let direction;
    if (index % 3 === 0) direction = { x: -100, y: 0 };  // slide from left
    else if (index % 3 === 1) direction = { x: 100, y: 0 }; // slide from right
    else direction = { x: 0, y: 100 }; // slide from bottom

    // Create the GSAP animation
    gsap.fromTo(
      [img, caption], // Animate both the image and text (if text exists)
      {
        ...direction, // Start from the chosen direction (left/right/bottom)
        opacity: 0,   // Start invisible
      },
      {
        x: 0,          // End at original position
        y: 0,
        opacity: 1,    // Become visible
        duration: 1,   // Animation lasts 1 second
        ease: "power2.out", // Smooth easing for natural motion
        scrollTrigger: {
          trigger: item,   // Each gallery item triggers its own animation
          start: "top 90%", // Animation starts when item is near bottom of viewport
          end: "top 10%",   // Animation ends when item scrolls toward the top
          scrub: true,      // Makes animation tied to scroll — move in/out smoothly
          toggleActions: "play none none reverse", // Play on enter, reverse on leave
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

















