/* Tumbao Revolver Club — interacciones y menú */
(function () {
  "use strict";

  /* ---------- Datos del menú (de assets/menu-carta.pdf) ---------- */
  var MENU = [
    {
      id: "cerveza", title: "Cerveza", note: "Bien fría",
      groups: [{ items: [
        ["Amstel", 60], ["Bohemia", 60], ["Carta Blanca", 60], ["Miller High Life", 60],
        ["Miller Lite", 60], ["Modelo Especial", 60], ["Negra Modelo", 60], ["Ultra", 60],
        ["Ámbar", 45], ["Corona Clara", 45], ["Corona Golden", 45], ["Indio", 45],
        ["Pacífico", 45], ["Tecate Light", 45], ["Tecate Cero", 45], ["Corona Cero", 45],
        ["Victoria", 45], ["XX Lager", 45]
      ] }]
    },
    {
      id: "tequila", title: "Tequila", note: "Hecho en México",
      groups: [
        { title: "Botella", items: [
          ["1800", 1700], ["7 Leguas", 1700], ["Don Julio 70 Cristalino", 1700],
          ["400 Conejos", 1500], ["Maestro Dobel", 1500], ["Don Julio Blanco", 1400],
          ["Centenario Plata", 1100], ["Hornitos", 950], ["José Cuervo", 850],
          ["Tradicional Reposado", 850]
        ] },
        { title: "Copa", items: [
          ["1800 Cristalino", 160], ["Don Julio 70", 160], ["Don Julio Blanco", 150],
          ["Maestro Dobel", 150], ["Mezcal", 140], ["Centenario Plata", 130],
          ["Tradicional Plata", 130]
        ] }
      ]
    },
    {
      id: "whiskey", title: "Whiskey", note: "Para la mesa",
      groups: [
        { title: "Botella", items: [
          ["Black Label", 1700], ["Buchanan's 12", 1600], ["Chivas Regal 12", 1600],
          ["Red Label", 1300], ["Black & White", 850]
        ] },
        { title: "Copa", items: [
          ["Black Label", 160], ["Buchanan's 12", 160], ["Chivas 12", 160], ["Red Label", 130]
        ] }
      ]
    },
    {
      id: "ron", title: "Ron", note: "Del Caribe",
      groups: [
        { title: "Botella", items: [
          ["Zacapa", 1900], ["Torres 10", 1000], ["Bacardí Blanco", 850], ["Capitán Morgan", 850]
        ] },
        { title: "Copa", items: [
          ["Zacapa", 180], ["Bacardí Blanco", 130], ["Capitán Morgan", 130], ["Torres 10", 130]
        ] }
      ]
    },
    {
      id: "vodka", title: "Vodka", note: "Botella",
      groups: [{ items: [["Smirnoff Tamarindo", 850], ["Oso Negro", 750]] }]
    },
    {
      id: "cocteleria", title: "Coctelería", note: "Promos 2x1",
      groups: [
        { title: "Botella", items: [
          ["Tanqueray", 1400], ["Baileys", 950], ["Boone's", 650], ["Vino Tinto", 550]
        ] },
        { title: "Cocteles y copas", items: [
          ["Bufanda", 199, "2x1"], ["Perlas Negras", 190, "2x1"], ["Copa Hpnotiq", 150],
          ["Copa Jäger", 140], ["Clamato Sabinas", 130], ["Copa Tanqueray", 120],
          ["Piña Colada", 110], ["Margarita", 100], ["Copa Baileys", 95],
          ["Caribe Cooler", 60], ["Clamato", 60], ["Michelada", 60]
        ] }
      ]
    },
    {
      id: "platillos", title: "Platillos", note: "De la cocina",
      groups: [{ items: [
        ["Nachos Revolver", 130, "Casa"], ["Chicharrones a la Mexicana", 100],
        ["Papas Francesas Revolver", 99, "Casa"], ["Orden de Tacos", 90]
      ] }]
    },
    {
      id: "tiendita", title: "Tiendita", note: "Para picar",
      groups: [
        { items: [
          ["Carne Seca", 90], ["Aceitunas", 70], ["Cacahuate Cáscara", 70], ["Camarón Seco", 60],
          ["Chicharrones", 50], ["Papas Fritas", 50], ["Chicles / Pastillas", 30]
        ] },
        { title: "Cigarros", items: [["Marlboro Blanco", 170], ["Marlboro Rojo", 170]] }
      ]
    },
    {
      id: "refrescos", title: "Refrescos", note: "Sin alcohol",
      groups: [{ items: [
        ["Amper", 60], ["Boost", 60], ["Limonada Mineral", 60], ["Agua Mineral 355 ml", 45],
        ["Agua Natural", 45], ["Agua Quina", 45], ["Coca-Cola 355 ml", 45], ["Squirt o Fresca 355 ml", 45]
      ] }]
    }
  ];

  var money = function (n) { return "$" + n.toLocaleString("es-MX"); };

  function el(tag, attrs, text) {
    var node = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { node.setAttribute(k, attrs[k]); });
    if (text != null) node.textContent = text;
    return node;
  }

  /* ---------- Render del menú con pestañas ---------- */
  var tabs = document.getElementById("menu-tabs");
  var panels = document.getElementById("menu-panels");

  if (tabs && panels) {
    MENU.forEach(function (cat, i) {
      var tab = el("button", {
        type: "button", role: "tab", id: "tab-" + cat.id,
        "aria-controls": "panel-" + cat.id, "aria-selected": i === 0 ? "true" : "false",
        tabindex: i === 0 ? "0" : "-1", "class": "menu__tab"
      }, cat.title);
      tabs.appendChild(tab);

      var panel = el("div", { role: "tabpanel", id: "panel-" + cat.id, "aria-labelledby": "tab-" + cat.id, "class": "menu__panel" });
      if (i !== 0) panel.hidden = true;

      var h = el("h3", { "class": "menu__cat-title" }, cat.title);
      h.appendChild(el("small", null, cat.note));
      panel.appendChild(h);

      cat.groups.forEach(function (g) {
        var wrap = el("div", { "class": "menu__group" });
        if (g.title) wrap.appendChild(el("h4", { "class": "menu__group-title" }, g.title));
        var ul = el("ul", { "class": "menu__list" });
        g.items.forEach(function (it) {
          var li = el("li", { "class": "menu__item" });
          var name = el("span", { "class": "menu__name" }, it[0]);
          if (it[2]) name.appendChild(el("span", { "class": "menu__tag" }, it[2]));
          li.appendChild(name);
          li.appendChild(el("span", { "class": "menu__dots", "aria-hidden": "true" }));
          li.appendChild(el("span", { "class": "menu__price" }, money(it[1])));
          ul.appendChild(li);
        });
        wrap.appendChild(ul);
        panel.appendChild(wrap);
      });
      panels.appendChild(panel);
    });

    var allTabs = Array.prototype.slice.call(tabs.querySelectorAll(".menu__tab"));
    function select(tab) {
      allTabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute("aria-selected", on ? "true" : "false");
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
      });
      tab.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
    }
    tabs.addEventListener("click", function (e) {
      var t = e.target.closest(".menu__tab");
      if (t) select(t);
    });
    tabs.addEventListener("keydown", function (e) {
      var i = allTabs.indexOf(document.activeElement);
      if (i < 0) return;
      var next = null;
      if (e.key === "ArrowRight") next = allTabs[(i + 1) % allTabs.length];
      if (e.key === "ArrowLeft") next = allTabs[(i - 1 + allTabs.length) % allTabs.length];
      if (e.key === "Home") next = allTabs[0];
      if (e.key === "End") next = allTabs[allTabs.length - 1];
      if (next) { e.preventDefault(); next.focus(); select(next); }
    });
  }

  /* ---------- Navegación ---------- */
  var nav = document.querySelector(".nav");
  var toggle = document.querySelector(".nav__toggle");
  var links = document.querySelectorAll(".nav__links a");

  function onScroll() { nav.classList.toggle("is-scrolled", window.scrollY > 40); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  });
  Array.prototype.forEach.call(links, function (a) {
    a.addEventListener("click", function () {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- Sección activa + revelado ---------- */
  if ("IntersectionObserver" in window) {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); revealObs.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(function (n) { revealObs.observe(n); });

    var sectionObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        Array.prototype.forEach.call(links, function (a) {
          a.classList.toggle("is-active", a.getAttribute("href") === "#" + en.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll("main section[id]").forEach(function (s) { sectionObs.observe(s); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (n) { n.classList.add("is-visible"); });
  }

  /* ---------- Lightbox ---------- */
  var lb = document.getElementById("lightbox");
  var lbImg = lb.querySelector("img");
  var lastFocus = null;
  function openLb(src, alt) {
    lastFocus = document.activeElement;
    lbImg.src = src; lbImg.alt = alt || "";
    lb.hidden = false;
    document.body.style.overflow = "hidden";
    lb.querySelector(".lightbox__close").focus();
  }
  function closeLb() {
    lb.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }
  var menuBtn = document.getElementById("open-menu-img");
  if (menuBtn) menuBtn.addEventListener("click", function () { openLb("assets/img/menu-1.jpg", "Carta completa de Tumbao Revolver Club"); });
  lb.addEventListener("click", function (e) { if (e.target === lb || e.target.closest(".lightbox__close")) closeLb(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !lb.hidden) closeLb(); });

  /* ---------- Año ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
