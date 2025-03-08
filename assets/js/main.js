document.addEventListener('DOMContentLoaded', () => {
  // 1. Hamburger menu toggle for mobile
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });

  // 2. Initialize the shooting game
  initShootingGame();

  // 3. Register service worker for PWA
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  }
});

// === SHOOTING GAME LOGIC ===
function initShootingGame() {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Possible enemies: cyber threats & programming languages
  const possibleEnemies = [
    'Malware',
    'Ransomware',
    'Phishing',
    'Python',
    'C++',
    'Trojan',
    'SQLi',
    'Java',
    'Zero-Day',
    'PHP',
    'DDoS',
    'JS'
  ];

  let enemies = [];
  let bullets = [];

  let lastTime = 0;
  let spawnTimer = 0;
  let spawnInterval = 1500; // spawn enemy every 1.5 seconds

  // Listen for clicks to shoot bullets
  canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    bullets.push({
      x: mouseX,
      y: mouseY,
      radius: 5,
      speed: 6
    });
  });

  // Start the game loop
  requestAnimationFrame(gameLoop);

  function gameLoop(timestamp) {
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Spawn new enemies
    spawnTimer += deltaTime;
    if (spawnTimer > spawnInterval) {
      spawnTimer = 0;
      spawnEnemy();
    }

    // Update and draw enemies
    enemies.forEach((enemy) => {
      enemy.x += enemy.vx;
      enemy.y += enemy.vy;
      drawEnemy(enemy);
    });

    // Update and draw bullets
    bullets.forEach((bullet) => {
      bullet.y -= bullet.speed; // bullet moves upward
      drawBullet(bullet);
    });

    // Check collisions
    checkCollisions();

    // Remove off-screen items
    enemies = enemies.filter((e) => e.x > -200 && e.x < canvas.width + 200 && e.y > -200 && e.y < canvas.height + 200);
    bullets = bullets.filter((b) => b.y > 0);

    requestAnimationFrame(gameLoop);
  }

  function spawnEnemy() {
    const yPos = Math.random() * (canvas.height - 50) + 25;
    const text = possibleEnemies[Math.floor(Math.random() * possibleEnemies.length)];

    enemies.push({
      text: text,
      x: canvas.width + 50,
      y: yPos,
      vx: -(2 + Math.random() * 2),
      vy: (Math.random() - 0.5) * 1,
      color: '#00bcd4',
      font: 'bold 18px Roboto'
    });
  }

  function drawEnemy(enemy) {
    ctx.fillStyle = enemy.color;
    ctx.font = enemy.font;
    const textWidth = ctx.measureText(enemy.text).width;
    ctx.fillText(enemy.text, enemy.x - textWidth / 2, enemy.y);
  }

  function drawBullet(bullet) {
    ctx.beginPath();
    ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#ff5722';
    ctx.fill();
    ctx.closePath();
  }

  function checkCollisions() {
    for (let e = enemies.length - 1; e >= 0; e--) {
      const enemy = enemies[e];
      const textWidth = ctx.measureText(enemy.text).width;
      const textHeight = 18; // approx. font size
      const enemyLeft = enemy.x - textWidth / 2;
      const enemyRight = enemy.x + textWidth / 2;
      const enemyTop = enemy.y - textHeight;
      const enemyBottom = enemy.y;

      for (let b = bullets.length - 1; b >= 0; b--) {
        const bullet = bullets[b];
        // bounding box collision
        if (
          bullet.x > enemyLeft &&
          bullet.x < enemyRight &&
          bullet.y < enemyBottom &&
          bullet.y > enemyTop
        ) {
          // remove enemy & bullet
          enemies.splice(e, 1);
          bullets.splice(b, 1);
          break;
        }
      }
    }
  }

  function resizeCanvas() {
    const heroGameSection = document.getElementById('hero-game');
    canvas.width = heroGameSection.offsetWidth;
    canvas.height = heroGameSection.offsetHeight;
  }
}
