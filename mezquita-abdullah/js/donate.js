/* ============================================
   Donation Form Logic
   ============================================ */

let selectedAmount = 50;
let selectedFrequency = 'once';

document.addEventListener('DOMContentLoaded', () => {
    // Frequency toggle
    document.querySelectorAll('.toggle-btn[data-freq]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.toggle-btn[data-freq]').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedFrequency = btn.dataset.freq;
            updateTotal();
        });
    });

    // Amount selection
    document.querySelectorAll('.amount-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedAmount = parseInt(btn.dataset.amount);
            document.getElementById('customAmount').value = '';
            updateTotal();
        });
    });

    // Custom amount
    const customInput = document.getElementById('customAmount');
    if (customInput) {
        customInput.addEventListener('input', (e) => {
            const val = parseInt(e.target.value);
            if (val > 0) {
                document.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('active'));
                selectedAmount = val;
                updateTotal();
            }
        });
    }

    // Payment method
    document.querySelectorAll('.payment-method').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.payment-method').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Form submission
    const form = document.getElementById('donationForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const messages = {
                es: `✅ ¡JazakAllah khair! Procesando tu donación de $${selectedAmount} USD (${selectedFrequency === 'once' ? 'una vez' : selectedFrequency === 'monthly' ? 'mensual' : 'anual'}). Serás redirigido a la pasarela de pago segura.`,
                en: `✅ JazakAllah khair! Processing your $${selectedAmount} USD donation (${selectedFrequency}). You will be redirected to the secure payment gateway.`,
                ar: `✅ جزاك الله خيراً! جاري معالجة تبرعك بقيمة ${selectedAmount} دولار. سيتم تحويلك إلى بوابة الدفع الآمنة.`,
                fr: `✅ JazakAllah khair! Traitement de votre don de ${selectedAmount} USD. Vous serez redirigé vers la passerelle de paiement.`
            };
            alert(messages[currentLanguage] || messages.es);
        });
    }

    updateTotal();
});

function updateTotal() {
    const totalEl = document.getElementById('totalAmount');
    const noteEl = document.getElementById('frequencyNote');
    
    if (totalEl) {
        totalEl.textContent = `$${selectedAmount} USD`;
    }
    
    if (noteEl) {
        const notes = {
            es: { once: '🎯 Una sola vez', monthly: '🔄 Cada mes', yearly: '📅 Cada año' },
            en: { once: '🎯 One time', monthly: '🔄 Every month', yearly: '📅 Every year' },
            ar: { once: '🎯 مرة واحدة', monthly: '🔄 كل شهر', yearly: '📅 كل عام' },
            fr: { once: '🎯 Une fois', monthly: '🔄 Chaque mois', yearly: '📅 Chaque année' }
        };
        const lang = currentLanguage || 'es';
        noteEl.textContent = notes[lang][selectedFrequency];
    }
}
