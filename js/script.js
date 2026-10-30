// ── Recipe Filter ──

var filterButtons = document.querySelectorAll(".filter-btn");
var recipeCards = document.querySelectorAll(".recipe-card");

for (var i = 0; i < filterButtons.length; i++) {
  filterButtons[i].addEventListener("click", function () {

    // remove active class from all buttons
    for (var j = 0; j < filterButtons.length; j++) {
      filterButtons[j].classList.remove("active");
    }

    // add active class to the clicked button
    this.classList.add("active");

    var selectedRegion = this.getAttribute("data-filter");

    // show or hide cards based on region
    for (var k = 0; k < recipeCards.length; k++) {
      var cardRegion = recipeCards[k].getAttribute("data-region");

      if (selectedRegion === "all" || cardRegion === selectedRegion) {
        recipeCards[k].removeAttribute("hidden");
      } else {
        recipeCards[k].setAttribute("hidden", "");
      }
    }

  });
}


// ── Favourites ──

var favButtons = document.querySelectorAll(".fav-btn");

// load saved favourites from localStorage
var savedFavourites = localStorage.getItem("toa-favorites");

if (savedFavourites === null) {
  savedFavourites = [];
} else {
  savedFavourites = JSON.parse(savedFavourites);
}

for (var i = 0; i < favButtons.length; i++) {
  var btn = favButtons[i];
  var recipeId = btn.getAttribute("data-id");

  // restore saved state on page load
  if (savedFavourites.indexOf(recipeId) !== -1) {
    btn.classList.add("active");
    btn.textContent = "❤ Saved!";
  }

  btn.addEventListener("click", function () {
    var id = this.getAttribute("data-id");

    // read latest list from localStorage
    var list = localStorage.getItem("toa-favorites");
    if (list === null) {
      list = [];
    } else {
      list = JSON.parse(list);
    }

    var index = list.indexOf(id);

    if (index === -1) {
      // not saved yet — add it
      list.push(id);
      this.classList.add("active");
      this.textContent = "❤ Saved!";
    } else {
      // already saved — remove it
      list.splice(index, 1);
      this.classList.remove("active");
      this.textContent = "❤ Save";
    }

    localStorage.setItem("toa-favorites", JSON.stringify(list));
  });
}


// ── Contact Form Validation ──

var contactForm = document.getElementById("contact-form");
var confirmation = document.getElementById("confirmation");

if (contactForm !== null) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var name = document.getElementById("name").value;
    var message = document.getElementById("message").value;

    // trim whitespace
    name = name.trim();
    message = message.trim();

    if (message.length < 20) {
      alert("Please enter a message with at least 20 characters.");
      return;
    }

    // hide the form and show confirmation
    contactForm.style.display = "none";
    confirmation.style.display = "block";

    if (name === "") {
      confirmation.textContent = "Thank you! We've received your message.";
    } else {
      confirmation.textContent = "Thank you, " + name + "! We've received your message.";
    }
  });
}
