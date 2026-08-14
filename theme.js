/* ------------------------------------------------------------------
   Accent preview switcher — TEMPORARY.

   Lets the accent colour be swapped live so it can be judged in place
   rather than argued about in the abstract. Delete this file, its
   <script> tags, the [data-accent] rules in styles.css, and the
   media/art-*--*.webp variants once the colour is decided.

   The collage cutouts carry their accent baked into the pixels, so each
   theme has its own recoloured set; changing the CSS variable alone
   would leave orange pictures on a teal page.
   ------------------------------------------------------------------ */
(function () {
  var THEMES = [
    { id: 'orange', label: 'Burnt orange', swatch: '#C05B2B' },
    { id: 'teal',   label: 'Teal',         swatch: '#2E8F8B' },
    { id: 'moss',   label: 'Moss',         swatch: '#67824C' },
    { id: 'ochre',  label: 'Ochre',        swatch: '#A58833' }
  ];
  var KEY = 'thl-accent';
  var root = document.documentElement;

  function apply(id) {
    if (id === 'orange') root.removeAttribute('data-accent');
    else root.setAttribute('data-accent', id);

    // swap the baked-in art for this accent's set
    var arts = document.querySelectorAll('img.art');
    for (var i = 0; i < arts.length; i++) {
      var img = arts[i];
      if (!img.dataset.base) img.dataset.base = img.getAttribute('src');
      var base = img.dataset.base.replace(/\.webp$/, '');
      img.src = (id === 'orange') ? img.dataset.base : base + '--' + id + '.webp';
    }

    var btns = document.querySelectorAll('.accent-pick button');
    for (var j = 0; j < btns.length; j++) {
      btns[j].setAttribute('aria-pressed', btns[j].dataset.id === id ? 'true' : 'false');
    }
    try { localStorage.setItem(KEY, id); } catch (e) {}
  }

  var saved = 'orange';
  try { saved = localStorage.getItem(KEY) || 'orange'; } catch (e) {}

  function build() {
    var box = document.createElement('div');
    box.className = 'accent-pick';
    var lab = document.createElement('span');
    lab.className = 'label';
    lab.textContent = 'Accent · preview';
    box.appendChild(lab);

    var row = document.createElement('div');
    row.className = 'accent-row';
    THEMES.forEach(function (t) {
      var b = document.createElement('button');
      b.type = 'button';
      b.dataset.id = t.id;
      b.title = t.label;
      b.setAttribute('aria-label', t.label);
      b.style.background = t.swatch;
      b.addEventListener('click', function () { apply(t.id); });
      row.appendChild(b);
    });
    box.appendChild(row);
    document.body.appendChild(box);
    apply(saved);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
