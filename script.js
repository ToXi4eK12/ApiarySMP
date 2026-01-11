const modal = document.getElementById('modalOverlay');
const openBtn = document.getElementById('openModal');
const closeBtn = document.getElementById('closeModal');
const payForm = document.querySelector('.modal form');

openBtn.onclick = () => modal.style.display = 'flex';
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
    const payButton = payForm.querySelector('.modal-pay-button');
    
    payButton.innerText = "Создание платежа...";
    payButton.disabled = true;

    try {
        const response = await fetch('http://77.34.6.100:25570/test-payment', {
            method: 'POST',
            mode: 'cors', // Добавляем режим CORS
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ nickname: nickname })
        });

        const result = await response.json();
        
        // ПРОВЕРКА: Если сервер прислал ссылку на оплату
        if (result.success && result.pay_url) {
            // Перенаправляем пользователя на страницу ЮMoney
            window.location.href = result.pay_url;
        } else if (result.success) {
            // Если оплата не требуется (например, тестовый режим)
            alert("Успешно! " + result.message);
            location.reload();
        } else {
            alert("Ошибка: " + (result.error || "Не удалось создать платеж"));
        }
    } catch (err) {
        console.error(err);
        alert("Ошибка соединения с API сервера");
    } finally {
        payButton.innerText = "Оплатить";
        payButton.disabled = false;
    }
};