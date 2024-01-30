// should have a small hand that animates across the slider then disappears
//different font
// make the lines move up and have different height
// reset % back to 0
// responsive

//console.log(gsap);

const answers = ["6 hrs", "7 hrs", "8 hrs", "9 hrs"];
const correctAnswerIndex = 2;
const correctAnswer = answers[correctAnswerIndex];
const column = document.querySelectorAll(".column");
let percents = document.querySelectorAll(".percent");

const slider = document.getElementById("slider");
const lines = document.querySelectorAll(".column");

const button = document.getElementById("reset");

const userSelectedText = document.querySelector(".user-selected");
const correctAnswerText = document.querySelector(".correct-answer");

const pointer = document.querySelector(".lucide.lucide-pointer");

// linesArray.length = [0-3] (4)
// event.target.value [1-100] (%)

function pulse() {
  gsap.fromTo(
    pointer,
    { scale: 1 }, // Initial state
    { scale: 1.1, duration: 0.5, repeat: 2, onComplete: moveRight, ease: Power1.easeInOut } // End state and animation options
  );
}
pulse();

function moveRight() {
  gsap.to(pointer, { x: "+=630", duration: 1.5, onComplete: moveBack, ease: Power1.easeInOut });
}
function moveBack() {
  gsap.to(pointer, { x: "-=630", duration: 1.5, ease: Power1.easeInOut });
}

function mapRange(inputMin, inputMax, outputMin, outputMax, value) {
  return ((value - inputMin) * (outputMax - outputMin)) / (inputMax - inputMin) + outputMin;
}

//slider.style.transition = "value 10s ease-in-out";

slider.addEventListener("input", function (event) {
  const linesArray = Array.from(lines);
  //console.log(event);
  const mapResult = Math.round(
    mapRange(event.target.min, event.target.max, 0, linesArray.length - 1, event.target.value)
  );
  const currentAnswer = answers[mapResult];
  console.log(mapResult);

  //console.log(event.target.value);
  Array.from(column).forEach((column) => {
    //column.style.position = "relative";
    //column.style.top = "-1px";
    lines.forEach((line) => {
      line.style.height = "120px";
      line.style.backgroundColor = "#8252AB";
      slider.style.backgroundColor = "#8252AB";
    });
  });

  //console.log(mapResult);
  if (currentAnswer === correctAnswer) {
    console.log("You got it right!");
    // do nothing
  } else {
    console.log("You got it wrong!");
    // snap to correct answer with delay
    // const snapPoints = [10, 37, 64, 90];
    //mapRange(0, linesArray.length - 1, event.target.min, event.target.max, correctAnswerIndex);

    const offset = 0.1;
    const reverseMap = mapRange(
      0,
      linesArray.length - 1,
      event.target.min,
      event.target.max,
      correctAnswerIndex - offset
    );

    setTimeout(() => {
      //slider.value = snapPoints[correctAnswerIndex];
      slider.value = reverseMap;
    }, 1000);
  }

  userSelectedText.innerHTML = `You selected <strong>${currentAnswer}</strong>.`;
  correctAnswerText.innerHTML = `The correct answer is: <strong>${correctAnswer}</strong>.`;

  const percentages = ["9%", "20%", "39%", "32%"];

  percents.forEach((percent, index) => {
    percent.style.opacity = "1";
    percent.innerHTML = percentages[index];
  });

  button.addEventListener("click", function () {
    console.log("click");
    slider.value = 0;
    slider.style.backgroundColor = "#8e7dbe";

    lines.forEach((line) => {
      line.style.backgroundColor = "#8e7dbe";
      line.style.height = "50px";
    });
  });
});
