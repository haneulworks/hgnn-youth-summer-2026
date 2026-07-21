document.addEventListener("DOMContentLoaded", () => {
  const daySections = document.querySelectorAll(".day-section");
  const dayLinks = document.querySelectorAll(".day-nav a");

  if (!daySections.length || !dayLinks.length) return;

  const setActiveLink = (id) => {
    dayLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${id}`;

      link.classList.toggle("active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  dayLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const targetId = link.getAttribute("href").replace("#", "");
      setActiveLink(targetId);
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleSections = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (!visibleSections.length) return;

      setActiveLink(visibleSections[0].target.id);
    },
    {
      rootMargin: "-20% 0px -65% 0px",
      threshold: [0, 0.1, 0.25, 0.5, 0.75]
    }
  );

  daySections.forEach((section) => observer.observe(section));

  setActiveLink(daySections[0].id);
});