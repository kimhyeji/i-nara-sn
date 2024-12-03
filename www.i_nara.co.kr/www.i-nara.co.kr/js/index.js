if (/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
  window.location = `microsoft-edge:${window.location}`;
  setTimeout(function () {
    window.location = 'https://go.microsoft.com/fwlink/?linkid=2135547';
  }, 1);
}

let viewW = window.innerWidth;
let viewH = window.innerHeight;
let isMobile = viewW <= 1023;
let headerH = isMobile ? 72 : 120;
const { body } = document;

(() => {
  const accordion = document.querySelectorAll('.accordion');
  accordion.forEach((el) => {
    const items = el.querySelectorAll('.accordion .accordion__head');

    items.forEach((item) => {
      item.addEventListener('click', () => {
        if (item.classList.contains('expanded')) {
          return;
        }
        const itemToggle = item.getAttribute('aria-expanded');
        if (el.classList.contains('accordion--one')) {
          for (let i = 0; i < items.length; i++) {
            items[i].setAttribute('aria-expanded', 'false');
          }
        }
        if (itemToggle === 'false') {
          item.setAttribute('aria-expanded', 'true');
        } else {
          item.setAttribute('aria-expanded', 'false');
        }
      });
    });
  });

  // header
  let scrollDir = 'up';
  let preScroll = -1;
  let currScroll;

  const setScrollDir = () => {
    scrollDir = preScroll - currScroll > 0 ? 'up' : 'down';
  };

  const html = document.querySelector('html');
  const header = document.querySelector('header');
  let isHeaderNormal;

  if (window.location.pathname !== '/') {
    html.classList.remove('h-s--dark');
  }

  const setHeaderBg = () => {
    const isDark = html.classList.value.includes('h-s--dark');
    const isColor = html.classList.value.includes('h-s--color');

    if (!isDark && !isColor) {
      window.scrollY > headerH
        ? html.classList.add('h-s--white')
        : html.classList.remove('h-s--white');
    }
  };

  const setHeaderHide = () => {
    if (isHeaderNormal && scrollDir === 'up') {
      header.classList.remove('s-hide');
    } else if (isHeaderNormal && scrollDir === 'down') {
      window.scrollY > headerH / 2 && header.classList.add('s-hide');
    }
  };

  // scroll
  window.addEventListener('scroll', () => {
    const isHeaderOpen = header
      ? header.classList.value.includes('s-open')
      : false;
    currScroll = window.scrollY;
    setHeaderBg();
    setScrollDir();
    !isHeaderOpen && setHeaderHide();
    preScroll = window.scrollY;
  });

  const popupAll = document.querySelectorAll('.popup');

  // popupScroll
  const popupScroll = () => {
    popupAll.forEach((el) => {
      const content = el.querySelector('.popup__content');
      const contentHeight = el.querySelector('.popup__standard').offsetHeight;
      const standard = getComputedStyle(content).maxHeight.split('px');
      content.scrollTop = 0;
      if (contentHeight > standard[0]) {
        content.classList.add('s-scrollbar');
      }
    });
  };

  window.addEventListener('resize', () => {
    isMobile = viewW <= 1023;
    viewW = window.innerWidth;
    viewH = window.innerHeight;
    headerH = isMobile ? 72 : 120;
    popupScroll();
  });

  setHeaderBg();
})();
