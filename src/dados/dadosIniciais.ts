import Armazem from "../armazenamento/armazem"
import { TipoDocumento } from "../enumeracoes/tipoDocumento"
import Cliente from "../modelos/cliente"
import Documento from "../modelos/documento"
import Endereco from "../modelos/endereco"
import Telefone from "../modelos/telefone"

export function carregarDadosIniciais(): void {
    const armazem = Armazem.obterInstancia()
    if (armazem.obterClientes().length > 0) {
        return
    }

    const enderecoTitular = new Endereco(
        'Av. Jupira',
        'Paraíso Castanheiras',
        'São José dos Campos',
        'São Paulo',
        'Brasil',
        '12345-000'
    )

    const titular = new Cliente(
        armazem.gerarId(),
        'Valdirene Montuani',
        'Val',
        new Date(1982, 6, 13, 12),
        enderecoTitular
    )
    titular.dataCadastro = new Date(2026, 2, 19, 12)
    titular.adicionarDocumento(new Documento('12345678901', TipoDocumento.CPF, new Date(2020, 11, 10, 12)))
    titular.adicionarTelefone(new Telefone('12', '98179-0173'))

    const dependente = new Cliente(
        armazem.gerarId(),
        'Sarah Montuani',
        'Sarão',
        new Date(2006, 2, 29, 12),
        titular.endereco.clonar() as Endereco
    )
    dependente.dataCadastro = new Date(2026, 2, 19, 12)
    dependente.adicionarDocumento(new Documento('98765432100', TipoDocumento.RG, new Date(2021, 5, 1, 12)))
    titular.telefones.forEach(telefone => dependente.adicionarTelefone(telefone.clonar() as Telefone))
    titular.adicionarDependente(dependente)

    armazem.cadastrarCliente(titular)
    armazem.cadastrarCliente(dependente)
}
