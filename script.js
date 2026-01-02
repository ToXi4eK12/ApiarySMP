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
    e.preventDefault(); // Чтобы страница не перезагружалась
    
    const nickname = payForm.querySelector('input[name="nickname"]').value;
    const payButton = payForm.querySelector('.modal-pay-button');
    
    payButton.innerText = "Загрузка...";
    payButton.disabled = true;

    try {
        // Замени 1.2.3.4 на реальный IP твоего сервера
        const response = await fetch('http://77.34.6.100:25570/test-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nickname: nickname })
        });

        const result = await response.json();
        
        if (result.pay_url) {
            // Магия: перенаправляем на ЮKassa
            window.location.href = result.pay_url;
        }
    } catch (err) {
        console.error(err);
        alert("Сервер оплаты недоступен. Проверь IP и CORS.");
    } finally {
        payButton.innerText = "Оплатить";
        payButton.disabled = false;
    }
};