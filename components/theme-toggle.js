// Theme Toggle Component
class ThemeToggle {
    constructor() {
        this.currentTheme = 'light';
        this.init();
    }

    init() {
        this.initializeTheme();
        this.listenForSystemChanges();
    }

    initializeTheme() {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = prefersDark ? 'dark' : 'light';
        this.setTheme(initialTheme);
    }

    setTheme(theme) {
        this.currentTheme = theme;
        const body = document.body;
        
        if (theme === 'dark') {
            body.classList.add('dark');
        } else {
            body.classList.remove('dark');
        }

        // Update toggle UI if it exists
        this.updateToggleUI();
        
        // Trigger custom event for other components
        document.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
    }

    updateToggleUI() {
        const lightOption = document.querySelector('.theme-option:first-child');
        const darkOption = document.querySelector('.theme-option:last-child');
        
        if (lightOption && darkOption) {
            lightOption.classList.remove('active');
            darkOption.classList.remove('active');
            
            if (this.currentTheme === 'dark') {
                darkOption.classList.add('active');
            } else {
                lightOption.classList.add('active');
            }
        }
    }

    toggleTheme(theme) {
        this.setTheme(theme);
    }

    getCurrentTheme() {
        return this.currentTheme;
    }

    listenForSystemChanges() {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            this.setTheme(e.matches ? 'dark' : 'light');
        });
    }

    createToggleHTML() {
        return `
            <div class="theme-toggle-container">
                <div class="theme-toggle">
                    <div class="theme-option active" onclick="window.themeToggle.toggleTheme('light')">Light Mode</div>
                    <div class="theme-option" onclick="window.themeToggle.toggleTheme('dark')">Dark Mode</div>
                </div>
            </div>
        `;
    }
}

// Initialize and make globally available
window.themeToggle = new ThemeToggle();
