// ------------------- NAVIGATION & UI BEHAVIOR -------------------
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Active link on scroll
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (scrollY >= (sectionTop - 200)) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
});

// ------------------- FORMSPREE CONTACT FORM -------------------
(function() {
  const contactForm = document.getElementById('contactForm');
  const successModal = document.getElementById('successModal');
  const errorModal = document.getElementById('errorModal');
  const closeModalButtons = document.querySelectorAll('.close-modal, #modalOk, #errorModalOk');

  // 🔗 Replace with your actual Formspree endpoint
  const FORM_ENDPOINT = 'https://formspree.io/f/xbqplzab';
  

  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !subject || !message) {
      showModal(errorModal);
      resetButton();
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('subject', subject);
    formData.append('message', message);
    formData.append('_subject', `📩 Portfolio Contact: ${subject}`);
    formData.append('_replyto', email);

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData
      });

      if (response.ok) {
        showModal(successModal);
        contactForm.reset();
      } else {
        showModal(errorModal);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      showModal(errorModal);
    } finally {
      resetButton();
    }

    function resetButton() {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });

  function showModal(modal) { modal.style.display = 'block'; }
  function hideModal(modal) { modal.style.display = 'none'; }

  closeModalButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      hideModal(successModal);
      hideModal(errorModal);
    });
  });

  window.addEventListener('click', e => {
    if (e.target === successModal) hideModal(successModal);
    if (e.target === errorModal) hideModal(errorModal);
  });
})();

// ------------------- ANIMATIONS -------------------
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card, .about-card, .knowledge-card, .skill-category, .contact-item').forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

document.querySelectorAll('.info-item, .project-card, .skill-item').forEach(item => {
  item.addEventListener('mouseenter', () => { item.style.transform = 'translateY(-10px)'; });
  item.addEventListener('mouseleave', () => { item.style.transform = 'translateY(0)'; });
});

window.addEventListener('load', () => {
  document.querySelector('.nav-link[href="#home"]').classList.add('active');
  document.querySelectorAll('.logo-item').forEach((item, i) => item.style.animationDelay = `${i * 0.2}s`);
});
