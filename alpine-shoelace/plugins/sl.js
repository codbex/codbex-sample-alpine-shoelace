document.addEventListener('alpine:init', () => {
  Alpine.directive('sl', (el, {}, { cleanup }) => {
    if (!el._x_model) {
      console.warn('Directive "x-sl" requires a model binding');
      return null;
    }

    const setValue = el._x_model.set;

    if (el.tagName === 'SL-CHECKBOX') {
      if (el._x_model.get()) el.setAttribute('checked', '');
    }

    const handler = () => {
      if (el.tagName === 'SL-CHECKBOX') {
        setValue(el.checked);
      } else {
        setValue(el.value);
      }
    };

    el.addEventListener('sl-change', handler);

    cleanup(() => {
      window.removeEventListener('sl-change', handler);
    });
  });
});
