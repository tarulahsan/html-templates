// Custom JavaScript for AI Resume Builder Landing Page

document.addEventListener('DOMContentLoaded', function() {

    // Initialize GSAP and plugins if needed
    // gsap.registerPlugin(ScrollTrigger);

    // 1. Header & Navigation Logic (e.g., sticky header, mobile menu)
    // -----------------------------------------------------------------
    const header = document.getElementById('main-header');
    const scrollThreshold = 50; // Pixels to scroll before changing header style

    function handleHeaderScroll() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleHeaderScroll);
    // Call it once on load in case the page is already scrolled
    handleHeaderScroll();

    // Mobile menu toggle functionality
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const navLinks = document.querySelector('.nav-links');
    const ctaButtonsNav = document.querySelector('#main-header .cta-buttons');

    if (mobileMenuIcon && navLinks) {
        mobileMenuIcon.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuIcon.classList.toggle('active');
            // Optionally toggle CTA buttons visibility in mobile menu if they are part of it
            if(ctaButtonsNav) {
                ctaButtonsNav.classList.toggle('active');
            }
        });

        // Close menu when a link is clicked (for single-page navigation)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuIcon.classList.remove('active');
                    if(ctaButtonsNav) {
                        ctaButtonsNav.classList.remove('active');
                    }
                }
            });
        });
    }

    // 2. Hero Section Animations (e.g., Kinetic Headline)
    // -----------------------------------------------------------------
    const kineticHeadline = document.getElementById('kinetic-headline');
    if (kineticHeadline) {
        const text = kineticHeadline.textContent;
        const words = text.split(" ");
        kineticHeadline.innerHTML = ''; // Clear original text

        words.forEach((word, index) => {
            const wordSpan = document.createElement('span');
            wordSpan.textContent = word + (index === words.length - 1 ? '' : '\u00A0'); // Add space
            wordSpan.style.display = 'inline-block'; // Needed for transform
            wordSpan.style.opacity = 0; // Start hidden
            wordSpan.style.transform = 'translateY(30px) rotateX(-90deg)'; // Initial state for animation
            kineticHeadline.appendChild(wordSpan);
        });

        gsap.to(kineticHeadline.children, {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.15, // Time between each word animation
            ease: "back.out(1.7)", // Fun easing
            delay: 0.5 // Delay before animation starts
        });
    }

    // 3. Three.js Interactive Element
    // -----------------------------------------------------------------
    function initThreeJS() {
        const container = document.getElementById('threejs-container');
        if (!container) {
            console.log("Three.js container not found.");
            return;
        }

        let scene, camera, renderer, documentIcon;

        // Scene
        scene = new THREE.Scene();

        // Camera
        camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.z = 5;

        // Renderer
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); // alpha:true for transparent background
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio); // For sharp rendering
        container.appendChild(renderer.domElement);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7); // Soft white light
        scene.add(ambientLight);
        const pointLight = new THREE.PointLight(0xffffff, 0.8, 100);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        // Document Icon (Simple representation: a group of planes)
        documentIcon = new THREE.Group();

        const mainPageMaterial = new THREE.MeshStandardMaterial({
            color: 0xededed,
            metalness: 0.3,
            roughness: 0.6,
            side: THREE.DoubleSide
        });
        const mainPageGeometry = new THREE.BoxGeometry(1.5, 2.2, 0.1); // Main page
        const mainPage = new THREE.Mesh(mainPageGeometry, mainPageMaterial);
        documentIcon.add(mainPage);

        // Simple lines on the page
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0xaaaaaa });
        for (let i = 0; i < 5; i++) {
            const points = [];
            points.push(new THREE.Vector3(-0.6, 0.8 - i * 0.3, 0.06));
            points.push(new THREE.Vector3(0.6, 0.8 - i * 0.3, 0.06));
            const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
            const line = new THREE.Line(lineGeometry, lineMaterial);
            documentIcon.add(line);
        }

        // A small accent 'tab' or 'bookmark'
        const accentMaterial = new THREE.MeshStandardMaterial({ color: 0x6d47d9, metalness: 0.4, roughness: 0.5 });
        const accentGeometry = new THREE.BoxGeometry(0.3, 0.5, 0.15);
        const accent = new THREE.Mesh(accentGeometry, accentMaterial);
        accent.position.set(-0.7, 0.7, 0.05); // Position it to the side
        documentIcon.add(accent);


        scene.add(documentIcon);
        documentIcon.rotation.x = 0.2; // Slight initial tilt

        // Animation loop
        function animate() {
            requestAnimationFrame(animate);

            // Spin the icon
            if (documentIcon) {
                documentIcon.rotation.y += 0.005; // Slower spin
                documentIcon.rotation.x += 0.001; // Subtle x-axis wobble
            }
            renderer.render(scene, camera);
        }
        animate();

        // Handle window resize
        window.addEventListener('resize', () => {
            if (container) {
                camera.aspect = container.clientWidth / container.clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(container.clientWidth, container.clientHeight);
            }
        });
    }

    if (document.getElementById('threejs-container')) {
        initThreeJS();
    }


    // Smooth scroll for anchor links (if not handled by Bootstrap or for finer control)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const hrefAttribute = this.getAttribute('href');
            // Ensure it's a valid selector and not just "#"
            if (hrefAttribute && hrefAttribute.length > 1 && document.querySelector(hrefAttribute)) {
                e.preventDefault();
                document.querySelector(hrefAttribute).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    console.log("Custom JS Loaded. Site is ready for interactions.");

});

