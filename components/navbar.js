// Reusable Navigation Component
class Navbar {
  constructor() {
    this.init();
  }

  init() {
    this.createNavbar();
    this.handleScrollHighlight();
  }

  createNavbar() {
    const navbar = document.createElement("nav");
    navbar.className = "navbar";
    navbar.innerHTML = `
            <div class="nav-container">
                <div class="nav-left">
                    <div class="nav-title">Tahoe 26 Alfred Themes</div>
                </div>

                <div class="nav-center">
                    <ul class="nav-links">
                        <li><a href="#themes" class="nav-link" data-page="index">Themes</a></li>
                        <li><a href="index.html#installation" class="nav-link" data-section="installation">Install</a></li>
                        <li><a href="index.html#recommended-settings" class="nav-link" data-section="recommended-settings">Settings</a></li>
                    </ul>
                </div>

                <div class="nav-right">
                    <div class="nav-download">
                        <a href="themes/Tahoe 26 - Alfred Themes.zip" class="download-nav-btn" download>
                            <svg class="download-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                            </svg>
                            Theme Pack
                        </a>
                    </div>
                    <a href="https://github.com/joeynotjoe/my-alfred-themes" target="_blank" rel="noopener noreferrer" class="github-link">
                        <svg class="github-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                        </svg>
                    </a>
                </div>

                <button class="mobile-menu-toggle" aria-label="Toggle mobile menu">
                    <span class="hamburger-line"></span>
                    <span class="hamburger-line"></span>
                    <span class="hamburger-line"></span>
                </button>

                <div class="mobile-menu">
                    <div class="mobile-nav-links">
                        <li><a href="#themes" class="nav-link" data-page="index">Themes</a></li>
                        <li><a href="index.html#installation" class="nav-link" data-section="installation">Installation</a></li>
                        <li><a href="index.html#recommended-settings" class="nav-link" data-section="recommended-settings">Recommended Settings</a></li>
                        <li><a href="themes/Tahoe 26 - Alfred Themes.zip" class="nav-link">Download Theme Pack</a></li>
                        <li><a href="https://github.com/joeynotjoe/my-alfred-themes" target="_blank" rel="noopener noreferrer" class="nav-link">View on GitHub</a></li>
                    </ul>
                </div>
            </div>
        `;

    // Insert at the beginning of body
    document.body.insertBefore(navbar, document.body.firstChild);

    // Set active state based on current page
    this.setActiveNavItem();
    this.bindSmoothScrolling();
    this.handleTitleVisibility();
    this.setupMobileMenu();
  }

  setActiveNavItem() {
    const currentPage =
      window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach((link) => {
      link.classList.remove("active");

      // Check if it's the index page and this is the Themes link
      if (currentPage === "index.html" && link.dataset.page === "index") {
        link.classList.add("active");
      }
    });
  }

  bindSmoothScrolling() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href*="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        const href = anchor.getAttribute("href");
        if (href.includes("#")) {
          const targetId = href.split("#")[1];
          const target = document.getElementById(targetId);
          if (target) {
            e.preventDefault();
            const targetPosition = target.offsetTop - 90;
            window.scrollTo({
              top: targetPosition,
              behavior: "smooth",
            });
          }
        }
      });
    });
  }

  handleTitleVisibility() {
    const navTitle = document.querySelector(".nav-title");
    const mainHeader = document.querySelector(".main-header");

    window.addEventListener("scroll", () => {
      if (mainHeader) {
        const headerRect = mainHeader.getBoundingClientRect();
        // Show title when header is scrolled past
        if (headerRect.bottom < 0) {
          navTitle.classList.add("visible");
        } else {
          navTitle.classList.remove("visible");
        }
      }
    });
  }

  setupMobileMenu() {
    const mobileToggle = document.querySelector(".mobile-menu-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");
    const navbar = document.querySelector(".navbar");

    mobileToggle.addEventListener("click", () => {
      navbar.classList.toggle("mobile-menu-open");
    });

    // Close mobile menu when clicking on a link
    const mobileLinks = document.querySelectorAll(".mobile-nav-links a");
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navbar.classList.remove("mobile-menu-open");
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!navbar.contains(e.target)) {
        navbar.classList.remove("mobile-menu-open");
      }
    });
  }

  handleScrollHighlight() {
    // Update active nav link based on scroll position
    window.addEventListener("scroll", () => {
      const sections = ["installation", "recommended-settings"];
      const navLinks = document.querySelectorAll(".nav-link");

      let current = "";
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            current = section;
          }
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (current === "") {
          // If at top, highlight Themes
          if (link.dataset.page === "index") {
            link.classList.add("active");
          }
        } else if (link.dataset.section === current) {
          link.classList.add("active");
        }
      });
    });
  }
}

// Initialize navbar when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new Navbar();
});
