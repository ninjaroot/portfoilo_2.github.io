
document.addEventListener('DOMContentLoaded', function(){
  var root = document.documentElement;
  var langBtn = document.getElementById('lang-toggle');
  var themeBtn = document.getElementById('theme-toggle');

  function setTheme(mode){
    if(mode==='light'){ root.classList.add('light'); localStorage.setItem('theme','light'); }
    else{ root.classList.remove('light'); localStorage.setItem('theme','dark'); }
  }
  function setLang(lang){
    document.body.setAttribute('data-lang', lang);
    document.documentElement.setAttribute('lang', lang === 'ar' ? 'ar' : 'en');
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    localStorage.setItem('lang', lang);
    var nodes = document.querySelectorAll('[data-i18n]');
    for (var i=0; i<nodes.length; i++){
      var el = nodes[i];
      var key = el.getAttribute('data-i18n');
      var val = translations[lang][key];
      if(val){ el.textContent = val; }
    }
  }
  var toggled = localStorage.getItem('theme_toggled')==='1';
  var startTheme = toggled ? (localStorage.getItem('theme')||'dark') : 'dark';
  setTheme(startTheme);
  var storedLang  = localStorage.getItem('lang') || 'en';
  setLang(storedLang);

  if(themeBtn){ themeBtn.addEventListener('click', function(){ localStorage.setItem('theme_toggled','1'); setTheme(root.classList.contains('light') ? 'dark' : 'light'); }); }
  if(langBtn){ langBtn.addEventListener('click', function(){ setLang(document.body.getAttribute('data-lang')==='ar' ? 'en' : 'ar'); }); }

  window.copyEmail = function(){
    var el = document.querySelector('[data-email]');
    var email = el ? el.textContent.trim() : '';
    if(!email) return;
    navigator.clipboard.writeText(email).then(function(){
      var btn = document.getElementById('copy-btn');
      if(btn){ var old = btn.textContent; btn.textContent='Copied!'; setTimeout(function(){btn.textContent=old;}, 1200); }
    });
  }
});
