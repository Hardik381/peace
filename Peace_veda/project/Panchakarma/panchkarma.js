const cards = document.querySelectorAll('.vamana__card');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show'); // hide again when out of view
    }
  });
}, { threshold: 0.2 });

cards.forEach(card => observer.observe(card));
