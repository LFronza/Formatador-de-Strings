import { Bloco } from './Bloco.js';
import { createInput } from '../utils/createInput.js';
import { createCheckbox } from '../utils/createCheckbox.js';

export class BlocoDMZ extends Bloco {
    constructor(updateResultado) {
        const ipInput = createInput('IP', updateResultado);
        const sucessoCheckbox = createCheckbox('DMZ configurado com sucesso', updateResultado);
        super([ipInput, sucessoCheckbox.container], (inputs) => {
            const checkboxInput = inputs[1].querySelector('input');
            return `solicita DMZ de suas portas para IP ${inputs[0].value}, ${checkboxInput.checked ? 'DMZ configurado com sucesso' : 'Porém não foi possível realizar a configuração'}.\n`;
        });
    }
}