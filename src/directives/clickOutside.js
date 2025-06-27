export default {
  beforeMount(el, binding) {
    el.__clickOutsideHandler__ = (e) => {
      if (!el.contains(e.target)) {
        binding.value(e);
      }
    };
    document.addEventListener('click', el.__clickOutsideHandler__);
  },
  unmounted(el) {
    document.removeEventListener('click', el.__clickOutsideHandler__);
    el.__clickOutsideHandler__ = null;
  },
};
