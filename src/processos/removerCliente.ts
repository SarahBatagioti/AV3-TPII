import Processo from "./processo"

export default class RemoverCliente extends Processo {
    public processar(): void {
        console.log('\nRemoção de cliente')
        const id = this.entrada.receberNumero('Informe o ID do cliente a ser removido')
        const cliente = this.armazem.buscarClientePorId(id)
        if (!cliente) {
            console.log('Cliente não encontrado.')
            return
        }

        if (!cliente.ehDependente && cliente.dependentes.length > 0) {
            console.log('Não é possível remover um titular com dependentes vinculados. Remova os dependentes antes.')
            return
        }

        const removido = this.armazem.removerCliente(id)
        console.log(removido ? 'Cliente removido com sucesso.' : 'Não foi possível remover o cliente.')
    }
}
