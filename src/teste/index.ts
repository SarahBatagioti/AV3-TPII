import { carregarDadosIniciais } from "../dados/dadosIniciais"
import CadastrarDependente from "../processos/cadastrarDependente"
import CadastrarTitular from "../processos/cadastrarTitular"
import ListarClientes from "../processos/listarClientes"
import AtualizarCliente from "../processos/atualizarCliente"
import RemoverCliente from "../processos/removerCliente"
import ListarDependentesDeTitular from "../processos/listarDependentesDeTitular"
import ListarTitularDeDependente from "../processos/listarTitularDeDependente"
import Menu from "../interfaces/menu"
import OpcaoMenu from "../menus/opcaoMenu"
import Entrada from "./entrada"

const ANSI_TEXTO = '\x1b[34m'
const ANSI_RESET = '\x1b[0m'

function validar(): void {
    if (!process.stdout.isTTY) {
        return
    }

    process.stdout.write(ANSI_TEXTO)
}

function validarReset(): void {
    if (!process.stdout.isTTY) {
        return
    }

    process.stdout.write(ANSI_RESET)
}

validar()

process.on('exit', validarReset)
process.on('SIGINT', () => {
    validarReset()
    process.exit(0)
})

carregarDadosIniciais()

const emCI = !!process.env.CI && process.env.CI.toLowerCase() !== 'false'
const entrada = new Entrada()

const opcoes: Map<number, Menu> = new Map([
    [1, new OpcaoMenu('Cadastrar cliente titular', new CadastrarTitular())],
    [2, new OpcaoMenu('Cadastrar cliente dependente', new CadastrarDependente())],
    [3, new OpcaoMenu('Listar todos os clientes', new ListarClientes())],
    [4, new OpcaoMenu('Atualizar cliente', new AtualizarCliente())],
    [5, new OpcaoMenu('Remover cliente', new RemoverCliente())],
    [6, new OpcaoMenu('Listar dependentes de um titular', new ListarDependentesDeTitular())],
    [7, new OpcaoMenu('Listar titular de um dependente', new ListarTitularDeDependente())]
])

function exibirCabecalho(): void {
    console.log('==========================================================')
    console.log('Atlantis - Simplifique sua gestão, mergulhe na eficiência')
    console.log('==========================================================')
}

function exibirMenu(): void {
    opcoes.forEach((menu, indice) => console.log(`${indice} - ${menu.titulo}`))
    console.log('0 - Sair')
}

function executarModoCI(): void {
    exibirCabecalho()
    console.log('Execução em CI detectada. Resumo inicial do sistema:')
    new ListarClientes().processar()
}

function executarModoInterativo(): void {
    exibirCabecalho()
    let executando = true

    while (executando) {
        console.log('')
        exibirMenu()
        const opcao = entrada.receberNumero('Escolha uma opção')

        if (opcao === 0) {
            executando = false
            console.log('Encerrando o Atlantis CLI.')
            continue
        }

        const menu = opcoes.get(opcao)
        if (!menu) {
            console.log('Opção inválida.')
            continue
        }

        menu.executar()
    }
}

if (emCI) {
    executarModoCI()
} else {
    executarModoInterativo()
}
