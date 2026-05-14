(() => {
  const CONFIG = {
    companyEmail: '0746@1kis.ru',
    companyName: 'ООО «NEW-Контакт»'
  };
  const header = document.querySelector('[data-header]');
  const nav = document.querySelector('[data-nav]');
  const navToggle = document.querySelector('[data-nav-toggle]');
  const toTop = document.querySelector('[data-to-top]');
  const year = document.getElementById('year');
  const leadForm = document.getElementById('leadForm');
  const formStatus = document.getElementById('formStatus');
  const materialSelect = document.getElementById('materialSelect');
  const taskSelect = document.getElementById('taskSelect');
  const recommendation = document.getElementById('recommendation');

  if (year) year.textContent = new Date().getFullYear();

  function handleScroll() {
    const scrolled = window.scrollY > 30;
    header?.classList.toggle('is-scrolled', scrolled);
    toTop?.classList.toggle('is-visible', window.scrollY > 650);
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  navToggle?.addEventListener('click', () => {
    const isOpen = nav?.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(Boolean(isOpen)));
  });
  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  }));
  toTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  const recommendations = {
    steel: {
      corrosion: ['Химическое цинкование или фосфатирование', 'Для стальных деталей чаще всего рассматривают защитное цинкование, фосфатирование или комбинацию покрытий с последующей консервацией.'],
      paint: ['Фосфатирование под окраску', 'Фосфатный слой улучшает адгезию лакокрасочного покрытия и помогает повысить коррозионную стойкость системы покрытия.'],
      solder: ['Лужение или олово-висмут', 'Если деталь работает как контакт или требует пайки, технолог оценивает возможность нанесения оловянного или олово-висмутового покрытия.'],
      black: ['Химическое оксидирование / воронение', 'Для тёмного декоративно-защитного вида стальных деталей подходит химическое оксидирование с последующей консервацией.'],
      wear: ['Оксидирование или фосфатирование', 'Для износостойкости и внешнего вида важно уточнить условия трения, точность размеров и необходимость дополнительной пропитки или масла.']
    },
    aluminum: {
      corrosion: ['Анодирование алюминия', 'Анодирование повышает коррозионную стойкость алюминиевых деталей и улучшает внешний вид поверхности.'],
      paint: ['Подготовка алюминия под покрытие', 'Для окраски алюминиевых деталей нужно уточнить сплав, состояние поверхности и требования к дальнейшему покрытию.'],
      solder: ['Олово-висмут или лужение после подготовки', 'Для пайки алюминия требуется отдельная технологическая оценка поверхности и применимости покрытия.'],
      black: ['Декоративное анодирование или спецобработка', 'Для чёрного внешнего вида алюминия обычно рассматривают анодирование с окрашиванием, если эта операция доступна на производстве.'],
      wear: ['Анодирование', 'Анодный слой помогает повысить износостойкость и защиту алюминиевых деталей.']
    },
    copper: {
      corrosion: ['Лужение / оловянирование', 'Оловянное покрытие защищает контактные поверхности от окисления и улучшает паяемость медных и латунных деталей.'],
      paint: ['Подготовка поверхности по ТЗ', 'Для окраски медных и латунных деталей нужно уточнить требования к адгезии и дальнейшему покрытию.'],
      solder: ['Лужение или олово-висмут', 'Для контактов, клемм, шин и деталей под пайку обычно рассматривают оловянирование или покрытие олово-висмут.'],
      black: ['Специальная химическая обработка', 'Чёрное покрытие для меди и латуни требует уточнения технологии, требуемого цвета и стойкости.'],
      wear: ['Олово-висмут или лужение по назначению', 'Для электротехники важнее паяемость и стабильность контакта; для износа нужно уточнить режим работы детали.']
    },
    mixed: {
      corrosion: ['Подбор после оценки деталей', 'Для смешанной партии лучше отправить перечень материалов и чертежи: разные металлы могут требовать разных технологий подготовки и покрытия.'],
      paint: ['Фосфатирование / подготовка по материалу', 'Подготовка под окраску выбирается отдельно для стали, алюминия, меди и их сплавов.'],
      solder: ['Лужение / олово-висмут после проверки материала', 'Для деталей под пайку критичны материал основания, геометрия и требования к контактной поверхности.'],
      black: ['Оксидирование или отдельная декоративная технология', 'Чёрное покрытие подбирается по материалу: сталь, алюминий, медные сплавы обрабатываются разными способами.'],
      wear: ['Технологический подбор по ТЗ', 'Нужно уточнить материал, размеры, посадки, условия трения и допустимое изменение размеров.']
    }
  };

  function updateRecommendation() {
    if (!materialSelect || !taskSelect || !recommendation) return;
    const [title, text] = recommendations[materialSelect.value][taskSelect.value];
    recommendation.innerHTML = `<span>Рекомендация</span><strong>${title}</strong><p>${text}</p>`;
  }
  materialSelect?.addEventListener('change', updateRecommendation);
  taskSelect?.addEventListener('change', updateRecommendation);
  updateRecommendation();

  function getFormData() {
    const formData = new FormData(leadForm);
    return {
      name: String(formData.get('name') || '').trim(),
      phone: String(formData.get('phone') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      service: String(formData.get('service') || '').trim(),
      message: String(formData.get('message') || '').trim(),
      fileName: leadForm.elements.file?.files?.[0]?.name || ''
    };
  }
  function buildBrief(data) {
    return [
      `Заявка с сайта ${CONFIG.companyName}`,
      '',
      `Имя / компания: ${data.name}`,
      `Телефон: ${data.phone}`,
      `Email: ${data.email || 'не указан'}`,
      `Покрытие: ${data.service}`,
      `Файл: ${data.fileName || 'нужно приложить вручную'}`,
      '',
      'Описание задачи:',
      data.message,
      '',
      'Комментарий: вложения через mailto не прикрепляются автоматически. Пожалуйста, добавьте чертёж или фото к письму вручную.'
    ].join('\n');
  }
  function validate(data) {
    if (!data.name || !data.phone || !data.message) return 'Заполните имя/компанию, телефон и описание задачи.';
    if (data.email && !/^\S+@\S+\.\S+$/.test(data.email)) return 'Проверьте email или оставьте поле пустым.';
    return '';
  }
  function setStatus(message, type = '') {
    if (!formStatus) return;
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`.trim();
  }
  leadForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = getFormData();
    const error = validate(data);
    if (error) return setStatus(error, 'error');
    setStatus('Открываю почтовый клиент. Не забудьте вручную приложить файл к письму.', 'success');
    window.location.href = `mailto:${CONFIG.companyEmail}?subject=${encodeURIComponent(`Заявка на покрытие деталей — ${data.service}`)}&body=${encodeURIComponent(buildBrief(data))}`;
  });
  document.querySelector('[data-download-brief]')?.addEventListener('click', () => {
    const data = getFormData();
    const error = validate(data);
    if (error) return setStatus(error, 'error');
    const blob = new Blob([buildBrief(data)], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'zayavka-new-kontakt.txt';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    setStatus('Файл заявки скачан. Его можно отправить вместе с чертежом или фото.', 'success');
  });
})();
