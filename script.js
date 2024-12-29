const gameArea = document.getElementById('gameArea');
const scoreDisplay = document.getElementById('score');
let score = 0;

function createFallingItem() {
    const item = document.createElement('img');
    
    // Set the image source to your mascot image
    // Save the mascot image in the same folder as your other files
    item.src = 'kopitiam-mascot.png'; // Make sure to save the mascot image with this name
    
    // Set base styles
    item.style.position = 'absolute';
    
    // Responsive sizes - slightly larger to show the mascot better
    const isMobile = window.innerWidth <= 480;
    const size = isMobile ? '50px' : '80px';
    
    // Apply styles
    Object.assign(item.style, {
        width: size,
        height: size,
        left: Math.random() * (gameArea.clientWidth - parseInt(size)) + 'px',
        top: '0px',
        cursor: 'pointer',
        transition: 'transform 0.2s ease',
        userSelect: 'none',
        webkitUserSelect: 'none',
        transform: 'rotate(' + (Math.random() * 20 - 10) + 'deg)' // Random slight rotation for fun
    });

    gameArea.appendChild(item);

    // Add hover effect
    item.addEventListener('mouseover', () => {
        item.style.transform = 'scale(1.1) rotate(' + (Math.random() * 20 - 10) + 'deg)';
    });

    item.addEventListener('mouseout', () => {
        item.style.transform = 'scale(1) rotate(' + (Math.random() * 20 - 10) + 'deg)';
    });

    // Falling animation
    let fallInterval = setInterval(() => {
        let itemTop = parseInt(window.getComputedStyle(item).getPropertyValue('top'));
        if (itemTop < gameArea.clientHeight) {
            item.style.top = (itemTop + (isMobile ? 3 : 5)) + 'px';
        } else {
            clearInterval(fallInterval);
            item.remove();
        }
    }, 100);

    // Click/touch handling
    item.addEventListener('click', () => {
        clearInterval(fallInterval);
        
        // Add score popup animation
        const scoreAnim = document.createElement('div');
        scoreAnim.textContent = '+1';
        scoreAnim.style.position = 'absolute';
        scoreAnim.style.left = item.style.left;
        scoreAnim.style.top = item.style.top;
        scoreAnim.style.color = '#EB2653';
        scoreAnim.style.fontFamily = 'DM Sans';
        scoreAnim.style.fontWeight = '600';
        scoreAnim.style.fontSize = '20px';
        scoreAnim.style.pointerEvents = 'none';
        scoreAnim.style.animation = 'fadeUp 0.5s ease-out';
        
        gameArea.appendChild(scoreAnim);
        
        // Remove elements after animation
        setTimeout(() => {
            scoreAnim.remove();
        }, 500);
        
        item.remove();
        score++;
        scoreDisplay.textContent = 'Score: ' + score;
    });
}

// Add CSS animation for score
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeUp {
        0% {
            opacity: 1;
            transform: translateY(0);
        }
        100% {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
`;
document.head.appendChild(style);

// Start game with responsive interval
const gameInterval = window.innerWidth <= 480 ? 1500 : 1000;
setInterval(createFallingItem, gameInterval);

// Handle window resize
window.addEventListener('resize', () => {
    const items = gameArea.getElementsByTagName('img');
    for (let item of items) {
        const size = window.innerWidth <= 480 ? '50px' : '80px';
        item.style.width = size;
        item.style.height = size;
    }
});