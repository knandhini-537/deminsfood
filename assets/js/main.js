/**
 * Delmins Foods - Replica Interactive JavaScript
 * Responsive Mobile Navigation, FAQ Accordions, and Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Drawer
  const mobileToggle = document.getElementById('delminsMobileToggle');
  const mobileMenu = document.getElementById('delminsMobileMenu');
  const mobileClose = document.getElementById('delminsMobileClose');
  const mobileLinks = document.querySelectorAll('.delmins-mobile-link');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  function closeMenu() {
    if (mobileMenu) {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (mobileClose) {
    mobileClose.addEventListener('click', closeMenu);
  }

  if (mobileMenu) {
    mobileMenu.addEventListener('click', (e) => {
      if (e.target === mobileMenu) {
        closeMenu();
      }
    });
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // 2. FAQ Accordion Toggle
  const faqQuestions = document.querySelectorAll('[class*="ai-faq-question"]');
  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('[class*="ai-faq-item"]');
      if (!item) return;
      const answer = item.querySelector('[class*="ai-faq-answer"]');
      const isOpen = item.classList.contains('active') || (answer && answer.style.display === 'block');

      // Close other items
      document.querySelectorAll('[class*="ai-faq-item"]').forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          const ans = other.querySelector('[class*="ai-faq-answer"]');
          if (ans) ans.style.display = 'none';
        }
      });

      if (isOpen) {
        item.classList.remove('active');
        if (answer) answer.style.display = 'none';
      } else {
        item.classList.add('active');
        if (answer) answer.style.display = 'block';
      }
    });
  });

  // 3. Smooth Scrolling for all hash links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || !href) return;
      const targetId = href.substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 70;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 4. Form Submissions Toast
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      showToast('Thank you! Your request has been received.');
      if (emailInput) emailInput.value = '';
    });
  });

  function showToast(msg) {
    let toast = document.getElementById('delmins-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'delmins-toast';
      toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: #2D4A1E;
        color: white;
        padding: 14px 24px;
        border-radius: 8px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        font-family: Assistant, sans-serif;
        font-size: 14px;
        z-index: 999999;
        transition: opacity 0.3s ease, transform 0.3s ease;
        opacity: 0;
        transform: translateY(20px);
      `;
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(20px)';
    }, 3500);
  }
});
