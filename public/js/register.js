tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#6366f1',
                'primary-hover': '#4f46e5',
                dark: '#1e293b',
                'dark-light': '#334155',
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

const genderBtn = document.getElementById('gender-btn');
const genderDropdown = document.getElementById('gender-dropdown');
const genderText = document.getElementById('gender-text');
const genderIcon = document.getElementById('gender-icon');
const genderInput = document.getElementById('gender-input');
const options = document.querySelectorAll('.gender-option');

// Abrir/cerrar dropdown
genderBtn.addEventListener('click', () => {
    const isOpen = !genderDropdown.classList.contains('hidden');

    if (isOpen) {
        genderDropdown.classList.add('hidden', 'opacity-0', 'scale-95');
        genderDropdown.classList.remove('block', 'opacity-100', 'scale-100');
        genderIcon.classList.remove('rotate-180');
    } else {
        genderDropdown.classList.remove('hidden');
        setTimeout(() => {
            genderDropdown.classList.remove('opacity-0', 'scale-95');
            genderDropdown.classList.add('opacity-100', 'scale-100');
        }, 10);
        genderIcon.classList.add('rotate-180');
    }
});

// Seleccionar opción
options.forEach(option => {
    option.addEventListener('click', () => {
        const value = option.dataset.value;
        const text = option.textContent.trim();

        genderText.textContent = text;
        genderText.classList.remove('text-gray-400');
        genderText.classList.add('text-white');
        genderInput.value = value;

        // Cerrar dropdown
        genderDropdown.classList.add('hidden', 'opacity-0', 'scale-95');
        genderDropdown.classList.remove('block', 'opacity-100', 'scale-100');
        genderIcon.classList.remove('rotate-180');
    });
});

// Cerrar al hacer clic fuera
document.addEventListener('click', (e) => {
    if (!genderBtn.contains(e.target) && !genderDropdown.contains(e.target)) {
        genderDropdown.classList.add('hidden', 'opacity-0', 'scale-95');
        genderDropdown.classList.remove('block', 'opacity-100', 'scale-100');
        genderIcon.classList.remove('rotate-180');
    }
});