const answers = ["6hrs", "7hrs", "8hrs", "9hrs"];
const correctAnswer = answers[2];

const slider = document.getElementById("slider");
const lines = document.querySelectorAll(".line");

function mapRange(inputMin, inputMax, outputMin, outputMax, value) {
  return ((value - inputMin) * (outputMax - outputMin)) / (inputMax - inputMin) + outputMin;
}

slider.addEventListener("input", function (event) {
  //console.log("fuck off");
  const linesArray = Array.from(lines);
  //console.log(event);
  const mapResult = Math.round(
    mapRange(event.target.min, event.target.max, 0, linesArray.length - 1, event.target.value)
  );
  const currentAnswer = answers[mapResult];

  console.log(mapResult);
  if (currentAnswer === correctAnswer) {
    console.log("You got it right!");
  } else {
    console.log("You got it wrong!");
  }
});

//linesArray.length 0-3
// event.target.value 1-100
