// Обработка фильтрации курсов
document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const courseCards = document.querySelectorAll('.course-card');
  
  // Функция для фильтрации курсов
  function filterCourses(category) {
    courseCards.forEach(card => {
      const cardCategory = card.querySelector('.course-badge').textContent.trim();
      
      if (category === 'All' || cardCategory.includes(category)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
    
    // Обновление активной кнопки
    filterButtons.forEach(btn => {
      btn.classList.remove('active');
      if (btn.textContent.trim().includes(category)) {
        btn.classList.add('active');
      }
    });
  }
  
  // Обработчики кликов для кнопок фильтров
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Получаем категорию из текста кнопки (без цифр)
      let category = this.textContent.trim();
      
      // Убираем цифры из текста
      category = category.replace(/[0-9]/g, '').trim();
      
      // Убираем "& Recruting" для HR
      if (category.includes('HR')) {
        category = 'HR & Recruting';
      }
      
      // Для кнопки "All"
      if (category === 'All') {
        category = 'All';
      }
      
      // Применяем фильтр
      filterCourses(category);
    });
  });
  
  // Инициализация - показываем все курсы
  filterCourses('All');
  
  // Поиск курсов
  const searchInput = document.querySelector('.input-label input');
  
  searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase().trim();
    
    if (searchTerm === '') {
      // Если поле поиска пустое, возвращаем текущий фильтр
      const activeButton = document.querySelector('.filter-btn.active');
      let activeCategory = activeButton.textContent.trim();
      activeCategory = activeCategory.replace(/[0-9]/g, '').trim();
      
      if (activeCategory.includes('HR')) {
        activeCategory = 'HR & Recruting';
      }
      
      filterCourses(activeCategory);
      return;
    }
    
    // Фильтрация по поисковому запросу
    courseCards.forEach(card => {
      const title = card.querySelector('.course-title').textContent.toLowerCase();
      const instructor = card.querySelector('.original-price').textContent.toLowerCase();
      
      if (title.includes(searchTerm) || instructor.includes(searchTerm)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
  
  const loadMoreBtn = document.querySelector('.load-more-btn');
  
  loadMoreBtn.addEventListener('click', function() {
    alert('В реальном проекте здесь загружались бы дополнительные курсы с сервера.');
  });
});