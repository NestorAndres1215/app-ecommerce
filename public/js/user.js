  tailwind.config = {
    theme: {
      extend: {
        colors: {
          primary: '#6366f1',
          'primary-hover': '#4f46e5',
          success: '#10b981',
          glass: 'rgba(255, 255, 255, 0.1)',
        },
        animation: {
          'float': 'float 6s ease-in-out infinite',
          'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        },
        keyframes: {
          float: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-10px)' }
          }
        }
      }
    }
  }

      const filterButtons = document.querySelectorAll('[data-filter]');
    const userRows = document.querySelectorAll('.user-row');
    const tableBody = document.getElementById('users-table-body');
    const emptyState = document.getElementById('empty-state');
    const userCount = document.getElementById('user-count');

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        // Actualizar botón activo
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        let visible = 0;

        userRows.forEach(row => {
          const status = row.dataset.status;

          if (filter === 'all' || status === filter) {
            row.classList.remove('hidden-row');
            visible++;
          } else {
            row.classList.add('hidden-row');
          }
        });

        // Mostrar/ocultar empty state
        if (visible === 0) {
          emptyState.classList.remove('hidden');
          tableBody.style.display = 'none';
        } else {
          emptyState.classList.add('hidden');
          tableBody.style.display = '';
        }

        // Actualizar contador
        userCount.textContent = visible;
      });
    });

        document.querySelectorAll('[type="password"]').forEach(input => {
      const toggle = input.parentElement.querySelector('button');
      if (!toggle) return;

      toggle.addEventListener('click', () => {
        const icon = toggle.querySelector('i');
        if (input.type === 'password') {
          input.type = 'text';
          icon.classList.replace('fa-eye-slash', 'fa-eye');
        } else {
          input.type = 'password';
          icon.classList.replace('fa-eye', 'fa-eye-slash');
        }
      });
    });