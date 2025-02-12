// Ensure Alpine initializes with the module
document.addEventListener('alpine:init', () => {
  Alpine.data('formHandler', () => ({
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
    },
  }));
});
