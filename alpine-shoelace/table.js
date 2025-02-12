document.addEventListener('alpine:init', () => {
  Alpine.data('tableComponent', () => ({
    users: [],
    loading: true,
    searchQuery: '',
    sortColumn: 'firstName',
    sortOrder: 'asc',
    currentPage: 1,
    pageSize: 5,

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
    },

    get filteredUsers() {
      return this.users.filter((user) => Object.values(user).some((value) => typeof value === 'string' && value.toLowerCase().includes(this.searchQuery.toLowerCase())));
    },

    get sortedUsers() {
      return this.filteredUsers.sort((a, b) => {
        let valA = a[this.sortColumn];
        let valB = b[this.sortColumn];

        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();

        if (valA < valB) return this.sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return this.sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    },

    get paginatedUsers() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.sortedUsers.slice(start, start + this.pageSize);
    },

    get totalPages() {
      return Math.ceil(this.sortedUsers.length / this.pageSize);
    },

    sort(column) {
      if (this.sortColumn === column) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortColumn = column;
        this.sortOrder = 'asc';
      }
    },

    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },

    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
  }));
});