// Placeholder for GSAP Animations
function initGSAPAnimations() {
    gsap.registerPlugin(ScrollTrigger); // Register ScrollTrigger

    console.log("GSAP animations setup initiated.");

    // 1. Skill Graph Animations
    // -----------------------------------------------------------------
    const skillBars = gsap.utils.toArray('.graph-bar');
    skillBars.forEach(bar => {
        const targetWidth = bar.style.width; // Get target width from inline style (e.g., "80%")
        // Clear the inline style width so GSAP can animate it from 0
        // but keep it if it's crucial for some non-JS fallback (though we set it to 0% in CSS)
        // For this setup, CSS sets it to 0% initially, so the inline style is purely for GSAP to read the target.

        gsap.fromTo(bar,
            { width: "0%" }, // Animate from 0%
            {
                width: targetWidth, // Animate to the target width
                duration: 1.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: bar.closest('.skill-graphs-content'), // Trigger when the skill graphs section is in view
                    start: "top 80%", // Start animation when 80% of the trigger is visible from top
                    toggleActions: "play none none none", // Play once
                    // markers: true, // For debugging ScrollTrigger
                }
            }
        );
    });

    // 2. Parallax & Fade-in Animations for Sections
    // -----------------------------------------------------------------
    gsap.utils.toArray('.section').forEach((section, i) => {
        // Fade in sections
        gsap.from(section, {
            opacity: 0,
            y: 70, // Move up from bottom
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: section,
                start: "top 85%", // Start a bit earlier
                toggleActions: "play none none none",
                // markers: true, // For debugging
            }
        });

        // Example Parallax for elements within a section (e.g., hero text)
        if (section.id === 'hero') {
            gsap.to(section.querySelector('.container'), {
                yPercent: -10, // Move container up 10% of its height as we scroll down
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top top", // When the top of the section hits the top of the viewport
                    end: "bottom top", // When the bottom of the section hits the top of the viewport
                    scrub: true, // Smooth scrubbing effect
                    // markers: true,
                }
            });
        }
        // Add more specific parallax effects for other sections/elements as needed
    });


    // 3. Micro-interactions for specific elements (if not covered by CSS)
    // -----------------------------------------------------------------
    // Example: Bento items subtle lift on scroll into view
    gsap.utils.toArray('.bento-item').forEach(item => {
        gsap.from(item, {
            opacity: 0.8,
            y: 30,
            scale: 0.98,
            duration: 0.7,
            ease: "back.out(0.8)",
            scrollTrigger: {
                trigger: item,
                start: "top 90%",
                toggleActions: "play none none none",
            }
        });
    });

     // Example: Resume preview subtle animation on scroll
    const resumePreview = document.getElementById('resume-preview');
    if(resumePreview) {
        gsap.from(resumePreview.querySelector('.resume-preview-content'), {
            opacity: 0.8,
            scale: 0.95,
            y: 20,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: resumePreview,
                start: "top 80%",
                toggleActions: "play none none none",
            }
        });
    }


    console.log("GSAP animations & ScrollTriggers configured.");
}

// Call initializers if needed (some might be called within DOMContentLoaded)
    // initThreeJS(); // Called directly within DOMContentLoaded now
    initGSAPAnimations(); // Call GSAP animations setup
