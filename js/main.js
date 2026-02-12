document.addEventListener("DOMContentLoaded", () => {
  /* =====================================================
     DESTINATION DROPDOWN (Where are you travelling?)
     ===================================================== */

  const dropdown = document.getElementById("destinationDropdown");
  const input = document.getElementById("destinationInput");
  const menu = dropdown.querySelector(".dropdown-menu");
  const items = Array.from(menu.querySelectorAll(".dropdown-item"));
  const selectedContainer = document.getElementById("selectedDestinations");

  let selected = [];

  // Open dropdown
  input.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.add("open");
    filterItems(input.value);
  });

  // Filter on typing
  input.addEventListener("input", () => {
    filterItems(input.value);
  });

  function filterItems(value) {
    const search = value.toLowerCase();
    let visible = 0;

    items.forEach(item => {
      if (item.textContent.toLowerCase().includes(search)) {
        item.style.display = "block";
        visible++;
      } else {
        item.style.display = "none";
      }
    });

    showEmptyState(visible === 0);
  }

  function showEmptyState(show) {
    let empty = menu.querySelector(".empty-state");

    if (show) {
      if (!empty) {
        empty = document.createElement("div");
        empty.className = "empty-state";
        empty.textContent = "Destination not found";
        menu.appendChild(empty);
      }
    } else if (empty) {
      empty.remove();
    }
  }

  // Select destination
  items.forEach(item => {
    item.addEventListener("click", (e) => {
      e.stopPropagation();
      const value = item.textContent;

      if (!selected.includes(value)) {
        selected.push(value);
        renderChips();
      }

      input.value = "";
      filterItems("");
      dropdown.classList.remove("open");
    });
  });

  function renderChips() {
    selectedContainer.innerHTML = "";

    selected.forEach(value => {
      const chip = document.createElement("span");
      chip.className = "chip";
      chip.innerHTML = `${value} <button>&times;</button>`;

      chip.querySelector("button").addEventListener("click", () => {
        selected = selected.filter(v => v !== value);
        renderChips();
      });

      selectedContainer.appendChild(chip);
    });
  }

  // Close destination dropdown
  document.addEventListener("click", () => {
    dropdown.classList.remove("open");
  });


  /* =====================================================
     TRAVEL INSURANCE MEGA MENU (CLICK ONLY)
     ===================================================== */

  const megaMenu = document.querySelector(".mega-menu");
  const toggle = document.getElementById("travelToggle");

  if (!megaMenu || !toggle) return;

  toggle.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    megaMenu.classList.toggle("open");
  });

  // Prevent closing when clicking inside panel
  megaMenu.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  // Close on outside click
  document.addEventListener("click", () => {
    megaMenu.classList.remove("open");
  });
});


const mobileMenu = document.getElementById("mobileMenu");
const closeMobileMenu = document.getElementById("closeMobileMenu");
const mobileToggle = document.querySelector(".mobile-toggle");
const mobileSubmenu = document.querySelector(".mobile-submenu");

// open mobile menu (you can link this to hamburger icon)
document.getElementById("mobileMenuToggle")?.addEventListener("click", () => {
  mobileMenu.classList.add("open");
});

closeMobileMenu?.addEventListener("click", () => {
  mobileMenu.classList.remove("open");
});

mobileToggle?.addEventListener("click", () => {
  mobileSubmenu.classList.toggle("open");
});
