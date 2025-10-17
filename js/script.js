const data = {
    programming: [
        {
            type: 'project',
            title: 'E-commerce Platform',
            description: 'Full-stack web application built with React and Node.js featuring user authentication, payment integration, and real-time inventory management.',
            link: 'https://github.com/yourusername/ecommerce-platform'
        },
        {
            type: 'experience',
            title: 'Senior Software Developer at TechCorp',
            description: 'Led development of microservices architecture serving 1M+ users. Implemented CI/CD pipelines and mentored junior developers.',
            link: ''
        },
        {
            type: 'project',
            title: 'Weather Forecast App',
            description: 'Mobile-responsive weather application using OpenWeather API with geolocation features and 7-day forecasts.',
            link: 'https://github.com/yourusername/weather-app'
        }
    ],
    testing: [
        {
            type: 'project',
            title: 'Automated Testing Framework',
            description: 'Custom testing framework built with Selenium and Python for end-to-end testing of web applications with CI/CD integration.',
            link: 'https://github.com/yourusername/test-framework'
        },
        {
            type: 'experience',
            title: 'QA Lead at SoftwareCo',
            description: 'Managed testing team of 5 engineers. Reduced bug escape rate by 60% through implementation of comprehensive test automation.',
            link: ''
        },
        {
            type: 'project',
            title: 'Performance Testing Suite',
            description: 'Load testing solution using JMeter and Grafana for monitoring application performance under various stress conditions.',
            link: ''
        }
    ],
    gamedev: [
        {
            type: 'project',
            title: 'Axolotl Knight',
            tagdescription: 'Details',
            description: 'A 3D jump-and-run platformer built with Unity. The gamee fatures 5 worlds with 5 levels each, enemy combat, obstacle navigation, and two distinct gameplay modes. Includes original art assets, storyline, and concept. Originally developed for Nintendo Switch. Due to publisher circumstances, the game is currently available on itch.io.',
            link: 'https://youtu.be/9mBrIj2PMsU',
            linkIndex: 1,
            tagrole: 'Role',
            role: 'Level Designer, Quest Designer, Narrative Designer, Gameplay Designer, QA Tester'
        },
                {
            type: 'experience',
            title: 'Lionbridge',
            tagdescription: 'Details',
            description: 'Game Tester at Lionbridge for Activision\'s Call of Duty: Modern Warfare 2 and 3. Performed diverse QA testing methodologies (functional, non-functional, regression, smoke, exploratory, ad hoc, compatibility) across PC and console platforms using checklists. Documented findings in Jira with technical reports, collaborating to maintain quality standards for major AAA releases.',
            tagrole: 'Role',
            role: 'Tester',
            link: 'https://games.lionbridge.com/services/game-testing/',
            linkIndex: 3,
            
        },
        {
            type: 'experience',
            title: 'Introduction to Video Games Creation',
            description: 'Gained hands-on experience with Unity game engine and game production fundamentals through XAMK\'s Introduction to Video Games Creation course. Completed coursework in game design, history, and analysis, and developed "The Return," a text-based game showcasing narrative design and programming concepts. Currently the course is no longer available to foreigners.',
            link: 'https://koulutuskalenteri.xamk.fi/en/open-amk-courses/introduction-to-video-games-creation-1-35-ects-cr-3/',
            linkIndex: 2,
        },
        {
            type: 'experience',
            title: 'Syrenka Jam',
            description: 'Completed a two-week intensive game development course using Unity with the Syrenka Jam team (Farmind Studio / PlayWay). Collaborated with teammates on rapid prototyping and game production, strengthening technical skills and experience in fast-paced, collaborative game development.',
        }
    ]
};

// DOM elements
const menuItems = document.querySelectorAll('.menu-item');
/* const leftArrow = document.getElementById('leftArrow');
const rightArrow = document.getElementById('rightArrow'); */
const menuContainer = document.getElementById('menuContainer');
const contentView = document.getElementById('contentView');
const categoryTitle = document.getElementById("categoryTitle").textContent = "Projects";
const itemsGrid = document.getElementById('itemsGrid');
const backButton = document.getElementById('backButton');
const link = document.querySelector('#myLink');

