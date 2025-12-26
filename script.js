// ==========================================
// 1. WALLPAPER SLIDESHOW CONFIGURATION
// ==========================================

// List your images here. Make sure these match your file names exactly!
const wallpapers = [
    'image/bg1.jpg',
    'image/bg2.jpg',
    'image/bg3.jpg',
    'image/bg4.jpg',
    'image/bg5.jpg',
    'image/bg6.jpg',
    'image/bg7.jpg',
    'image/bg8.jpg',
    'image/bg9.jpg',
    'image/bg10.jpg'
];

let currentBgIndex = 0;
const changeInterval = 5000; // Change every 5000ms (5 seconds)

// Function to cycle the background
function cycleBackground() {
    // Move to next index, loop back to 0 if at the end
    currentBgIndex = (currentBgIndex + 1) % wallpapers.length; 
    const imageUrl = `url('${wallpapers[currentBgIndex]}')`;
    
    // Apply the new background to the body
    document.body.style.backgroundImage = imageUrl;
}

// Start the automatic slideshow
setInterval(cycleBackground, changeInterval);


// ==========================================
// 2. EMAIL SENDING LOGIC
// ==========================================

function sendEmail() {
    // YOUR KEYS (From your previous message)
    const serviceID = "service_afqieck";
    const templateID = "template_ul3d06d";

    // Getting values from the HTML inputs
    const params = {
        review: document.getElementById("review_input").value,
        answer1: document.getElementById("answer1_input").value,
        answer2: document.getElementById("answer2_input").value,
        answer3: document.getElementById("answer3_input").value,
    };

    // Validation: Make sure she wrote something
    if(params.review === "" && params.answer1 === "") {
        alert("Please write something sweet first! 😊");
        return;
    }

    // Change button text to show loading
    const btn = document.querySelector('.btn');
    const originalText = btn.innerText;
    btn.innerText = "Sending... ❤️";

    // Send via EmailJS
    emailjs.send(serviceID, templateID, params)
        .then((res) => {
            // Clear inputs after success
            document.getElementById("review_input").value = "";
            document.getElementById("answer1_input").value = "";
            document.getElementById("answer2_input").value = "";
            document.getElementById("answer3_input").value = "";
            
            alert("Sent! He's going to love reading this. ❤️");
            btn.innerText = "Sent Successfully! ✅";
            
            // Reset button text after 3 seconds
            setTimeout(() => { btn.innerText = originalText; }, 3000);
        })
        .catch((err) => {
            console.error("Email Error:", err);
            alert("Oops! Something went wrong. Please check your internet connection.");
            btn.innerText = "Try Again ❌";
        });
}


// ==========================================
// 3. ANIMATIONS (FLOWERS, HEARTS, SCROLL)
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    
    // --- A. Setup Floating Container ---
    let container = document.getElementById('floating-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'floating-container';
        container.style.position = 'fixed';
        container.style.top = '0'; 
        container.style.left = '0';
        container.style.width = '100%'; 
        container.style.height = '100%';
        container.style.pointerEvents = 'none'; 
        container.style.zIndex = '-1';
        document.body.appendChild(container);
    }

    // --- B. Add Animation Styles Dynamically ---
    if (!document.getElementById('float-style')) {
        const style = document.createElement('style');
        style.id = 'float-style';
        style.innerHTML = `
            @keyframes floatUp { 
                0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
                20% { opacity: 0.8; } 
                100% { transform: translateY(-20vh) rotate(360deg); opacity: 0; } 
            }
        `;
        document.head.appendChild(style);
    }

    // --- C. Create Floating Elements ---
    const symbols = ['❤️', '💖', '✨', '🌸', '🌹', '🌻', '🦋'];
    
    function createFloater() {
        const floater = document.createElement('div');
        // Pick a random symbol
        floater.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
        
        // Random positioning
        floater.style.position = 'absolute';
        floater.style.left = Math.random() * 100 + 'vw';
        floater.style.bottom = '-50px';
        floater.style.fontSize = Math.random() * 25 + 15 + 'px'; // Size between 15px and 40px
        floater.style.opacity = '0.7';
        
        // Random speed
        const duration = Math.random() * 5 + 5; // Between 5 and 10 seconds
        floater.style.animation = `floatUp ${duration}s linear forwards`;

        container.appendChild(floater);
        
        // Remove element after animation finishes to prevent lag
        setTimeout(() => { floater.remove(); }, duration * 1000);
    }
    
    // Spawn a new floater every 400ms
    setInterval(createFloater, 400);


    // --- D. Scroll Animations (Slide Up Effect) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    // Apply observer to all elements with class 'slide-up'
    document.querySelectorAll('.slide-up').forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.8s ease';
        observer.observe(el);
    });
});