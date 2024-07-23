export const createSelect = (options, onSelect, showSearch = true) => {
    const container = document.createElement('div');
    container.className = 'select-container';

    const input = document.createElement('input');
    input.type = 'search';
    input.placeholder = 'Digite para filtrar...';
    input.className = 'select-filter';
    input.style.display = showSearch ? '' : 'none';

    const select = document.createElement('select');
    select.className = 'select-dropdown';
    select.innerHTML = `<option value="">Escolha</option>` + options.map(option => `<option value="${option}">${option}</option>`).join('');

    input.addEventListener('input', () => {
        const filter = input.value.toLowerCase();
        Array.from(select.options).forEach(option => {
            const text = option.text.toLowerCase();
            option.style.display = text.includes(filter) ? '' : 'none';
        });
    });

    select.addEventListener('change', () => {
        const selectedValue = select.value;
        if (selectedValue) {
            onSelect(selectedValue);
            select.value = ''; // Reset the select value
        }
    });

    container.appendChild(input);
    container.appendChild(select);

    return container;
};