const linkTexts = [
    'View on GitHub →',
    'See the Trailer →',
    'Course Page →',
    'Lionbridge Test Team →'
];
// Radius calculation
function getRadius() {
    const menuSize = menuContainer.offsetWidth;
    const circleSize = menuSize * 0.28;
    // Increased from 0.4 to 0.42 to ensure better spacing
    // Also account for the circle size to prevent overlap
    const baseRadius = menuSize * 0.42;
    return Math.max(baseRadius, circleSize * 1.2);
}

let radius = getRadius();
let currentRotation = 0;
let isDragging = false;
let dragStartAngle = 0;
let rotationAtDragStart = 0;

// Position items on the circular path
function positionItems() {
    const angleStep = (2 * Math.PI) / 3;

    menuItems.forEach((item, index) => {
        const angle = currentRotation + (index * angleStep) - Math.PI / 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        item.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    });
}

// Calculate angle from center
function getAngleFromCenter(x, y) {
    const rect = menuContainer.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    return Math.atan2(y - centerY, x - centerX);
}

// URL validation for security
function isValidUrl(url) {
    if (!url) return false;
    try {
        const parsed = new URL(url);
        return parsed.protocol === 'https:' || parsed.protocol === 'http:';
    } catch {
        return false;
    }
}

// Sanitize text content (defense in depth)
function sanitizeText(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.textContent;
}

menuItems.forEach(item => {
    item.addEventListener('click', (e) => {
        if (!isDragging) {
            const category = item.getAttribute('data-category');
            showCategory(category);
        }
        e.stopPropagation();
    });

    // Mouse events
    item.addEventListener('mousedown', (e) => {
        isDragging = false;
        dragStartAngle = getAngleFromCenter(e.clientX, e.clientY);
        rotationAtDragStart = currentRotation;
        e.preventDefault();
    });

    // Touch events with passive: false for preventDefault
    item.addEventListener('touchstart', (e) => {
        isDragging = false;
        const touch = e.touches[0];
        dragStartAngle = getAngleFromCenter(touch.clientX, touch.clientY);
        rotationAtDragStart = currentRotation;
        e.preventDefault();
    }, { passive: false });
    
    // Add touchend handler to detect tap vs drag
    item.addEventListener('touchend', (e) => {
        if (!isDragging && dragStartAngle !== 0) {
            const category = item.getAttribute('data-category');
            showCategory(category);
            e.preventDefault();
        }
    }, { passive: false });
});

// Mouse move handler
document.addEventListener('mousemove', (e) => {
    if (dragStartAngle !== 0) {
        isDragging = true;
        const currentAngle = getAngleFromCenter(e.clientX, e.clientY);
        const angleDiff = currentAngle - dragStartAngle;
        currentRotation = rotationAtDragStart + angleDiff;
        positionItems();
    }
});

// Touch move handler
document.addEventListener('touchmove', (e) => {
    if (dragStartAngle !== 0) {
        isDragging = true;
        const touch = e.touches[0];
        const currentAngle = getAngleFromCenter(touch.clientX, touch.clientY);
        const angleDiff = currentAngle - dragStartAngle;
        currentRotation = rotationAtDragStart + angleDiff;
        positionItems();
    }
}, { passive: false });

// Mouse up handler
document.addEventListener('mouseup', () => {
    dragStartAngle = 0;
    setTimeout(() => {
        isDragging = false;
    }, 100);
});

// Touch end handler
document.addEventListener('touchend', () => {
    dragStartAngle = 0;
    setTimeout(() => {
        isDragging = false;
    }, 100);
});

// Back button handler
backButton.addEventListener('click', () => {
    contentView.classList.remove('active');
    menuContainer.classList.remove('hidden');
    
    // Recalculate radius and reposition items when returning
    radius = getRadius();
    positionItems();
});

