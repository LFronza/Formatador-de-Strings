import { BlocoRedirecionamentoDePorta } from './blocks/BlocoRedirecionamentoDePorta.js';
import { BlocoDMZ } from './blocks/BlocoDMZ.js';
import { BlocoCancelamento } from './blocks/BlocoCancelamento.js';
import { BlocoInformacoes } from './blocks/BlocoInformacoes.js';
import { BlocoRemocaoCGNAT } from './blocks/BlocoRemocaoCGNAT.js';
import { BlocoObservacoes } from './blocks/BlocoObservacoes.js';
import { BlocoChecklist } from './blocks/BlocoChecklist.js';
import { createInput } from './utils/createInput.js';
import { createCheckbox } from './utils/createCheckbox.js';
import { createSelect } from './utils/createSelect.js';

const Solicitacoes = {
    CANCELAMENTO: 'Cancelamento de Plano',
    INFORMACOES: 'Solicitação de Informações',
    REMOCAO_CGNAT: 'Remoção de CGNAT',
    REDIRECIONAMENTO_DE_PORTA: 'Redirecionamento de Porta',
    DMZ: 'Configuração de DMZ',
    OBSERVACOES: 'Observações',
    CHECKLIST: 'Checklist'
};

document.addEventListener('DOMContentLoaded', () => {
    const nomeInput = document.getElementById('nome');
    const detalhesAcaoDiv = document.getElementById('detalhesAcao');
    const resultadoDiv = document.getElementById('resultado');
    const toggleThemeButton = document.getElementById('toggle-theme');
    window.blocos = [];
    let clienteOuNome = '';
    let outroAtendenteCheckbox;
    let atendenteInput;


    const updateResultado = () => {
        const nome = nomeInput.value;
        const atendente = atendenteInput && atendenteInput.value ? atendenteInput.value : '';
        const outroAtendente = outroAtendenteCheckbox && outroAtendenteCheckbox.input && outroAtendenteCheckbox.input.checked ? `${atendente} está com ${nome} em loja:` : '';
        
        let resultado = '';
        window.blocos.forEach((bloco, index) => {
            const prefixo = index % 2 === 0 ? nome : 'Cliente';
            resultado += `${prefixo} também ${bloco.getOutput()}\n\n`;
        });

        if (outroAtendente) {
            resultadoDiv.textContent = `${outroAtendente}\n${resultado}`;
        } else {
            resultadoDiv.textContent = `${resultado}`;
        }
        updateTitle();
    };
    
    outroAtendenteCheckbox = createCheckbox('Com um atendente', () => {
        if (outroAtendenteCheckbox.input.checked) {
            atendenteInput = createInput('Nome do atendente', updateResultado);
            nomeInput.parentNode.insertBefore(atendenteInput, nomeInput.nextSibling);
        } else if (atendenteInput) {
            atendenteInput.remove();
            atendenteInput = null;
        }
        updateResultado();
    });
    const updateTitle = () => {
        const nome = nomeInput.value;
        const solicitacao = window.blocos.length > 1 ? '' : (window.blocos.length > 0 ? window.blocos[window.blocos.length - 1].getOutput().split(':')[0] : '');
        document.title = nome ? `${nome}` : 'Formatador de Strings';
    };

    const addBloco = (solicitacao) => {
        let bloco;
        if (solicitacao === 'REDIRECIONAMENTO_DE_PORTA') {
            bloco = new BlocoRedirecionamentoDePorta(updateResultado);
        } else if (solicitacao === 'DMZ') {
            bloco = new BlocoDMZ(updateResultado);
        } else if (solicitacao === 'CANCELAMENTO') {
            bloco = new BlocoCancelamento(updateResultado);
        } else if (solicitacao === 'INFORMACOES') {
            bloco = new BlocoInformacoes(updateResultado);
        } else if (solicitacao === 'REMOCAO_CGNAT') {
            bloco = new BlocoRemocaoCGNAT(updateResultado);
        } else if (solicitacao === 'OBSERVACOES') {
            bloco = new BlocoObservacoes(updateResultado);
        } else if (solicitacao === 'CHECKLIST') {
            bloco = new BlocoChecklist(updateResultado);
        }

        if (bloco) {
            const solicitacaoSelect = document.querySelector('.solicitacao-select');
            detalhesAcaoDiv.insertBefore(bloco.element, solicitacaoSelect);
            window.blocos.push(bloco);
            updateResultado();
        }
    };

    const addSolicitacaoSelect = () => {
        const solicitacaoSelect = createSelect(Object.values(Solicitacoes), (selectedValue) => {
            const solicitacaoKey = Object.keys(Solicitacoes).find(key => Solicitacoes[key] === selectedValue);
            if (solicitacaoKey) {
                addBloco(solicitacaoKey);
            }
        });
        solicitacaoSelect.className = 'solicitacao-select';
        detalhesAcaoDiv.appendChild(solicitacaoSelect);
    };

    nomeInput.addEventListener('input', () => {
        clienteOuNome = Math.random() < 0.5 ? nomeInput.value : 'Cliente';
        updateResultado();
    });
    nomeInput.addEventListener('input', updateTitle);

    // Alternar tema
    toggleThemeButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        document.body.classList.toggle('light-theme');
    });

    // Definir tema padrão com base no sistema
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.add('light-theme');
    }

    // Adicionar o primeiro seletor de solicitação
    addSolicitacaoSelect();
    // Adicionar a checkbox de outro atendente abaixo do nome
    nomeInput.parentNode.insertBefore(outroAtendenteCheckbox.container, nomeInput.nextSibling);
});