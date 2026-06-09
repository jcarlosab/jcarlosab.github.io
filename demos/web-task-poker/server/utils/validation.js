export const FIBONACCI_NUMBERS = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89];

export const validateUsername = (username) => {
    if (!username || typeof username !== 'string') {
        return { valid: false, error: 'El nombre de usuario es obligatorio' };
    }

    const trimmed = username.trim();

    if (trimmed.length < 2) {
        return { valid: false, error: 'El nombre debe tener al menos 2 caracteres' };
    }

    if (trimmed.length > 20) {
        return { valid: false, error: 'El nombre no puede exceder 20 caracteres' };
    }

    return { valid: true, username: trimmed };
};

export const validateScore = (score) => {
    // ⭐ Permitir "?" como comodín
    if (score === '?') return true;

    // Validar números de Fibonacci
    return FIBONACCI_NUMBERS.includes(score);
};
