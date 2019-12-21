// adds 'active' link to navbar items
(function activeNavLink() {
     let wrapper = document.querySelector('.main-wrapper');

     // access pathnames for each navbar item
     let homePage = document.getElementById('home').pathname;
     let aboutPage = document.getElementById('about').pathname;
     let brandsPage = document.getElementById('brands').pathname;
     let musicPage = document.getElementById('music').pathname;
     let contactPage = document.getElementById('contact').pathname;
     let doublesPage = document.getElementById('doubles').pathname;

     // access navbar items
     let navbar = document.getElementById('navbar');
     let about = document.getElementById('about');
     let brands = document.getElementById('brands');
     let music = document.getElementById('music');
     let contact = document.getElementById('contact');
     let doubles = document.getElementById('doubles');

     // check location and add active class
    return location.pathname === aboutPage ? about.classList.add("active")
           :location.pathname === brandsPage ? brands.classList.add("active")
           :location.pathname === contactPage ? contact.classList.add("active")
           :location.pathname === doublesPage ? doubles.classList.add("active")
           :location.pathname === musicPage ? music.classList.add("active")
           :location.pathname === homePage ? (
             wrapper.style.minHeight = "60%",
             navbar.style.backgroundImage = "none"
             )
           :null;

  })();

// toggles nav menu overlay
let burgerIcon = document.querySelector("#menu-icon");

burgerIcon.addEventListener("click", function() {
   let overlay = document.querySelector(".overlay");
   let bars = document.querySelector(".menu-bars");

   this.style.zIndex = "1";
   bars.classList.toggle("change");
   overlay.classList.toggle("active");
  });

// hides/shows navbar on scroll down/up
var prevScrollPos = window.pageYOffset;

window.onscroll = function() {
  let navbar = document.getElementById("navbar");
  let currentScrollPos = window.pageYOffset;

  if(prevScrollPos > currentScrollPos) {
    navbar.style.top = "0";
    navbar.style.zIndex = "1";
  } else {
    navbar.style.top = "-400px";
  }

  prevScrollPos = currentScrollPos;
}

window.onload = openSongModal => {
  let homePage = document.getElementById('home').pathname;
  let songModal = document.getElementById('song-modal');
  let songIframe = document.getElementById('song-iframe');

  if (location.pathname != homePage) return;

  if (!localStorage.getItem("visited")) {
    setTimeout(() => {
      songModal.style.display = "grid";
      songModal.style.gridTemplateColumns = "14em";
      songIframe.setAttribute("src", "https://www.youtube.com/embed/vseGtE4NAb4?&autoplay=1");
    }, 1250);

    localStorage.setItem("visited", "true");
  }
}

function closeModal()  {
  let songModal = document.getElementById('song-modal');
  let songIframe = document.getElementById('song-iframe');

  songIframe.removeAttribute("src");
  songModal.style.display = "none";
}

// validates contact form user data + invokes aws gateway api
function submitToAPI(e) {
       e.preventDefault();
       let URL = "https://fz75fz7jc1.execute-api.us-east-1.amazonaws.com/contact/contact";

            let checkFname = /[A-Za-z]{1}[A-Za-z]/;
            if (!checkFname.test($("#fname-input").val())) {
                alert ("Name cannot be less than two characters");
                return;
            }

            let checkLname = /[A-Za-z]{1}[A-Za-z]/;
            if (!checkLname.test($("#lname-input").val())) {
                alert ("Name cannot be less than two characters");
                return;
            }

            if ($("#email-input").val()=== "") {
                alert ("Please enter your email address");
                return;
            }

            let checkEmail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,6})?$/;
            if (!checkEmail.test($("#email-input").val())) {
                alert ("Please enter valid email address");
                return;
            }

       let fname = $("#fname-input").val();
       let lname = $("#lname-input").val();
       let email = $("#email-input").val();
       let subject = $("#subject-input").val();
       let desc = $("#message-input").val();
       let data = {
          name : name,
          email : email,
          subject : subject,
          desc : desc
        };

       $.ajax({
         type: "POST",
         url: URL,
         dataType: "json",
         crossDomain: "true",
         contentType: "application/json; charset=utf-8",
         data: JSON.stringify(data),

         success: function () {
           // clear form and show a success message
           alert("Successfull");
           document.getElementById("contact-form").reset();
           location.reload();
         },
         error: function () {
           // show an error message
           alert("Unsuccessfull");
         }});
     }
