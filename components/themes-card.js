// Themes Card Component
class ThemesCard {
  constructor() {
    this.currentTheme = "light";
    this.currentVariant = "blue";
    this.init();
  }

  init() {
    this.bindEvents();
    this.listenForThemeChanges();
  }

  toggleTheme(theme) {
    this.currentTheme = theme;
    this.updateToggleUI();
    this.updateContent();
    
    // Update body class for global theme
    const body = document.body;
    if (theme === 'dark') {
      body.classList.add('dark');
    } else {
      body.classList.remove('dark');
    }
    
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

  bindEvents() {
    // Listen for variant selection
    document.addEventListener("click", (e) => {
      if (
        e.target.closest(".variant-item") &&
        !e.target.closest(".variant-item").classList.contains("disabled")
      ) {
        const variant = e.target
          .closest(".variant-item")
          .getAttribute("data-variant");
        this.selectVariant(variant);
      }
    });
  }

  listenForThemeChanges() {
    document.addEventListener("themeChanged", (e) => {
      this.currentTheme = e.detail.theme;
      this.updateContent();
    });
  }

  selectVariant(variant) {
    this.currentVariant = variant;

    // Update active variant in UI
    document.querySelectorAll(".variant-item").forEach((item) => {
      item.classList.remove("active");
    });
    document
      .querySelector(`[data-variant="${variant}"]`)
      .classList.add("active");

    this.updateContent();
  }

  updateContent() {
    this.updateThemeTitle();
    this.updateDownloadLink();
    this.updateScreenshots();
  }

  updateThemeTitle() {
    const themeTitle = document.getElementById("theme-title");
    const colorIndicator = document.querySelector(".content-title .color-indicator");
    const downloadBtn = document.getElementById("download-btn");
    
    if (themeTitle) {
      const variantName =
        this.currentVariant.charAt(0).toUpperCase() +
        this.currentVariant.slice(1);
      const themeName = `${variantName} ${this.currentTheme.charAt(0).toUpperCase() + this.currentTheme.slice(1)} Theme`;
      themeTitle.textContent = themeName;
    }
    
    if (colorIndicator) {
      // Remove all variant classes
      colorIndicator.className = 'color-indicator';
      // Add current variant class
      colorIndicator.classList.add(this.currentVariant);
    }
    
    if (downloadBtn) {
      // Remove all variant classes from download button
      downloadBtn.className = 'download-btn';
      // Add current variant class
      downloadBtn.classList.add(this.currentVariant);
    }
  }

  updateDownloadLink() {
    const downloadBtn = document.getElementById("download-btn");
    if (downloadBtn) {
      const variantName =
        this.currentVariant.charAt(0).toUpperCase() +
        this.currentVariant.slice(1);
      downloadBtn.href = `themes/Tahoe%2026%20${this.currentTheme.charAt(0).toUpperCase() + this.currentTheme.slice(1)}%20-%20${variantName}.alfredappearance`;
    }
  }

  updateScreenshots() {
    const resultsImg = document.querySelector("#alfred-results-img img");

    if (resultsImg) {
      const themePrefix = `assets/tahoe-26/tahoe-26-${this.currentTheme}-${this.currentVariant}`;

      resultsImg.src = `${themePrefix}-results.jpg`;

      // Update click handlers for modal
      this.updateModalHandlers(themePrefix);
    }
  }

  updateModalHandlers(themePrefix) {
    const element = document.getElementById("alfred-results-img");
    if (element) {
      element.onclick = () => this.openModal(`${themePrefix}-results.jpg`);
    }
  }

  openModal(src) {
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    if (modal && modalImage) {
      modal.style.display = "block";
      modalImage.src = src;
    }
  }

  createThemesCardHTML() {
    return `
            <div class="main-card">
                <!-- Sidebar with color variants -->
                <div class="sidebar">
                    <!-- Theme Toggle Section -->
                    <div class="theme-toggle-container">
                        <div class="theme-toggle">
                            <div class="theme-option active" onclick="window.themesCard.toggleTheme('light')">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="12" cy="12" r="5"/>
                                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                                </svg>
                            </div>
                            <div class="theme-option" onclick="window.themesCard.toggleTheme('dark')">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <h3 class="sidebar-title">Color Variants</h3>
                    <ul class="color-variants-list">
                        <li class="variant-item active" data-variant="blue">
                            <span class="color-indicator blue"></span>
                            Blue
                        </li>
                        <li class="variant-item" data-variant="purple">
                            <span class="color-indicator purple"></span>
                            Purple
                        </li>
                        <li class="variant-item" data-variant="pink">
                            <span class="color-indicator pink"></span>
                            Pink
                        </li>
                        <li class="variant-item" data-variant="red">
                            <span class="color-indicator red"></span>
                            Red
                        </li>
                        <li class="variant-item" data-variant="orange">
                            <span class="color-indicator orange"></span>
                            Orange
                        </li>
                        <li class="variant-item" data-variant="yellow">
                            <span class="color-indicator yellow"></span>
                            Yellow
                        </li>
                        <li class="variant-item" data-variant="green">
                            <span class="color-indicator green"></span>
                            Green
                        </li>
                        <li class="variant-item" data-variant="graphite">
                            <span class="color-indicator graphite"></span>
                            Graphite
                        </li>
                    </ul>
                </div>

                <!-- Content Area -->
                <div class="content-area">
                    <div class="content-header">
                        <div class="content-title">
                            <span class="color-indicator blue"></span>
                            <span id="theme-title">Light Mode - Blue</span>
                            <a href="themes/Tahoe%2026%20Light%20-%20Blue.alfredappearance" class="download-btn" download id="download-btn">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                    <polyline points="7,10 12,15 17,10"/>
                                    <line x1="12" y1="15" x2="12" y2="3"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div class="screenshots-grid">
                        <div class="screenshot-group">
                            <div class="screenshot-item" id="alfred-results-img">
                                <img src="assets/tahoe-26/tahoe-26-light-blue-results.jpg" alt="Alfred Results View" class="screenshot">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
  }
}

// Initialize themes card and inject HTML when DOM loads
document.addEventListener("DOMContentLoaded", function () {
  window.themesCard = new ThemesCard();
  const themesContainer = document.getElementById("themes-container");
  if (themesContainer) {
    themesContainer.innerHTML = window.themesCard.createThemesCardHTML();
    // Re-initialize event listeners after HTML injection
    window.themesCard.init();
  }
});
