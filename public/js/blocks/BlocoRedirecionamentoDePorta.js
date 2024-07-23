import { Bloco } from './Bloco.js';
import { createInput } from '../utils/createInput.js';
import { createCheckbox } from '../utils/createCheckbox.js';

export class BlocoRedirecionamentoDePorta extends Bloco {
    constructor(updateResultado) {
        const portaInput = createInput('Porta', updateResultado);
        portaInput.type = 'number';
        portaInput.min = '0';
        portaInput.max = '65535';

        const ipInput = createInput('IP', updateResultado);
        ipInput.pattern = '^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$';
        ipInput.title = 'Digite um endereço IPv4 válido (ex: 192.168.0.1)';

        const { checkbox: sucessoCheckbox, label: sucessoLabel, container: sucessoContainer } = createCheckbox('Sucesso', updateResultado);
        const addPortaButton = document.createElement('button');
        addPortaButton.textContent = 'Adicionar Porta';
        addPortaButton.className = 'add-porta-button';

        const portasDiv = document.createElement('div');
        portasDiv.appendChild(portaInput);
        portasDiv.appendChild(ipInput);

        addPortaButton.addEventListener('click', () => {
            const novaPortaInput = createInput('Porta', updateResultado);
            novaPortaInput.type = 'number';
            novaPortaInput.min = '0';
            novaPortaInput.max = '65535';

            const novoIpInput = createInput('IP', updateResultado);
            novoIpInput.pattern = '^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$';
            novoIpInput.title = 'Digite um endereço IPv4 válido (ex: 192.168.0.1)';
            novoIpInput.value = ipInput.value; // Predefinir o IP

            portasDiv.appendChild(novaPortaInput);
            portasDiv.appendChild(novoIpInput);
        });

        super([portasDiv, sucessoContainer, addPortaButton], (inputs) => {
            const portas = [];
            for (let i = 0; i < portasDiv.children.length; i += 2) {
                portas.push(`\n     - IP ${portasDiv.children[i + 1].value} redirecionado para a porta ${portasDiv.children[i].value};`);
            }
            return `solicita redirecionamento de Porta: ${portas.join('')}\n     *${inputs[2].checked ? 'Redirecionamento feito com sucesso' : 'Porém não foi possível realizar o redirecionamento'}`;
        });
    }
}