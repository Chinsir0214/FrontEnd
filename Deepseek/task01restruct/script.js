document.addEventListener("DOMContentLoaded", function () {
  // --- DOM 元素获取 ---
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");
  const earnSlider = document.getElementById("earn");
  const earnValueSpan = document.getElementById("earnValue");
  const form = document.getElementById("registrationForm");

  // --- 验证码相关 ---
  let captchaText = "";

  function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
  }

  function generateCaptcha() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#f0f0f0"; // 背景色
    context.fillRect(0, 0, canvas.width, canvas.height);

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let generatedText = "";

    for (let i = 0; i < 4; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      generatedText += char;

      const x = 20 + i * 25;
      const y = 25 + Math.random() * 10 - 5;
      const angle = (Math.random() - 0.5) * 0.5; // 旋转角度

      context.save();
      context.font = `bold ${20 + Math.random() * 4}px Arial`;
      context.fillStyle = getRandomColor();
      context.translate(x, y);
      context.rotate(angle);
      context.fillText(char, 0, 0);
      context.restore();
    }
    
    // 绘制干扰线
    for(let i = 0; i < 5; i++) {
        context.beginPath();
        context.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
        context.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
        context.strokeStyle = getRandomColor();
        context.stroke();
    }

    captchaText = generatedText;
  }

  // 点击 canvas 刷新验证码
  canvas.addEventListener("click", generateCaptcha);

  // --- 月薪滑块 ---
  earnSlider.addEventListener("input", function () {
    earnValueSpan.textContent = this.value;
  });

  // --- 表单验证 ---
  function showError(inputId, message) {
    const errorElement = document.getElementById(inputId + "Error");
    errorElement.textContent = message;
    errorElement.style.display = "block";
  }

  function clearError(inputId) {
    const errorElement = document.getElementById(inputId + "Error");
    errorElement.textContent = "";
    errorElement.style.display = "none";
  }

  function validateForm() {
    let isValid = true;
    clearAllErrors();

    // 1. 验证手机号
    const phone = document.getElementById("phone").value.trim();
    if (phone === "") {
      showError("phone", "手机号码不能为空");
      isValid = false;
    } else if (!/^1[3-9]\d{9}$/.test(phone)) {
      showError("phone", "请输入有效的11位手机号码");
      isValid = false;
    }

    // 2. 验证密码
    const password = document.getElementById("password").value;
    if (password === "") {
      showError("password", "密码不能为空");
      isValid = false;
    } else if (password.length < 8 || password.length > 16) {
      showError("password", "密码长度必须为8-16位");
      isValid = false;
    }

    // 3. 验证邮箱
    const email = document.getElementById("email").value.trim();
    if (email === "") {
      showError("email", "邮箱不能为空");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError("email", "请输入有效的邮箱地址");
      isValid = false;
    }

    // 4. 验证验证码
    const captchaInput = document.getElementById("captchaInput").value.trim();
    if (captchaInput === "") {
      showError("captcha", "验证码不能为空");
      isValid = false;
    } else if (captchaInput.toLowerCase() !== captchaText.toLowerCase()) {
      showError("captcha", "验证码不正确");
      generateCaptcha(); // 验证失败后刷新验证码
      isValid = false;
    }
    
    return isValid;
  }

  function clearAllErrors() {
      const errorSpans = document.querySelectorAll('.error-msg');
      errorSpans.forEach(span => {
          span.textContent = '';
          span.style.display = 'none';
      });
  }

  // 表单提交事件
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // 阻止表单默认提交行为

    if (validateForm()) {
      alert("注册成功！");
      // 在这里可以执行真正的表单提交操作，例如使用 AJAX 发送到服务器
      // form.submit(); // 如果要执行传统的表单提交
    } else {
      alert("请检查表单中的错误信息！");
    }
  });

  // --- 初始化页面 ---
  generateCaptcha();
  earnValueSpan.textContent = earnSlider.value; // 页面加载时初始化月薪显示
});