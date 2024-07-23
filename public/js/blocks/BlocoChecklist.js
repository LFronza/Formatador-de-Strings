import { Bloco } from './Bloco.js';
import { createInput } from '../utils/createInput.js';
import { createCheckbox } from '../utils/createCheckbox.js';
import { createSelect } from '../utils/createSelect.js';

const Topologias = {
    FIBRA: 'FTTH/A/X',
    FTTB: 'FTTB',
    RADIO: 'Rádio'
};

const Problemas = {
    SEM_SINAL: 'Sem Sinal',
    SEM_SINAL_WIFI: 'Sem Sinal - Wifi',
    LENTIDAO: 'Lentidão',
    QUEDAS: 'Quedas'
};

export class BlocoChecklist extends Bloco {
    constructor(updateResultado) {
        const topologiaSelect = createSelect(Object.values(Topologias), updateResultado);
        const problemaSelect = createSelect(Object.values(Problemas), updateResultado);

        const checklistDiv = document.createElement('div');
        checklistDiv.className = 'checklist-div';

        problemaSelect.querySelector('select').addEventListener('change', () => {
            checklistDiv.innerHTML = '';
            const problema = problemaSelect.querySelector('select').value;
            if (problema === Problemas.SEM_SINAL) {
                this.addSemSinalChecklist(checklistDiv, topologiaSelect.querySelector('select').value, updateResultado);
            } else if (problema === Problemas.SEM_SINAL_WIFI) {
                this.addSemSinalWifiChecklist(checklistDiv, topologiaSelect.querySelector('select').value, updateResultado);
            } else if (problema === Problemas.LENTIDAO) {
                this.addLentidaoChecklist(checklistDiv, topologiaSelect.querySelector('select').value, updateResultado);
            } else if (problema === Problemas.QUEDAS) {
                this.addQuedasChecklist(checklistDiv, topologiaSelect.querySelector('select').value, updateResultado);
            }
        });

        super([topologiaSelect, problemaSelect, checklistDiv], (inputs) => {
            const topologia = inputs[0].querySelector('select').value;
            const problema = inputs[1].querySelector('select').value;
            const checklist = checklistDiv.querySelectorAll('input, select, textarea');
            const checklistValues = Array.from(checklist).map(input => `${input.name}: ${input.value || input.checked}`);
            return `Topologia: ${topologia}\nProblema: ${problema}\nChecklist:\n${checklistValues.join('\n')}`;
        }, updateResultado);
    }

    addSemSinalChecklist(container, topologia, updateResultado) {
        const loginOfflineCheckbox = createCheckbox('Login está Offline', updateResultado);
        const ledsInput = createInput('LEDs acesas no roteador', updateResultado);
        const statusInput = createInput('Status no sistema de ativação', updateResultado);
        container.appendChild(loginOfflineCheckbox.container);
        container.appendChild(ledsInput);
        container.appendChild(statusInput);
        // Adicione mais campos conforme necessário
    }

    addSemSinalWifiChecklist(container, topologia, updateResultado) {
        const wifiHabilitadoCheckbox = createCheckbox('Wi-Fi está habilitado', updateResultado);
        const nomeRedeInput = createInput('Nome da rede Wi-Fi', updateResultado);
        const dispositivoInput = createInput('Dispositivo com problema', updateResultado);
        container.appendChild(wifiHabilitadoCheckbox.container);
        container.appendChild(nomeRedeInput);
        container.appendChild(dispositivoInput);
        // Adicione mais campos conforme necessário
    }

    addLentidaoChecklist(container, topologia, updateResultado) {
        const aplicativoInput = createInput('Aplicativo/Serviço/Site com lentidão', updateResultado);
        const dispositivosInput = createInput('Dispositivos com lentidão', updateResultado);
        const tipoConexaoSelect = createSelect(['Cabo', 'Wi-Fi'], updateResultado);
        container.appendChild(aplicativoInput);
        container.appendChild(dispositivosInput);
        container.appendChild(tipoConexaoSelect);
        // Adicione mais campos conforme necessário
    }

    addQuedasChecklist(container, topologia, updateResultado) {
        const tempoConexaoInput = createInput('Tempo de conexão do roteador', updateResultado);
        const extratoConexaoInput = createInput('Extrato de conexão', updateResultado);
        const pingTestInput = createInput('Teste de ping', updateResultado);
        container.appendChild(tempoConexaoInput);
        container.appendChild(extratoConexaoInput);
        container.appendChild(pingTestInput);
        // Adicione mais campos conforme necessário
    }
}