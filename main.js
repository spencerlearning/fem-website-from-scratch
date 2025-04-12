const hamburgerButton = document.querySelector('[aria-controls="primary-nav"]');
const nav = document.querySelector("#primary-nav");

hamburgerButton.addEventListener("click", () => {
  // check if the navigation is opened
  const isNavOpened = hamburgerButton.getAttribute("aria-expanded");

  if (isNavOpened === "false") {
    hamburgerButton.setAttribute("aria-expanded", "true");
  } else {
    hamburgerButton.setAttribute("aria-expanded", "false");
  }

  // console.log(isNavOpened);
});

// Keep menu from briefly appearing when screen is resized to mobile
const resizeObserver = new ResizeObserver((entries) => {
  // When resizing add .resizing class to body
  document.body.classList.add("resizing");

  // Remove .resizing class from body when not resizing
  requestAnimationFrame(() => {
    document.body.classList.remove("resizing");
  });
});

resizeObserver.observe(document.body);
