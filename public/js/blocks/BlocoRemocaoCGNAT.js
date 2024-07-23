import { Bloco } from './Bloco.js';
import { createInput } from '../utils/createInput.js';

export class BlocoRemocaoCGNAT extends Bloco {
    constructor(updateResultado) {
        const motivoInput = createInput('Motivo', updateResultado);
        super([motivoInput], (inputs) => `solicita remoção do seu IP do bloco CGNAT:\nMotivo:\n     - ${inputs[0].value}.`, updateResultado);
    }
}