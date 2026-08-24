/* =========================================================
   AREPA STATION — script compartido
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Menú móvil ---------- */
  const botonMenu = document.querySelector('.nav-alterna');
  const navPrincipal = document.querySelector('.nav-principal');

  if (botonMenu && navPrincipal) {
    botonMenu.addEventListener('click', () => {
      const abierto = document.body.classList.toggle('menu-abierto');
      botonMenu.setAttribute('aria-expanded', abierto ? 'true' : 'false');
    });

    // Cierra el menú al elegir un enlace (útil en móvil)
    navPrincipal.querySelectorAll('a').forEach(enlace => {
      enlace.addEventListener('click', () => {
        document.body.classList.remove('menu-abierto');
        botonMenu.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Aparición al hacer scroll ---------- */
  const elementos = document.querySelectorAll('.aparecer');
  if ('IntersectionObserver' in window && elementos.length) {
    const observador = new IntersectionObserver((entradas) => {
      entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('visto');
          observador.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    elementos.forEach(el => observador.observe(el));
  } else {
    elementos.forEach(el => el.classList.add('visto'));
  }

  /* ---------- Formulario de contacto ---------- */
  const formulario = document.querySelector('#form-contacto');
  if (formulario) {
    formulario.addEventListener('submit', (evento) => {
      evento.preventDefault();

      const mensaje = document.querySelector('#mensaje-envio');
      const boton = formulario.querySelector('button[type="submit"]');
      const textoOriginal = boton.textContent;

      boton.disabled = true;
      boton.textContent = 'Enviando…';

      // NOTA PARA EL DUEÑO DEL SITIO:
      // Este formulario es solo de interfaz (front-end). Para que los
      // mensajes lleguen de verdad a un correo o WhatsApp, hay que conectarlo
      // a un servicio como Formspree, EmailJS o un backend propio.
      setTimeout(() => {
        boton.disabled = false;
        boton.textContent = textoOriginal;
        formulario.reset();
        if (mensaje) {
          mensaje.classList.add('visible');
          mensaje.setAttribute('role', 'status');
          mensaje.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          setTimeout(() => mensaje.classList.remove('visible'), 6000);
        }
      }, 600);
    });
  }

  /* ---------- Lightbox simple para la galería ---------- */
  const fotos = document.querySelectorAll('[data-lightbox]');
  const lightbox = document.querySelector('#lightbox');
  if (fotos.length && lightbox) {
    const lbTitulo = lightbox.querySelector('.lightbox-titulo');
    const lbCerrar = lightbox.querySelector('.lightbox-cerrar');

    fotos.forEach(foto => {
      foto.addEventListener('click', () => {
        lbTitulo.textContent = foto.dataset.lightbox;
        lightbox.classList.add('visible');
        document.body.style.overflow = 'hidden';
      });
    });

    const cerrarLightbox = () => {
      lightbox.classList.remove('visible');
      document.body.style.overflow = '';
    };

    lbCerrar.addEventListener('click', cerrarLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) cerrarLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') cerrarLightbox();
    });
  }

  /* ---------- Año actual en el footer ---------- */
  const anio = document.querySelector('#anio-actual');
  if (anio) anio.textContent = new Date().getFullYear();

});
