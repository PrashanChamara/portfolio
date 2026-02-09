import os

REPO_PATH = "/home/prashan/Documents/Resume/portfolio"
BLOG_INDEX_FILE = os.path.join(REPO_PATH, "blog.html")

# We use the exact same marker string
MARKER = '<div id="blog-insert-marker" style="display:none;"></div>'

clean_html = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog - Prashan Chamara</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/style.css">
    <base target="_blank">
    <style>
        .blog-controls { max-width: 800px; margin: -2rem auto 3rem; padding: 0 5%; display: flex; gap: 1rem; flex-wrap: wrap; }
        .search-box { flex: 1; position: relative; }
        .search-box input { width: 100%; padding: 1rem 1rem 1rem 3rem; background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(99, 102, 241, 0.2); border-radius: 50px; color: white; font-family: inherit; }
        .search-box i { position: absolute; left: 1.2rem; top: 50%; transform: translateY(-50%); color: var(--primary); }
        .pagination { display: flex; justify-content: center; gap: 0.5rem; margin-top: 3rem; }
        .page-btn { background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(99, 102, 241, 0.2); color: var(--light); width: 40px; height: 40px; border-radius: 50%; cursor: pointer; transition: all 0.3s; }
        .page-btn.active, .page-btn:hover { background: var(--primary); border-color: var(--primary); }
        .category-tag { font-size: 0.75rem; padding: 0.25rem 0.75rem; border-radius: 50px; background: rgba(6, 182, 212, 0.1); color: var(--accent); display: inline-block; margin-bottom: 0.5rem; }
    </style>
</head>
<body>
    <div class="bg-animation"></div>
    <div class="particles" id="particles"></div>

    <nav id="navbar">
        <a href="index.html" class="logo">PC.</a>
        <ul class="nav-links">
            <li><a href="index.html#about">About</a></li>
            <li><a href="index.html#skills">Skills</a></li>
            <li><a href="index.html#projects">Projects</a></li>
            <li><a href="blog.html" class="active">Blog</a></li>
            <li><a href="index.html#contact">Contact</a></li>
        </ul>
        <button class="download-btn" onclick="downloadResume()">Resume</button>
    </nav>

    <section class="page-header">
        <div class="section-tag">Knowledge Base</div>
        <h1 class="section-title">My Blog</h1>
        <p class="section-subtitle">Insights on Linux, Automation, and Web Development</p>
    </section>

    <div class="blog-controls reveal">
        <div class="search-box">
            <i class="fas fa-search"></i>
            <input type="text" id="searchInput" placeholder="Search topics (e.g. Linux, Python, AI)...">
        </div>
    </div>

    <section id="blog-list" style="padding-top: 0;">
        <div class="container blog-grid" id="blogGrid">
            
""" + MARKER + """

            <div class="blog-card reveal" data-category="linux">
                <img src="assets/images/post1.png" alt="Linux for Beginners" class="blog-image">
                <div>
                    <span class="category-tag">Linux Distro</span>
                    <span class="section-tag" style="background:none; border:none; padding:0; color:var(--gray); font-size:0.75rem; margin-left:10px;">Feb 09, 2026</span>
                </div>
                <h2>Stop Struggling with Your Computer</h2>
                <p>Why modern Linux is finally ready for non-tech users as a daily driver. It's faster, safer, and free.</p>
                <a href="posts/post1.html" class="read-more">Read Article <i class="fas fa-arrow-right"></i></a>
            </div>
            
        </div>

        <div class="pagination" id="paginationControls"></div>
    </section>

    <footer>
        <div class="social-links">
            <a href="https://www.linkedin.com/in/prashan-chamara-b6a54792" class="social-link" target="_blank"><i class="fab fa-linkedin-in"></i></a>
            <a href="https://github.com/PrashanChamara" class="social-link" target="_blank"><i class="fab fa-github"></i></a>
        </div>
        <p>&copy; 2025 Prashan Chamara. All rights reserved.</p>
        <p style="margin-top: 0.5rem; font-size: 0.875rem;">Crafted with <i class="fas fa-heart" style="color: var(--secondary);"></i> and code</p>
    </footer>

    <script src="assets/js/main.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const grid = document.getElementById('blogGrid');
            const cards = Array.from(grid.getElementsByClassName('blog-card'));
            const searchInput = document.getElementById('searchInput');
            const paginationControls = document.getElementById('paginationControls');
            
            const itemsPerPage = 6;
            let currentPage = 1;
            let filteredCards = cards;

            function displayCards() {
                cards.forEach(card => card.style.display = 'none');
                const start = (currentPage - 1) * itemsPerPage;
                const end = start + itemsPerPage;
                const pageItems = filteredCards.slice(start, end);
                pageItems.forEach(card => card.style.display = 'flex');
                renderPagination();
            }

            function renderPagination() {
                const totalPages = Math.ceil(filteredCards.length / itemsPerPage);
                paginationControls.innerHTML = '';
                if (totalPages <= 1) return;
                
                for (let i = 1; i <= totalPages; i++) {
                    const btn = document.createElement('button');
                    btn.classList.add('page-btn');
                    if (i === currentPage) btn.classList.add('active');
                    btn.innerText = i;
                    btn.onclick = () => {
                        currentPage = i;
                        displayCards();
                        document.getElementById('blog-list').scrollIntoView({behavior: 'smooth'});
                    };
                    paginationControls.appendChild(btn);
                }
            }

            searchInput.addEventListener('input', (e) => {
                const term = e.target.value.toLowerCase();
                filteredCards = cards.filter(card => {
                    const title = card.querySelector('h2').innerText.toLowerCase();
                    const text = card.querySelector('p').innerText.toLowerCase();
                    const category = card.getAttribute('data-category') || '';
                    return title.includes(term) || text.includes(term) || category.includes(term);
                });
                currentPage = 1;
                displayCards();
            });

            displayCards();
        });
    </script>
</body>
</html>"""

with open(BLOG_INDEX_FILE, 'w', encoding='utf-8') as f:
    f.write(clean_html)
print("✅ FIXED: blog.html has been reset with SHARED MARKER.")
