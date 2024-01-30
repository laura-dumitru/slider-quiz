//different font
// responsive

const answers = ["6 hrs", "7 hrs", "8 hrs", "9 hrs"];
const correctAnswerIndex = 2;
const correctAnswer = answers[correctAnswerIndex];

const heights = [60, 80, 100, 80];

const columns = document.querySelectorAll(".column");
const percents = document.querySelectorAll(".percent");

const slider = document.getElementById("slider");

const button = document.getElementById("reset");

const userSelectedText = document.querySelector(".user-selected");
const correctAnswerText = document.querySelector(".correct-answer");

const pointer = document.querySelector(".lucide.lucide-pointer");

// columnsArray.length = [0-3] (4)
// event.target.value [1-100] (%)

let animationFinished = false;

function startAnimation() {
  function pulse() {
    gsap.fromTo(
      pointer,
      { scale: 1 }, // Initial state
      { scale: 1.1, duration: 0.5, repeat: 2, onComplete: moveRight, ease: Power1.easeInOut } // End state and animation options
    );
  }
  pulse();

  function moveRight() {
    gsap.to(pointer, { x: "+=630", duration: 1, onComplete: moveBack, ease: Power1.easeInOut });
  }
  function moveBack() {
    gsap.to(pointer, {
      x: "-=630",
      duration: 1,
      ease: Power1.easeInOut,
      onComplete: iconDisappear,
    });
  }
  // Define the icon disappear animation
  function iconDisappear() {
    gsap.to(pointer, { opacity: 0, duration: 2, onComplete: () => (animationFinished = true) });
    addEventListener();
  }
}
startAnimation();

function mapRange(inputMin, inputMax, outputMin, outputMax, value) {
  return ((value - inputMin) * (outputMax - outputMin)) / (inputMax - inputMin) + outputMin;
}

//slider.style.transition = "value 10s ease-in-out";
//if animation finished running add slider event listener
function addEventListener() {
  slider.addEventListener("input", function (event) {
    const columnsArray = Array.from(columns);
    //console.log(event);
    const mapResult = Math.round(
      mapRange(event.target.min, event.target.max, 0, columnsArray.length - 1, event.target.value)
    );
    const currentAnswer = answers[mapResult];
    console.log(mapResult);

    //console.log(event.target.value);
    Array.from(columns).forEach((column, i) => {
      column.style.height = `${heights[i]}px`;
      column.style.backgroundColor = "#8252AB";
      slider.style.backgroundColor = "#8252AB";
    });

    //console.log(mapResult);
    if (currentAnswer === correctAnswer) {
      console.log("You got it right!");
      // do nothing
    } else {
      console.log("You got it wrong!");
      // snap to correct answer with delay
      // const snapPoints = [10, 3s7, 64, 90];
      //mapRange(0, columnsArray.length - 1, event.target.min, event.target.max, correctAnswerIndex);

      const offset = 0.1;
      const reverseMap = mapRange(
        0,
        columnsArray.length - 1,
        event.target.min,
        event.target.max,
        correctAnswerIndex - offset
      );

      setTimeout(() => {
        //slider.value = snapPoints[correctAnswerIndex];
        slider.value = reverseMap;
      }, 1000);
    }

    userSelectedText.innerHTML = `You selected: <strong>${currentAnswer}</strong>.`;
    correctAnswerText.innerHTML = `The correct answer is: <strong>${correctAnswer}</strong>.`;

    const percentages = ["15%", "20%", "35%", "30%"];

    percents.forEach((percent, index) => {
      percent.style.opacity = "1";
      percent.innerHTML = percentages[index];
    });

    button.addEventListener("click", function () {
      slider.value = 0;
      slider.style.backgroundColor = "#8e7dbe";
      userSelectedText.innerHTML = `You selected:`;
      correctAnswerText.innerHTML = `The correct answer is:`;

      columns.forEach((column) => {
        column.style.backgroundColor = "#8e7dbe";
        column.style.height = "40px";
      });
      percents.forEach((percent, index) => {
        percent.style.opacity = "0";
      });
    });
  });
}
