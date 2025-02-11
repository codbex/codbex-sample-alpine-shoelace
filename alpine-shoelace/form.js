export function formHandler() {
    return {
        formData: {
            name: 'John',
            email: 'john@emial.com',
            role: 'user',
            dateOfBirth: '',
            rating: 50,
            subscribe: false,
            gender: 'male',
        },
        submitted: false,

        submitForm() {
            this.submitted = true;
            console.log('Form Submitted:', this.formData);
        }
    };
}

// Ensure Alpine initializes with the module
document.addEventListener('alpine:init', () => {
    Alpine.data('formHandler', formHandler);
});

document.addEventListener("sl-change", (e) => {
    const el = e.target;
    if (!el._x_model) {
        return null;
    }
    const setValue = el._x_model.set;
    if (el.checked !== undefined) {
        setValue(el.checked);
    } else {
        setValue(el.value);
    }
});
