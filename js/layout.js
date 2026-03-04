/* =============================
   Google Translate Loader
============================= */
let googleTranslateInitialized = false;

function loadGoogleTranslate(callback) {

  if (window.google && google.translate && google.translate.TranslateElement) {
    callback();
    return;
  }

  if (!document.getElementById("google-translate-script")) {
    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src = "//translate.google.com/translate_a/element.js";
    script.async = true;

    document.body.appendChild(script);
  }

  const checkReady = setInterval(() => {
    if (window.google &&
        google.translate &&
        google.translate.TranslateElement) {

      clearInterval(checkReady);
      callback();
    }
  }, 100);
}


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
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav_link').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  // loadGoogleTranslate(() => {
  //   if (!googleTranslateInitialized) {

  //     new google.translate.TranslateElement({
  //       pageLanguage: 'en',
  //       includedLanguages: 'zh-TW',
  //       autoDisplay: false,
  //     }, 'google_language_translator');

  //     googleTranslateInitialized = true;
  //   }
  // });
}

function initGoogleTranslateButtons() {
    const googtrans = getCookie('googtrans');
    const btnZh = document.querySelector('.chglan[data-lan="zh-TW"]');
    const btnEn = document.querySelector('.chglan[data-lan="en"]');
    if(!btnZh || !btnEn) return;
    if(googtrans && googtrans.includes('zh-TW')) {
        // 已經翻成中文 顯示切回英文按鈕
        btnZh.style.display = 'none';
        btnEn.style.display = 'inline-block';
    } else {
        // 英文或沒 cookie 顯示切中文按鈕
        btnZh.style.display = 'inline-block';
        btnEn.style.display = 'none';
    }

    document.querySelectorAll('.chglan').forEach(btn => {
        btn.addEventListener('click', () => {
            let lang = btn.dataset.lan;
            let select = document.querySelector(".goog-te-combo");
            if(select){
                if(lang == 'en'){
                    select.value = '';
                    clearGoogleTranslateCookie();
                    location.reload();
                } else {
                    select.value = lang;
                }
                select.dispatchEvent(new Event("change"));
            }

            document.querySelectorAll('.chglan').forEach(b => b.style.display = 'none');
            btn.style.display = 'none';
            let other = document.querySelector(`.chglan[data-lan="${lang === 'zh-TW' ? 'en' : 'zh-TW'}"]`);
            if(other) other.style.display = 'inline-block';
        });
    });
}

function getCookie(name) {
    const cookies = document.cookie.split(';').map(c => c.trim());
    let matched = cookies
        .filter(c => c.startsWith(name + '='))
        .map(c => c.substring((name + '=').length));

    if (matched.length === 0) return null;
    matched.sort((a, b) => b.length - a.length);

    return matched[0];
}

function clearGoogleTranslateCookie() {
    const expires = 'Thu, 01 Jan 1970 00:00:00 GMT';
    // 同時刪除主網域與子網域
    document.cookie = `googtrans=; path=/; domain=.ultratreasure3688.com; expires=${expires}`;
    document.cookie = `googtrans=; path=/; domain=ultratreasure3688.com; expires=${expires}`;
    document.cookie = `googtrans=; path=/; expires=${expires}`; // 當前 host
}



/* =============================
   表單驗證
============================= */

function initForm() {
  const form = document.getElementById("myForm");
  if (!form) return;

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.querySelectorAll("[required]").forEach(input => {
    input.addEventListener("blur", () => {
      validateInput(input);
    });
  });

  form.addEventListener("submit", async function (e) {
    e.preventDefault(); // 阻止跳轉
    let hasError = false;

    form.querySelectorAll("[required]").forEach(input => {
      if (!validateInput(input)) {
        hasError = true;
      }
    });

    if (hasError) return;

    const formData = new FormData(form);
    fetch('send.php', {method: 'POST', body: formData});
    form.reset();
    document.querySelector('#myForm').style.display = 'none';
    document.querySelector('#sendover').style.display = '';
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
  loadHTML('header', 'components/header.html', () => {
    setActiveMenu();   
    initGoogleTranslateButtons();
  });

  loadHTML('footer', 'components/footer.html', () => {
    initForm();
    initBackToTop();
  });

}

/* =============================
   DOM ready
============================= */

document.addEventListener('DOMContentLoaded', initApp);
