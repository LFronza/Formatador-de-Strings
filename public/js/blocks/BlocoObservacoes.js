import { Bloco } from './Bloco.js';
import { createInput } from '../utils/createInput.js';

export class BlocoObservacoes extends Bloco {
    constructor(updateResultado) {
        const observacaoInput = createInput('Observações', updateResultado);
        super([observacaoInput], (inputs) => `\n${inputs[0].value}`, updateResultado);
    }
}
