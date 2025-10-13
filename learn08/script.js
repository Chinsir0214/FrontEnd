const msg = document.getElementById("msg");
const btn = document.getElementById("add");
const btn2 = document.getElementById("minus");
let count = 0;

function add() {
  count++;
  if (count >= 0) {
    msg.innerHTML = `+${count}s`;
  } else {
    msg.innerHTML = `${count}s`;
  }
  console.log(`长者已经续了：${count}秒`);
}

function minus() {
  count--;
  if (count >= 0) {
    msg.innerHTML = `+${count}s`;
  } else {
    msg.innerHTML = `${count}s`;
  }
  console.log(`长者已经续了：${count}秒`);
}

btn.addEventListener("click", add);
btn2.addEventListener("click",minus)