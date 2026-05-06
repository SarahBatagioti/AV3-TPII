import Cliente from "../modelos/cliente"

export default class Armazem {
    private static instancia: Armazem
    private clientes: Cliente[] = []
    private ultimoId = 0

    private constructor() { }

    public static obterInstancia(): Armazem {
        if (!Armazem.instancia) {
            Armazem.instancia = new Armazem()
        }

        return Armazem.instancia
    }

    public gerarId(): number {
        this.ultimoId += 1
        return this.ultimoId
    }

    public cadastrarCliente(cliente: Cliente): void {
        this.clientes.push(cliente)
    }

    public obterClientes(): Cliente[] {
        return this.clientes
    }

    public buscarClientePorId(id: number): Cliente | undefined {
        return this.clientes.find(cliente => cliente.id === id)
    }

    public buscarClientesTitulares(): Cliente[] {
        return this.clientes.filter(cliente => !cliente.ehDependente)
    }

    public buscarClientesDependentes(): Cliente[] {
        return this.clientes.filter(cliente => cliente.ehDependente)
    }

    public removerCliente(id: number): boolean {
        const cliente = this.buscarClientePorId(id)
        if (!cliente) {
            return false
        }

        if (cliente.titular) {
            cliente.titular.removerDependente(cliente.id)
        }

        cliente.dependentes.forEach(dependente => {
            dependente.titular = undefined
        })

        this.clientes = this.clientes.filter(atual => atual.id !== id)
        return true
    }
}
