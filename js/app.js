// Smoth Scroll

const smoothScroll = () => {

  const page = document.querySelector(".site")

  const images = Array.from(document.querySelectorAll(".img-wrap"));
  const sconfigs = {
    ease: 0.1,
    current: 0,
    target: 0,
    previous: 0,
    round: 0,
  };

  // const lerp = (start, end, t) => {
  //   return start * (1 - t) + end * t;
  // };

  const setTransforms = (el, transforms) => {
    el.style.transform = transforms;
    console.log(el.style.transform);
  };

  const setAnimation = () => {
    const windowWidth = window.innerWidth;
    const containerHeight = page.getBoundingClientRect().height;
      sconfigs.windowWidth > 760 ? images.length / 2 : images.length;

    document.body.style.height = `${sconfigs.containerHeight}px`;
  };

  const startScroll = () => {
    sconfigs.current = window.scrollY;
    sconfigs.previous = (sconfigs.current - sconfigs.previous) * sconfigs.ease;
    sconfigs.round = Math.round(sconfigs.previous * 100) / 100;
    // sconfigs.current = parseFloat(current.toFixed(2))

    const difference = sconfigs.current - sconfigs.round;
    const acceleration = size.width;
    console.log(current);
    setTransforms(page, `translateY(${-current}px)`);
    requestAnimationFrame(startScroll);
  };

  setAnimation();
};

// Loading Animation

// Parallax Animation
// const io = new IntersectionObserver((entries) => {
//   entries.forEach((entry) => {
//     if (entry.intersectionRatio > 0) {
//       const element = entry.target;
//       // element.style.transform = 'translate3d(0, +' + (10) + 'px ,0)'
//     }
//   });
// });

// scrollObs.parallax.forEach((element) => {
//   io.observe(element);
// });

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

const loadingAnimation = () => {
  document.body.classList.add("ready");
};

window.addEventListener("load", loadingAnimation());
smoothScroll();
