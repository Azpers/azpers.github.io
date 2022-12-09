/* ALL VARIABLES */

const navBar = document.querySelector('nav');
const navButton = navBar.querySelector('button');
const navBarDropdown = document.querySelector('.navbar-dropdown');
const treeSvg = document.querySelector('.tree');
const treeAllButTextSvg = Array.from(treeSvg.querySelectorAll('use, g, #leafs, #squirrel-right, #squirrel-left')); // Need to target infinite animations individually so they'll stop during .tree-up animation
const treeInfiniteAnimations = Array.from(treeSvg.querySelectorAll('.tree-bushes path, .leafs, .squirrel-right, .squirrel-left')); //treeInfiniteAnimations.forEach(element => element.style.animationPlayState = 'paused')
const textSvg = Array.from(treeSvg.querySelectorAll('.position'));
const hexagonSvg = treeSvg.querySelector('.hexagon');
const soilSvg = treeSvg.querySelector('.soil');
const pillar = document.querySelector('.pillar');
const pillarRocks = pillar.firstElementChild;
const bannerAll = Array.from(pillar.querySelectorAll('use, text'));
const pillarLeafs = pillar.querySelector('.pillar-leafs');

/* TREE-PILLAR ANIMATION FUNCTIONS */

function treeIn() {
    treeSvg.classList.remove('tree-in');

    treeAllButTextSvg.forEach((element) => {
        if (element.hasAttribute('class') && element.classList.contains('soil')) {
            element.classList.add('soil-animation-fade');
        } else {
            element.classList.add('tree-out');
        }
    });
};
function treeOut() {
    treeSvg.classList.add('tree-up');

    textSvg.forEach((text) => {
        text.classList.remove('animation-name-in', 'animation-lastName-in', 'animation-portfolio-in');
        text.classList.add('animation-name-up-js');
    });
};
function treeBackIn(callback) {
    navBar.classList.add('appear');
    hexagonSvg.classList.add('hexagon-animation');
    hexagonSvg.addEventListener('animationend', () => {
        treeAllButTextSvg.forEach((element) => {
            if (element.hasAttribute('class') && element.classList.contains('soil')) {
                element.classList.replace('soil-animation-fade', 'soil-animation-back-in')
            } else {
                element.classList.replace('tree-out', 'tree-back-in');
            }
        });
        callback();
    });
};

function pillarIn() {
    pillarRocks.classList.add('pillar-animation-in');
};

function rocksAlign(callback2, callback3) {
    pillarRocks.children[12].addEventListener('animationend', () => {
        pillarRocks.classList.replace('pillar-animation-in', 'pillar-animation-align');
        callback2(callback3);

    });
};

function bannerIn(callback3) {
    pillarRocks.children[9].addEventListener(('animationend'), ()  => {
            bannerAll.forEach((element, index) => {

                element.classList.contains('pillar-banner') ? 
                  element.classList.add('pillar-banner-animation') : 

                element.classList.contains('pillar-holder-1') ? 
                    element.classList.add('pillar-holder-1-animation') : 

                element.classList.contains('pillar-holder-2') ? 
                    element.classList.add('pillar-holder-2-animation') : 

                element.classList.contains('pillar-scroll-3') ? 
                    element.classList.add('pillar-scroll-3-animation') : 

                  element.classList.contains('pillar-scroll-2') ? 
                    element.classList.add('pillar-scroll-2-animation') : 

                element.classList.contains('pillar-scroll-1') ? 
                    element.classList.add('pillar-scroll-1-animation') : 

                element.classList.contains('pillar-text') && element.innerHTML.includes('About') ? 
                 element.classList.add('pillar-text-about-me') : 

                element.classList.contains('pillar-text') && element.innerHTML.includes('Projects') ? 
                  element.classList.add('pillar-text-projects') : 

                element.classList.contains('pillar-text') && element.innerHTML.includes('Get') ? 
                  element.classList.add('pillar-text-get-in-touch') : 
                    console.log(`${index} was not found`);
        });
        callback3();
    });
}
function pillarLeafsIn() {
    const bannerLastAnimation = bannerAll.find(element => element.classList.contains('pillar-text-get-in-touch'));
    bannerLastAnimation.addEventListener('animationend', () => {
        pillarLeafs.classList.add('pillar-leafs-animation');
    });
}
/* TREE-PILLAR-ANIMATION */

treeSvg.addEventListener('click', () => {
    
    if (treeSvg.classList.contains("tree-in")) {
        treeIn()
        treeOut(),
        treeBackIn(pillarIn),
        rocksAlign(bannerIn, pillarLeafsIn)   
    };
});

/* NAV BAR */

function navDropDownClick(e) {
    if (e.target.closest('button').getAttribute('aria-expanded') === 'true') {
        navButton.removeEventListener('click', navDropDownClick);
        setTimeout(() => { 
            document.addEventListener('click', navDropdownClose);
        }, 300);
        return (console.log('passing through'));
    } else if (e.target.closest('button').getAttribute('aria-expanded') === 'false') {
        console.log('closing dropdown');
    };
}
function navDropdownClose(e) {
 if (e.target.innerHTML.includes('About')) {
        document.removeEventListener('click', navDropdownClose);
        console.log('about')
        navButton.click();
        navButton.addEventListener('click', navDropDownClick);
    } else {
        document.removeEventListener('click', navDropdownClose);
        console.log('else');
        navButton.click();
        navButton.addEventListener('click', navDropDownClick); 
    };
};

    navButton.addEventListener('click', navDropDownClick); 

// projects.addEventListener('click', () => {
    
//     if (treeSvg.classList.contains("tree-in")) {
//         treeFirstAnimation();
        // add flip class
        // add collapse
        // add new content or give it show class 
    // }
    
// });

