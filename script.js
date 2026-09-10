const toast = document.getElementById('toast');
const demoBtn = document.getElementById('demoBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const score = document.querySelector('.score span');
const featuredTitle = document.querySelector('.opportunity-card h4');
const featuredText = document.querySelector('.opportunity-card p');
const featuredScore = document.querySelector('.score-row strong');

function showToast(message = 'Demo interaction — this is where the real Sentra engine will connect.') {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

demoBtn?.addEventListener('click', () => {
  document.querySelector('#explore')?.scrollIntoView({ behavior: 'smooth' });
  showToast('Welcome to the Sentra demo. Explore the opportunity cards below.');
});

const opportunities = [
  ['AI tools for overlooked niches', 'Package a focused workflow for a specific professional audience.', 92],
  ['Tiny tools, serious problems', 'Build one deliberately narrow utility that saves a real business time.', 89],
  ['The productised service play', 'Sell a defined outcome instead of an open-ended service.', 86],
  ['Audience-first software', 'Start with a community and build the smallest useful tool around it.', 90]
];

shuffleBtn?.addEventListener('click', () => {
  const item = opportunities[Math.floor(Math.random() * opportunities.length)];
  featuredTitle.textContent = item[0];
  featuredText.textContent = item[1];
  featuredScore.textContent = item[2];
  score.style.width = `${item[2]}%`;
  showToast('Opportunity refreshed.');
});

document.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    const filter = chip.dataset.filter;
    document.querySelectorAll('.idea-card').forEach(card => {
      const visible = filter === 'all' || card.dataset.category === filter;
      card.style.display = visible ? '' : 'none';
    });
  });
});

document.querySelectorAll('.idea-card').forEach(card => {
  card.addEventListener('click', () => showToast(`${card.querySelector('h3').textContent} — deeper validation would open here.`));
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const tilt = document.querySelector('.tilt-card');
tilt?.addEventListener('mousemove', event => {
  if (window.innerWidth < 850) return;
  const rect = tilt.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;
  tilt.style.transform = `perspective(1200px) rotateY(${x * 8 - 2}deg) rotateX(${y * -6 + 2}deg) translateY(-3px)`;
});

tilt?.addEventListener('mouseleave', () => {
  tilt.style.transform = '';
});

const magnetic = document.querySelector('.magnetic');
magnetic?.addEventListener('mousemove', event => {
  const rect = magnetic.getBoundingClientRect();
  const x = event.clientX - (rect.left + rect.width / 2);
  const y = event.clientY - (rect.top + rect.height / 2);
  magnetic.style.transform = `translate(${x * .08}px, ${y * .08}px)`;
});
magnetic?.addEventListener('mouseleave', () => magnetic.style.transform = '');
