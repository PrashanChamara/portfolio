document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Create floating particles
    function createParticles() {
        const container = document.getElementById('particles');
        // Check if particle container exists
        if (!container) return;

        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.opacity = Math.random() * 0.5 + 0.1;
            container.appendChild(particle);
        }
    }

    createParticles();

    // 2. Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // 3. Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Only scroll if the target is on the current page
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // 4. Scroll reveal animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // 5. Copy Code Button Logic (For Blogs)
    document.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', function(){
            const targetId = this.getAttribute('data-target');
            const codeBlock = document.getElementById(targetId);
            if (codeBlock) {
                navigator.clipboard.writeText(codeBlock.innerText).then(() => {
                    const originalText = this.innerText;
                    this.innerText = 'Copied!';
                    setTimeout(() => {
                        this.innerText = originalText;
                    }, 2000);
                });
            }
        });
    });
});

// 6. Contact form handler
function handleSubmit(e) {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    e.target.reset();
}

// 7. Download Resume Function (From your new index.html)
function downloadResume() {
    const resumeHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Prashan Chamara - Resume</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Inter', sans-serif; background: #f8fafc; color: #1e293b; line-height: 1.6; }
.container { max-width: 1000px; margin: 0 auto; background: white; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); }
.header { background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #db2777 100%); color: white; padding: 3rem; display: grid; grid-template-columns: auto 1fr; gap: 2rem; align-items: center; }
.profile-img { width: 150px; height: 150px; border-radius: 50%; border: 4px solid rgba(255,255,255,0.3); object-fit: cover; }
.header-content h1 { font-size: 2.5rem; font-weight: 700; margin-bottom: 0.5rem; }
.header-content .title { font-size: 1.25rem; opacity: 0.9; margin-bottom: 1rem; }
.contact-info { display: flex; flex-wrap: wrap; gap: 1rem; font-size: 0.875rem; }
.contact-item { display: flex; align-items: center; gap: 0.5rem; background: rgba(255,255,255,0.15); padding: 0.5rem 1rem; border-radius: 50px; }
.content { padding: 2rem 3rem; }
.section { margin-bottom: 2rem; }
.section-title { font-size: 1.25rem; font-weight: 700; color: #4f46e5; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid #e0e7ff; }
.summary { background: #f1f5f9; padding: 1.5rem; border-radius: 0.5rem; border-left: 4px solid #4f46e5; }
.experience-item { margin-bottom: 1.5rem; }
.experience-header { display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem; }
.job-title { font-weight: 700; font-size: 1.125rem; color: #1e293b; }
.company { color: #6b7280; font-weight: 600; }
.date { color: #4f46e5; font-weight: 600; font-size: 0.875rem; white-space: nowrap; }
ul { margin-left: 1.5rem; margin-top: 0.5rem; }
li { margin-bottom: 0.25rem; color: #4b5563; }
.skills-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
.skill-category h4 { color: #4f46e5; margin-bottom: 0.5rem; font-weight: 600; }
.skill-list { font-size: 0.875rem; color: #4b5563; }
.project { background: #f8fafc; padding: 1rem; border-radius: 0.5rem; margin-bottom: 1rem; }
.project h4 { color: #4f46e5; margin-bottom: 0.25rem; }
.tech-stack { font-size: 0.75rem; color: #6b7280; margin-bottom: 0.5rem; }
.education-item { margin-bottom: 1rem; }
.degree { font-weight: 600; color: #1e293b; }
.school { color: #6b7280; font-size: 0.875rem; }
.year { color: #4f46e5; font-size: 0.875rem; font-weight: 600; }
.cert-grid { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.cert-badge { background: #e0e7ff; color: #4f46e5; padding: 0.25rem 0.75rem; border-radius: 50px; font-size: 0.75rem; font-weight: 600; }
@media print { body { background: white; } .container { box-shadow: none; } }
</style>
</head>
<body>
<div class="container">
<div class="header">
    <img src="assets/images/dummy.png" alt="Prashan Chamara" class="profile-img">
    <div class="header-content">
        <h1>PRASHAN CHAMARA</h1>
        <div class="title">Head of Admin & Digital Solutions Specialist</div>
        <div class="contact-info">
            <div class="contact-item">✉ prashanchamara.a@gmail.com</div>
            <div class="contact-item">📱 +971 58 827 4266</div>
            <div class="contact-item">📍 Dubai, UAE</div>
            <div class="contact-item">💼 linkedin.com/in/prashanchamara</div>
            <div class="contact-item">💻 github.com/prashanchamara</div>
        </div>
    </div>
</div>
<div class="content">
    <div class="section"><div class="section-title">Professional Summary</div><div class="summary">Highly versatile and results-driven Head of Administration and Full-Stack Developer with over 19 years of diversified experience bridging the gap between complex business operations and modern technology.</div></div>
    <div class="section"><div class="section-title">Core Competencies</div><div class="skills-grid"><div class="skill-category"><h4>Full-Stack Development</h4><div class="skill-list">Python 3, Flask, SQLAlchemy, RESTful APIs, HTML5, CSS3, JavaScript (ES6+), Bootstrap 5</div></div><div class="skill-category"><h4>Strategic Administration</h4><div class="skill-list">Contract Negotiation, Sponsorship Acquisition, Vendor Management</div></div></div></div>
    <div class="section"><div class="section-title">Experience</div><div class="experience-item"><div class="experience-header"><div><div class="job-title">Head of Admin & Digital Solutions</div><div class="company">Desert Cubs Sports Academy</div></div><div class="date">Feb 2022 – Present</div></div><ul><li>Negotiated SLAs with facility providers.</li><li>Architected custom Admin Portal (ERP).</li></ul></div></div>
</div>
</div>
</body>
</html>`;

    const blob = new Blob([resumeHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Prashan_Chamara_Resume.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}