// Show category content
function showCategory(category) {
    const categoryData = data[category];
    const titles = {
        programming: 'Programming',
        testing: 'Testing Projects',
        gamedev: 'Game Development'
    };

    categoryTitle.textContent = titles[category];
    itemsGrid.innerHTML = '';

    categoryData.forEach(item => {
        const card = document.createElement('div');
        card.className = 'item-card';

        const tag = document.createElement('span');
        tag.className = `item-tag ${item.type}`;
        tag.textContent = sanitizeText(item.type);

        const title = document.createElement('div');
        title.className = 'item-title';
        title.textContent = sanitizeText(item.title);

        const description = document.createElement('div');
        description.className = 'item-description';
        description.textContent = sanitizeText(item.description);

        const role = document.createElement('div');
        role.className = 'item-role';
        role.textContent = sanitizeText(item.role);

        const tagdescription = document.createElement('div');
        tagdescription.className = 'item-tagdescription';
        tagdescription.textContent = sanitizeText(item.tagdescription);

        const tagrole = document.createElement('div');
        tagrole.className = 'item-tagrole';
        tagrole.textContent = sanitizeText(item.tagrole);



        card.appendChild(tag);
        card.appendChild(title);
        card.appendChild(tagdescription);
        card.appendChild(description);
        card.appendChild(tagrole);
        card.appendChild(role);

        // Add link with security attributes
        if (item.link && isValidUrl(item.link)) {
            const link = document.createElement('a');
            link.className = 'item-link';
            link.href = item.link;

            // jeśli karta ma zdefiniowany numer tekstu → wybierz go
            if (typeof item.linkIndex === 'number' && linkTexts[item.linkIndex]) {
                link.textContent = linkTexts[item.linkIndex];
            }
            // jeśli nie ma indexu → nie dodawaj żadnego tekstu
            else {
                link.textContent = '';
            }

            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            card.appendChild(link);
        }


        itemsGrid.appendChild(card);
    });

    menuContainer.classList.add('hidden');
    setTimeout(() => {
        contentView.classList.add('active');
    }, 500);
}

// Handle window resize for responsive radius
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        radius = getRadius();
        positionItems();
    }, 100);
});

// Initial positioning
positionItems();

const matrixButton = document.getElementById("matrixButton");
let isMatrixActive = true; // start włączony

matrixButton.addEventListener("click", () => {
    isMatrixActive = !isMatrixActive; // zmiana stanu

    if (isMatrixActive) {
        matrixButton.classList.add("active");
        matrixButton.textContent = "MATRIX ON";
    } else {
        matrixButton.classList.remove("active");
        matrixButton.textContent = "MATRIX OFF";
    }
});


// === MATRIX BACKGROUND EFFECT ===
const canvas = document.getElementById('matrixCanvas');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fontSize = 15;
const columns = Math.floor(canvas.width / fontSize);
const drops = Array.from({ length: columns }, () =>
    Math.floor(Math.random() * canvas.height / fontSize)
);

function drawMatrix() {
    if (!isMatrixActive) return; // jeśli Matrix wyłączony, nic nie rysujemy

    context.fillStyle = 'rgba(0, 0, 0, 0.05)';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = 'rgba(0, 255, 0, 0.25)';
    context.font = fontSize + 'px monospace';

    const UNICODE_RANGES = [
        [0x0020, 0x007E],
        [0x00A0, 0x024F],
        [0x0370, 0x03FF],
        [0x0400, 0x04FF],
        [0x0530, 0x058F],
        [0x0590, 0x05FF],
        [0x0600, 0x06FF],
        [0x0900, 0x097F],
        [0x3040, 0x30FF],
        [0x4E00, 0x9FFF],
        [0x2200, 0x22FF],
        [0x2300, 0x23FF],
    ];

    function randomUnicodeChar() {
        let char;
        do {
            const [start, end] = UNICODE_RANGES[Math.floor(Math.random() * UNICODE_RANGES.length)];
            const code = Math.floor(start + Math.random() * (end - start));
            char = String.fromCodePoint(code);
        } while (/\p{Extended_Pictographic}/u.test(char)); // skip emoji/pictographic chars
        return char;
    }

    for (let i = 0; i < drops.length; i++) {
        const text = randomUnicodeChar();
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        context.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}


setInterval(drawMatrix, 50);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
