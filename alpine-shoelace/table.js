export function userTable() {
    return {
        users: [],
        loading: true,
        async fetchUsers() {
            this.loading = true;
            try {
                let response = await fetch('https://dummyjson.com/users');
                let data = await response.json();
                this.users = data.users;
            } catch (error) {
                console.error('Error fetching users:', error);
            }
            this.loading = false;
        },
        init() {
            this.fetchUsers();
        }
    };
}

// Ensure Alpine initializes with the module
document.addEventListener('alpine:init', () => {
    Alpine.data('userTable', userTable);
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
