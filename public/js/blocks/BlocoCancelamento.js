import { Bloco } from './Bloco.js';
import { createInput } from '../utils/createInput.js';
import { createCheckbox } from '../utils/createCheckbox.js';
import { createSelect } from '../utils/createSelect.js';

const Setores = {
    COMERCIAL: 'Setor Comercial',
    COBRANCA: 'Setor Cobrança',
    RETENCAO: 'Setor Retenção'
};

export class BlocoCancelamento extends Bloco {
    constructor(updateResultado) {
        const motivoInput = createInput('Motivo do Cancelamento', updateResultado);
        const retencaoInput = createInput('Ação para reter cliente', updateResultado);
        const { checkbox: transferidoCheckbox, label: transferidoLabel, container: transferidoContainer } = createCheckbox('Transferido para retenção', updateResultado);
        const { checkbox: resolvidoCheckbox, label: resolvidoLabel, container: resolvidoContainer } = createCheckbox('Resolvido no suporte', updateResultado);
        const setorSelect = createSelect(Object.keys(Setores), updateResultado, false);

        super([motivoInput, retencaoInput, resolvidoContainer, transferidoContainer, setorSelect], (inputs) => {
            const motivoTexto = inputs[0].value;
            const transferidoTexto = inputs[3].checked ? `Transferido para o setor ${Setores[inputs[4].value]}` : '';
            const resolvidoTexto = inputs[2].checked ? 'Cliente aceita proposta.\n':'Cliente recusa proposta.\n';
            return `solicita cancelamento de seu plano por ${motivoTexto}.\n ${inputs[1].value}, ${resolvidoTexto}${transferidoTexto}`;
        }, updateResultado);
    }
}