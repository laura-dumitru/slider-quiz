// should have a small hand that animates across the slider then disappears
//fix the snap
//make the lines move up
//add transition
// add % on slide and reset back to 0

const answers = ["6 hrs", "7 hrs", "8 hrs", "9 hrs"];
const correctAnswerIndex = 2;
const correctAnswer = answers[correctAnswerIndex];
const column = document.querySelectorAll(".column");

const slider = document.getElementById("slider");
let lines = document.querySelectorAll(".line");

const button = document.getElementById("reset");

const userSelectedText = document.querySelector(".user-selected");
const correctAnswerText = document.querySelector(".correct-answer");

// linesArray.length = [0-3] (4)
// event.target.value [1-100] (%)

function mapRange(inputMin, inputMax, outputMin, outputMax, value) {
  return ((value - inputMin) * (outputMax - outputMin)) / (inputMax - inputMin) + outputMin;
}

slider.style.transition = "value 1s ease-in-out";

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
    column.style.position = "relative"; // Set position to relative
    //column.style.top = "-3em"; // Adjust the top position to push the column elements upwards
    lines.forEach((line) => {
      //line.style.height = "100px";
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

    const reverseMap = mapRange(
      0,
      linesArray.length - 1,
      event.target.min,
      event.target.max,
      correctAnswerIndex
    );

    setTimeout(() => {
      //slider.value = snapPoints[correctAnswerIndex];
      slider.value = reverseMap;
    }, 1000);
  }

  userSelectedText.innerHTML = `You selected <strong>${currentAnswer}</strong>.`;
  correctAnswerText.innerHTML = `The correct answer is: <strong>${correctAnswer}</strong>.`;

  button.addEventListener("click", function () {
    console.log("click");
    slider.value = 0;
    slider.style.backgroundColor = "#8e7dbe";
    lines.forEach((line) => {
      line.style.backgroundColor = "#8e7dbe";
    });
  });
});
