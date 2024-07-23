import { Bloco } from './Bloco.js';
import { createInput } from '../utils/createInput.js';

export class BlocoInformacoes extends Bloco {
    constructor(updateResultado) {
        const solicitacaoInput = createInput('Solicitação', updateResultado);
        const respostaInput = createInput('Resposta', updateResultado);
        super([solicitacaoInput, respostaInput], (inputs) => `Informações: Solicitação ${inputs[0].value}, Resposta ${inputs[1].value}`, updateResultado);
    }
}