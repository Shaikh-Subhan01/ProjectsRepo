let lastScrollTop = 0;
const navbar = document.querySelector('header');
const scrollThreshold = 800;  // Define how many pixels down to scroll before showing the navbar

window.addEventListener('scroll', function() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop && scrollTop < scrollThreshold) {
    // User is scrolling down and has passed the threshold, hide the navbar
    navbar.classList.add('hide');
    
  }
  else if (scrollTop == 0){
    navbar.classList.remove('active');

  }
  else if (scrollTop >= scrollThreshold || scrollTop < lastScrollTop) {
    // Show the navbar when scrolling up or when at the top of the page
    navbar.classList.remove('hide');
    navbar.classList.add('active');

  }

  lastScrollTop = scrollTop;
});

// MENU DROPDOWN FUNCTION
// Select the dropdown and dropdown menu
const dropdown = document.querySelector('.navbar .dropdown');
const dropDownMenu = document.querySelector('.navbar .dropdown-menu');

// Show the dropdown when hovering over the button
  dropdown.addEventListener('mouseenter', function() {
  dropdown.classList.add('show'); // Add class to the dropdown itself
  dropDownMenu.classList.add('show'); // Add class to the dropdown menu
});

// Hide the dropdown when moving the mouse away
  dropDownMenu.addEventListener('mouseleave', function() {
  dropDownMenu.classList.remove('show'); // Remove class to hide the menu
  dropdown.classList.remove('show'); // Remove class from dropdown
});



// // HOVER OPTION FOR THE MENU ITEMS

// const optionDropdown = document.querySelector('.dropdown-option1');
// const optionItem = document.querySelector('.option-links1');

// // Show the dropdown when hovering over the button
//   optionDropdown.addEventListener('mouseenter', function() {
//   optionDropdown.classList.add('show'); // Add class to the dropdown itself
//   optionItem.classList.add('show'); // Add class to the dropdown menu
// });

// // Hide the dropdown when moving the mouse away
//   optionItem.addEventListener('mouseleave', function() {
//   optionItem.classList.remove('show'); // Remove class to hide the menu
//   optionDropdown.classList.remove('show'); // Remove class from dropdown
// });

// // Select the dropdown and dropdown menu
// const optionDropdown2 = document.querySelector('.dropdown-option2');
// const optionItem2= document.querySelector('.option-links2');

// // Show the dropdown when hovering over the button
//   optionDropdown2.addEventListener('mouseenter', function() {
//   optionDropdown2.classList.add('show'); // Add class to the dropdown itself
//   optionItem2.classList.add('show'); // Add class to the dropdown menu
// });

// // Hide the dropdown when moving the mouse away
//   optionItem2.addEventListener('mouseleave', function() {
//   optionItem2.classList.remove('show'); // Remove class to hide the menu
//   optionDropdown2.classList.remove('show'); // Remove class from dropdown
// });

// // Select the dropdown and dropdown menu
// const optionDropdown3 = document.querySelector('.dropdown-option3');
// const optionItem3 = document.querySelector('.option-links3');

// // Show the dropdown when hovering over the button
//   optionDropdown3.addEventListener('mouseenter', function() {
//   optionDropdown3.classList.add('show'); // Add class to the dropdown itself
//   optionItem3.classList.add('show'); // Add class to the dropdown menu
// });

// // Hide the dropdown when moving the mouse away
//   optionItem3.addEventListener('mouseleave', function() {
//   optionItem3.classList.remove('show'); // Remove class to hide the menu
//   optionDropdown3.classList.remove('show'); // Remove class from dropdown
// });

