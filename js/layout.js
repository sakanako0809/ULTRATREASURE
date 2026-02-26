/* =============================
   載入 HTML component
============================= */

function loadHTML(id, url, callback) {
  fetch(url)
    .then(res => res.text())
    .then(html => {
      document.getElementById(id).innerHTML = html;
      if (callback) callback();
    });
}

/* =============================
   Header active menu
============================= */

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
   表單驗證
============================= */

function initForm() {
  console.info("Form 初始化");

  const form = document.getElementById("myForm");
  if (!form) return;

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.querySelectorAll("[required]").forEach(input => {
    input.addEventListener("blur", () => {
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

/* =============================
   Accordion
============================= */

function initAccordion() {
  document.addEventListener('click', (e) => {

    const header = e.target.closest('.accordion_header');
    if (!header) return;

    const isActive = header.classList.contains('active');

    document.querySelectorAll('.accordion_header').forEach(btn => {
      btn.classList.remove('active');
    });

    if (!isActive) {
      header.classList.add('active');
    }
  });
}

/* =============================
   Back To Top
============================= */

function initBackToTop() {

  const btn = document.getElementById("backToTop");
  if (!btn) return;

  window.addEventListener("scroll", () => {

    if (document.documentElement.scrollTop > 200) {
      btn.classList.add("show");
    } else {
      btn.classList.remove("show");
    }

  });

  btn.addEventListener("click", () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });
}

/* =============================
   App 初始化
============================= */

function initApp() {

  initAccordion();

  loadHTML('header', 'components/header.html', setActiveMenu);

  loadHTML('footer', 'components/footer.html', () => {
    initForm();
    initBackToTop();
  });

}

/* =============================
   DOM ready
============================= */

document.addEventListener('DOMContentLoaded', initApp);