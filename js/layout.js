function loadHTML(id, url, callback) {
  fetch(url)
    .then(res => res.text())
    .then(html => {
      document.getElementById(id).innerHTML = html;
      if (callback) callback();
    });
}

function setActiveMenu() {
  const currentPage =
    location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav_link').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
}

/* =============================
   ⭐ 表單初始化寫成 function
============================= */

function initForm() {
  console.info("Form 初始化");

  const form = document.getElementById("myForm");
  if (!form) return;

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.querySelectorAll("[required]").forEach(input => {
    input.addEventListener("blur", function () {
      validateInput(input);
    });
  });

  form.addEventListener("submit", function (e) {
    let hasError = false;

    form.querySelectorAll("[required]").forEach(input => {
      if (!validateInput(input)) {
        hasError = true;
      }
    });

    if (hasError) e.preventDefault();
  });

  function validateInput(input) {
    const group = input.closest(".form_group");
    const errorMsg = group.querySelector(".msg_error");

    group.classList.remove("error");

    if (input.value.trim() === "") {
      errorMsg.textContent = "Please complete this required field.";
      group.classList.add("error");
      return false;
    }

    if (input.type === "email") {
      if (!emailPattern.test(input.value.trim())) {
        errorMsg.textContent = "Email must be formatted correctly.";
        group.classList.add("error");
        return false;
      }
    }

    return true;
  }
}

// 直接將 initAccordion 改寫成監聽整個 document
function initAccordion() {
    document.addEventListener('click', (e) => {
        // 檢查點擊的是否為 header 或 header 內的子元素
        const header = e.target.closest('.accordion_header');
        if (!header) return;

        const isActive = header.classList.contains('active');

        // 1. 關閉頁面上「所有」的手風琴項目 (達成一次只能開一個)
        document.querySelectorAll('.accordion_header').forEach(btn => {
            btn.classList.remove('active');
        });

        // 2. 如果點擊的那個本來是關的，就打開它
        if (!isActive) {
            header.classList.add('active');
        }
    });
}

// 在 DOM 加載完畢後執行一次監聽即可
document.addEventListener('DOMContentLoaded', () => {
    initAccordion();

    function initBackToTop() {
      const btn = document.getElementById("backToTop");
      if (!btn) return;

      window.addEventListener("scroll", () => {
        if (document.documentElement.scrollTop > 200) {
          btn.style.display = "block";
        } else {
          btn.style.display = "none";
        }
      });

      btn.addEventListener("click", () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      });
    }
    // 其他初始化...
});

/* =============================
   載入區塊
============================= */

loadHTML('header', 'components/header.html', setActiveMenu);

// ⭐ 重點：footer 載入完成後再初始化表單
loadHTML('footer', 'components/footer.html', initForm);
