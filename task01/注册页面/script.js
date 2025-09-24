window.onload = function () {
  var earnInput = document.getElementById("earn");
  var msgSpan = document.getElementById("msg");

  msgSpan.innerHTML = earnInput.value;

  earnInput.oninput = function () {
    msgSpan.innerHTML = this.value;
  };

  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  var submitButton = document.getElementById("bt");
  var inputCode = document.getElementById("text");
  var generatedCode = "";

  function getColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + "," + g + "," + b + ")";
  }

  function draw() {
    context.fillStyle = getColor();
    context.fillRect(0, 0, 120, 40);

    var aCode = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
    ];
    var arr = [];

    for (var i = 0; i < 4; i++) {
      var x = 20 + i * 20;
      var y = 20 + 10 * Math.random();
      var index = Math.floor(Math.random() * aCode.length);
      var txt = aCode[index];

      context.font = "bold 20px 微软雅黑";
      context.fillStyle = getColor();

      context.translate(x, y);
      var deg = (90 * Math.random() * Math.PI) / 180;
      context.rotate(deg);
      context.fillText(txt, 0, 0);
      context.rotate(-deg);
      context.translate(-x, -y);

      arr[i] = txt;
    }

    generatedCode = arr.join("");

    for (var j = 0; j < 5; j++) {
      context.beginPath();
      context.moveTo(Math.random() * 120, Math.random() * 40);
      context.lineTo(Math.random() * 120, Math.random() * 40);
      context.strokeStyle = getColor;
      context.stroke();
    }
  }

  draw();

  canvas.onclick = function () {
    draw();
  };

  submitButton.onclick = function () {
    if (inputCode.value.toLowerCase() === generatedCode.toLowerCase()) {
      alert("验证码正确！");
    } else {
      alert("验证码错误，请重新输入！");
      draw();
    }
  };
};
