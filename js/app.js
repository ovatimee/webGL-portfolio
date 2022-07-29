const page = document.querySelector(".site");
const parallax = document.querySelectorAll(".parallax");


// Parallax

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.intersectionRatio > 0) {
      const element = entry.target;
      // element.style.transform = 'translate3d(0, +' + (10) + 'px ,0)'
    }
  });
});

window.addEventListener("scroll", () => {
  parallax.forEach((element) => {
    io.observe(element);
  });
});

// Loading Animation

const loadingAnimation = () => {
  page.classList.add("ready");
};

window.addEventListener("load", loadingAnimation());



// Forms

const form = document.getElementById("my-form");

const handleSubmit = async (e) => {
  const status = document.getElementById("my-form-status");
  e.preventDefault();
  try {
    const res = await fetch(e.target.action, {
      method: form.method,
      body: new FormData(e.target),
      headers: {
        Accept: "application/json",
      },
    });
    if (res.ok) {
      status.innerHTML = "Thanks for your submission";
      form.reset();
    } else {
      const data = await res.json();
      console.log(data);
      status.innerHTML = data["errors"]
        .map((error) => error["message"])
        .join(", ");
    }
  } catch (e) {
    status.innerHTML = "Oops! There was a problem submitting your form";
  }
};

form.addEventListener("submit", handleSubmit);
