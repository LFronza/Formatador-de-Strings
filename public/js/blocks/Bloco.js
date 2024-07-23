export class Bloco {
    constructor(inputs, outputFunc, updateResultado) {
        this.inputs = inputs;
        this.outputFunc = outputFunc;
        this.updateResultado = updateResultado;
        this.element = this.createElement();
    }

    createElement() {
        const blocoDiv = document.createElement('div');
        blocoDiv.className = 'bloco';

        this.inputs.forEach(input => blocoDiv.appendChild(input));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.className = 'delete-button';
        deleteButton.addEventListener('click', () => {
            this.removeBloco(blocoDiv);
        });

        blocoDiv.appendChild(deleteButton);
        return blocoDiv;
    }

    removeBloco(blocoDiv) {
        if (typeof window.blocos !== 'undefined') {
            window.blocos = window.blocos.filter(bloco => bloco !== this);
        }
        blocoDiv.remove();
        if (typeof this.updateResultado === 'function') {
            this.updateResultado();
        }
    }

    getOutput() {
        return this.outputFunc(this.inputs);
    }
}