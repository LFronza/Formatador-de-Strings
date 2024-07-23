export const createInput = (placeholder, updateResultado) => {
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = placeholder;
    input.addEventListener('input', updateResultado);
    return input;
};