// script.js

document.addEventListener('DOMContentLoaded', () => {
  // ===== Открытие модального окна =====
  document.querySelectorAll('[data-modal-open]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-modal-open');
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = 'flex';
      }
    });
  });

  // ===== Закрытие модального окна по кнопке «×» =====
  document.querySelectorAll('[data-modal-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      const overlay = btn.closest('.modal-overlay');
      if (overlay) {
        overlay.style.display = 'none';
      }
    });
  });

  // ===== Закрытие при клике по фону вне .modal =====
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      // Если кликнули именно по темному фону, а не по содержимому .modal
      if (e.target === overlay) {
        overlay.style.display = 'none';
      }
    });
  });

  // ===== Подсветка активного пункта навигации =====
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
      document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
      this.classList.add('active');
      // При необходимости можно здесь перенаправлять: /* window.location.href = '...'; */
    });
  });

  // ===== Скрытие модалки после «отправки» формы =====
  document.querySelectorAll('.modal form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const overlay = form.closest('.modal-overlay');
      if (overlay) {
        overlay.style.display = 'none';
      }
      // Здесь можно добавить AJAX-/fetch-запрос на сервер, чтобы действительно сохранить данные
    });
  });
});

document.addEventListener('click', function (e) {
  document.querySelectorAll('.dropdown-menu').forEach(menu => {
    if (!menu.parentElement.contains(e.target)) {
      menu.style.display = 'none';
    }
  });

  if (e.target.classList.contains('dropdown-toggle')) {
    const menu = e.target.nextElementSibling;
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
  }
});

// ===== Открытие модального окна для редактирования =====
document.querySelector('.data-table').addEventListener('click', function(e) {
    if (e.target.classList.contains('dropdown-item') && e.target.textContent === 'Редактировать') {
        const row = e.target.closest('tr');
        if (row) {
            // Извлекаем данные из строки таблицы
            const cells = row.querySelectorAll('td');
            const farmCode = cells[0].textContent;
            const farmName = cells[1].textContent;
            const lastName = cells[2].textContent;
            const firstName = cells[3].textContent;
            const patronymic = cells[4].textContent;
            const passport = cells[5].textContent;
            const snils = cells[6].textContent;
            const location = cells[7].textContent;
            const address = cells[8].textContent;
            const phone = cells[9].textContent;
            const specialization = cells[10].textContent;
            const segment = cells[11].textContent;

            // Заполняем поля модального окна
            document.getElementById('editFarmCode').value = farmCode;
            document.getElementById('editFarmName').value = farmName;
            document.getElementById('editFarmLastName').value = lastName;
            document.getElementById('editFarmFirstName').value = firstName;
            document.getElementById('editFarmPatronymic').value = patronymic;
            document.getElementById('editPassport').value = passport;
            document.getElementById('editSnils').value = snils;
            document.getElementById('editLocation').value = location;
            document.getElementById('editAddress').value = address;
            document.getElementById('editPhone').value = phone;

            // Устанавливаем выбранные значения для выпадающих списков
            const specializationSelect = document.getElementById('editSpecializationSelect');
            for (let option of specializationSelect.options) {
                if (option.text === specialization) {
                    option.selected = true;
                    break;
                }
            }

            const segmentSelect = document.getElementById('editSegmentSelect');
            for (let option of segmentSelect.options) {
                if (option.text === segment) {
                    option.selected = true;
                    break;
                }
            }

            // Показываем модальное окно
            document.getElementById('modalEditFarm').style.display = 'flex';
        }
    }
});

// ===== Обработка отправки формы редактирования =====
document.querySelector('#modalEditFarm form').addEventListener('submit', function(e) {
    e.preventDefault();
    const farmCode = document.getElementById('editFarmCode').value;
    // Находим строку в таблице по коду КФХ
    const rows = document.querySelectorAll('.data-table tbody tr');
    for (let row of rows) {
        if (row.querySelector('td:first-child').textContent === farmCode) {
            // Обновляем ячейки таблицы новыми значениями
            row.querySelector('td:nth-child(2)').textContent = document.getElementById('editFarmName').value;
            row.querySelector('td:nth-child(3)').textContent = document.getElementById('editFarmLastName').value;
            row.querySelector('td:nth-child(4)').textContent = document.getElementById('editFarmFirstName').value;
            row.querySelector('td:nth-child(5)').textContent = document.getElementById('editFarmPatronymic').value;
            row.querySelector('td:nth-child(6)').textContent = document.getElementById('editPassport').value;
            row.querySelector('td:nth-child(7)').textContent = document.getElementById('editSnils').value;
            row.querySelector('td:nth-child(8)').textContent = document.getElementById('editLocation').value;
            row.querySelector('td:nth-child(9)').textContent = document.getElementById('editAddress').value;
            row.querySelector('td:nth-child(10)').textContent = document.getElementById('editPhone').value;
            row.querySelector('td:nth-child(11)').textContent = document.getElementById('editSpecializationSelect').selectedOptions[0].text;
            row.querySelector('td:nth-child(12)').textContent = document.getElementById('editSegmentSelect').selectedOptions[0].text;
            break;
        }
    }
    // Закрываем модальное окно
    document.getElementById('modalEditFarm').style.display = 'none';
});