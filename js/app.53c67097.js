// Animações de entrada. Quem pediu menos animação no sistema vê tudo parado.
AOS.init({
  once: true,
  offset: 50,
  duration: 800,
  easing: 'ease-out-cubic',
  disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches
});

// Imagens não podem ser arrastadas (pedido do dono). O CSS e o draggable="false" já
// resolvem na maioria dos navegadores; isto cobre os que ignoram os dois.
document.addEventListener('dragstart', function (e) {
  if (e.target && e.target.tagName === 'IMG') e.preventDefault();
});

// Carrega o mapa um pouco antes de ele aparecer na tela.
//
// Por que não usamos loading="lazy": se o mapa um dia ficar dentro de um bloco com
// animação de entrada (que começa invisível), o navegador nunca o carrega. Aconteceu
// no site do Rafael Mansur, no celular.
//
// Dois caminhos independentes chamam a mesma função, que só age uma vez:
//   1. IntersectionObserver, que é o jeito eficiente;
//   2. uma conferência de posição a cada rolagem, que funciona em qualquer navegador.
(function () {
  var mapa = document.querySelector('iframe[data-src]');
  if (!mapa) return;

  var alvo = document.getElementById('localizacao') || mapa;
  var MARGEM = 600; // começa a carregar 600px antes de chegar na tela
  var observador = null;

  function carregar() {
    if (!mapa || mapa.src) return;
    mapa.src = mapa.getAttribute('data-src');
    mapa.removeAttribute('data-src');
    window.removeEventListener('scroll', conferir);
    window.removeEventListener('resize', conferir);
    if (observador) observador.disconnect();
  }

  function conferir() {
    if (mapa.src) return;
    var r = alvo.getBoundingClientRect();
    if (r.top - MARGEM < window.innerHeight && r.bottom + MARGEM > 0) carregar();
  }

  if ('IntersectionObserver' in window) {
    observador = new IntersectionObserver(function (entradas) {
      for (var i = 0; i < entradas.length; i++) {
        if (entradas[i].isIntersecting) return carregar();
      }
    }, { rootMargin: MARGEM + 'px' });
    observador.observe(alvo);
  }

  window.addEventListener('scroll', conferir, { passive: true });
  window.addEventListener('resize', conferir, { passive: true });
  conferir(); // caso a seção já esteja perto quando a página abre
})();
