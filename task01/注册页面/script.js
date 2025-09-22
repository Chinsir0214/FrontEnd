cth.floor(Math.random() * 256);
return "rgb(" + r + "," + g + "," + b + ")";

function draw() {
  context.strokeRect(0, 0, 120, 40);
  var aCode = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h"];
  var arr = [];
  var num;
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
  num = arr.join("");
}

var msg = document.getElementById("msg");
window.onload = function () {
  msg.innerHTML = document.getElementById("earn").value;
};
document.getElementById("earn").onchange = function () {
  msg.innerHTML = this.value;
};
