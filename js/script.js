const processColumnElements = () => {
  const processEl = document.querySelector('.process');
  const itemsColl = processEl.querySelectorAll('.process__item');
  const itemsEndColl = processEl.querySelectorAll('.process__item_end');

  if (itemsEndColl) {
    itemsEndColl.forEach((item) => {
      item.classList.remove('process__item_end');
    })
  }

  const containerWidth = processEl.offsetWidth;
  const itemWidth = 205;
  const gap = 30;

  const itemsPerRow = Math.floor((containerWidth + gap) / (itemWidth + gap));
  const itemsOnNewRow = [...itemsColl].filter((item, i) => (i + 1) % itemsPerRow === 0);

  if (!itemsOnNewRow) return;

  itemsOnNewRow.forEach((item) => {
    const processItemEl = item;
    processItemEl.classList.add('process__item_end');
  });

};

const selectField = () => {
  const selectFieldColl = document.querySelectorAll('.selectField');

  if (!selectFieldColl) return;

  selectFieldColl.forEach((select) => {
    const selectShow = select.querySelector('.selectField__value');
    const selectInput = select.querySelector('.selectField__input');

    select.onclick = (e) => {
      if (!e.target.classList.contains('selectField__option')) {
        e.currentTarget.classList.toggle('selectField_active');
        return;
      };

      const option = e.target;

      const optionValue = option.dataset.value;

      selectShow.textContent = optionValue;
      selectInput.value = optionValue;

      e.currentTarget.classList.toggle('selectField_active');
    }
  });
};

const sliderField = () => {
  const sliderFieldColl = document.querySelectorAll('.sliderField');

  if (!sliderFieldColl) return;

  sliderFieldColl.forEach((slider) => {
    const sliderValue = slider.querySelector('.sliderField__value');
    const sliderInput = slider.querySelector('.sliderField__input');

    sliderInput.oninput = (e) => {
      sliderValue.textContent = `${e.target.value}%`;
    };
  })
};

const fileField = () => {
  const fileFieldsColl = document.querySelectorAll('.fileField');

  if (!fileFieldsColl) return;

  fileFieldsColl.forEach((fileField) => {
    const fileBtn = fileField.querySelector('.fileField__wrapper');
    const fileTitle = fileField.querySelector('.fileField__title');
    const fileInput = fileField.querySelector('.fileField__input');

    fileBtn.onclick = () => {
      fileInput.click();
    };

    fileInput.onchange = (e) => {
      const { name } = e.target.files[0];
      fileTitle.textContent = name;
    };
  });
};

const forms = () => {
  const formsColl = document.querySelectorAll('.form');

  if (!formsColl) return;

  formsColl.forEach((form) => {
    form.onsubmit = (e) => {
      e.preventDefault();

      const fd = new FormData(form);
      const data = {};

      fd.forEach((value, key) => {
        if (!value) return;
        
        data[key] = value;
      });

      console.log(data);
    };
  });
};

const footerLines = () => {
  const footerInfoColl = document.querySelectorAll('.footer__info');

  if (!footerInfoColl || window.innerWidth <= 1196) return;

  footerInfoColl.forEach((info, i) => {
    if (i === 0) return;

    const prevInfo = footerInfoColl[i - 1];

    const distance = info.offsetLeft - (prevInfo.offsetLeft + prevInfo.offsetWidth);
    info.style.setProperty('--left', `-${distance / 2}px`);
  });
};

const mobileMenu = () => {
  const header = document.querySelector('.header');
  const burgerBtn = document.querySelector('.burgerBtn');
  const navEl = document.querySelector('.header__nav');
  const html = document.querySelector('html');
  let timeOut;

  const closeMobileNav = () => {
    burgerBtn.classList.remove('burgerBtn_active');

    navEl.classList.add('header__nav_show');
    navEl.classList.remove('header__nav_active');

    html.style.removeProperty('overflow');

    timeOut = setTimeout(() => {
      header.classList.remove('header_mobileActive');
      navEl.classList.remove('header__nav_show');
      navEl.style.removeProperty('top');
      navEl.style.removeProperty('height');
    }, 400);
  };

  
  if (window.innerWidth > 768) {
    closeMobileNav();
  };

  burgerBtn.onclick = () => {
    clearTimeout(timeOut);

    if (burgerBtn.classList.contains('burgerBtn_active')) {
      closeMobileNav();
      return;
    }

    html.style.overflow = 'hidden';

    burgerBtn.classList.add('burgerBtn_active');

    navEl.style.top = `${header.clientHeight}px`;
    navEl.style.height = `calc(var(--vh) - ${header.clientHeight}px)`;
    navEl.classList.add('header__nav_show');

    setTimeout(() => {
      navEl.classList.add('header__nav_active');
      navEl.classList.remove('header__nav_show');
      header.classList.add('header_mobileActive');
    }, 0);
  };
};

const handleWindowHeight = () => {
  if (window.innerWidth > 768) return;

  const vh = window.innerHeight;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

document.addEventListener('DOMContentLoaded', () => {
  processColumnElements();
  selectField();
  sliderField();
  fileField();
  forms();
  footerLines();
  mobileMenu();
  handleWindowHeight();

  window.onresize = () => {
    processColumnElements();
    footerLines();
    handleWindowHeight();
    mobileMenu();
  }
});