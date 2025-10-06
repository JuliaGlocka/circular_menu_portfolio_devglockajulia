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
                    title: '2D Platformer Game',
                    description: 'Retro-style platformer built with Unity featuring 20+ levels, custom physics engine, and original pixel art assets.',
                    link: 'https://github.com/yourusername/platformer-game'
                },
                {
                    type: 'experience',
                    title: 'Game Developer at IndieStudio',
                    description: 'Developed gameplay mechanics and UI systems for mobile games with 500K+ downloads. Specialized in Unity and C#.',
                    link: ''
                },
                {
                    type: 'project',
                    title: 'Multiplayer Puzzle Game',
                    description: 'Real-time multiplayer puzzle game with WebSocket integration, matchmaking system, and global leaderboards.',
                    link: 'https://github.com/yourusername/puzzle-game'
                }
            ]
        };

        const menuItems = document.querySelectorAll('.menu-item');
        const leftArrow = document.getElementById('leftArrow');
        const rightArrow = document.getElementById('rightArrow');
        const menuContainer = document.getElementById('menuContainer');
        const contentView = document.getElementById('contentView');
        const categoryTitle = document.getElementById('categoryTitle');
        const itemsGrid = document.getElementById('itemsGrid');
        const backButton = document.getElementById('backButton');

        const radius = 200;
        let currentRotation = 0;
        let isDragging = false;
        let dragStartAngle = 0;
        let rotationAtDragStart = 0;

        function positionItems() {
            const angleStep = (2 * Math.PI) / 3;
            
            menuItems.forEach((item, index) => {
                const angle = currentRotation + (index * angleStep) - Math.PI / 2;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                
                item.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
            });
        }

        function rotateItems(direction) {
            const angleStep = (2 * Math.PI) / 3;
            currentRotation += direction * angleStep;
            positionItems();
        }

        leftArrow.addEventListener('click', () => rotateItems(-1));
        rightArrow.addEventListener('click', () => rotateItems(1));

        function getAngleFromCenter(x, y) {
            const rect = menuContainer.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            return Math.atan2(y - centerY, x - centerX);
        }

        menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                if (!isDragging) {
                    const category = item.getAttribute('data-category');
                    showCategory(category);
                }
            });

            item.addEventListener('mousedown', (e) => {
                isDragging = false;
                dragStartAngle = getAngleFromCenter(e.clientX, e.clientY);
                rotationAtDragStart = currentRotation;
                e.preventDefault();
            });

            item.addEventListener('touchstart', (e) => {
                isDragging = false;
                const touch = e.touches[0];
                dragStartAngle = getAngleFromCenter(touch.clientX, touch.clientY);
                rotationAtDragStart = currentRotation;
                e.preventDefault();
            });
        });

        document.addEventListener('mousemove', (e) => {
            if (dragStartAngle !== 0) {
                isDragging = true;
                const currentAngle = getAngleFromCenter(e.clientX, e.clientY);
                const angleDiff = currentAngle - dragStartAngle;
                currentRotation = rotationAtDragStart + angleDiff;
                positionItems();
            }
        });

        document.addEventListener('touchmove', (e) => {
            if (dragStartAngle !== 0) {
                isDragging = true;
                const touch = e.touches[0];
                const currentAngle = getAngleFromCenter(touch.clientX, touch.clientY);
                const angleDiff = currentAngle - dragStartAngle;
                currentRotation = rotationAtDragStart + angleDiff;
                positionItems();
            }
        });

        document.addEventListener('mouseup', () => {
            dragStartAngle = 0;
            setTimeout(() => {
                isDragging = false;
            }, 100);
        });

        document.addEventListener('touchend', () => {
            dragStartAngle = 0;
            setTimeout(() => {
                isDragging = false;
            }, 100);
        });

        backButton.addEventListener('click', () => {
            contentView.classList.remove('active');
            menuContainer.classList.remove('hidden');
        });

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
                tag.textContent = item.type;
                
                const title = document.createElement('div');
                title.className = 'item-title';
                title.textContent = item.title;
                
                const description = document.createElement('div');
                description.className = 'item-description';
                description.textContent = item.description;
                
                card.appendChild(tag);
                card.appendChild(title);
                card.appendChild(description);
                
                if (item.link) {
                    const link = document.createElement('a');
                    link.className = 'item-link';
                    link.href = item.link;
                    link.textContent = 'View on GitHub →';
                    link.target = '_blank';
                    card.appendChild(link);
                }
                
                itemsGrid.appendChild(card);
            });

            menuContainer.classList.add('hidden');
            setTimeout(() => {
                contentView.classList.add('active');
            }, 500);
        }

        positionItems();