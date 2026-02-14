document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form[id$="Form"]');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const inputs = form.querySelectorAll('input[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#d32f2f';
                    
                    setTimeout(() => {
                        input.style.borderColor = '';
                    }, 2000);
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                showError('Please fill in all required fields.');
            }
        });
        
        const inputs = form.querySelectorAll('input[type="text"], input[type="number"]');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                this.style.borderColor = '';
            });
        });
    });
    
    function showError(message) {
        const existingError = document.querySelector('.client-error');
        if (existingError) {
            existingError.remove();
        }
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message client-error';
        errorDiv.textContent = message;
        errorDiv.style.animation = 'shake 0.5s';
        
        const form = document.querySelector('form');
        if (form) {
            form.parentNode.insertBefore(errorDiv, form);
            
            setTimeout(() => {
                errorDiv.remove();
            }, 3000);
        }
    }
    
    const bitwiseForm = document.getElementById('bitwiseForm');
    if (bitwiseForm) {
        const answerInput = bitwiseForm.querySelector('#answer');
        if (answerInput) {
            answerInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    bitwiseForm.submit();
                }
            });
        }
    }
    
    const base64Form = document.getElementById('base64Form');
    if (base64Form) {
        const answerInput = base64Form.querySelector('#answer');
        if (answerInput) {
            answerInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    base64Form.submit();
                }
            });
        }
    }
});
