const modal = document.getElementById('modalOverlay');
const openBtn = document.getElementById('openModal');
const closeBtn = document.getElementById('closeModal');
const payForm = document.querySelector('.modal form');


function openModal() {
    modal.style.display = 'flex';
  }
closeBtn.onclick = () => modal.style.display = 'none';

document.querySelectorAll(".footer-link").forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        document.getElementById(link.dataset.modal).style.display = "flex";
    });
});

document.querySelectorAll(".close-button").forEach(btn => {
    btn.addEventListener("click", () => {
        btn.closest(".overlay").style.display = "none";
    });
});


payForm.onsubmit = async (e) => {
    e.preventDefault();
    
    const nickname = payForm.querySelector('input[name="nickname"]').value;
    const itemType = document.getElementById('itemType').value; // Берем тип товара
    const payButton = payForm.querySelector('.modal-pay-button');
    
    payButton.innerText = "Создание платежа...";
    payButton.disabled = true;

    try {
        // Используем твой новый поддомен с HTTPS
        const response = await fetch('https://pay.apiarysmp.ru/create', {
            method: 'POST',
            mode: 'cors',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ 
                nickname: nickname,
                type: itemType 
            })
        });

        const result = await response.json();
        
        if (result.url) {
            // Перенаправляем на страницу оплаты ЮKassa
            window.location.href = result.url;
        } else {
            alert("Ошибка: " + (result.error || "Не удалось создать платеж"));
        }
    } catch (err) {
        console.error(err);
        alert("Ошибка соединения с сервером оплаты. Проверьте, запущен ли Python скрипт.");
    } finally {
        payButton.innerText = "Оплатить";
        payButton.disabled = false;
    }
};


