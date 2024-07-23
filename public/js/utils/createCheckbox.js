export const createCheckbox = (labelText, onChange) => {
    const container = document.createElement('div');
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.addEventListener('change', onChange);
    const label = document.createElement('label');
    label.textContent = labelText;
    container.appendChild(input);
    container.appendChild(label);
    return { container, input };
};