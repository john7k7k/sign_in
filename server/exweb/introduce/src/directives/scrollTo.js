// src/directives/scrollTo.js

export default {
    beforeMount(el, binding) {
      el.addEventListener('click', () => {
        const targetElement = document.querySelector(binding.value);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth',
          });
        }
      });
    }
  };
  