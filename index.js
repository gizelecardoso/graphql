const {ApolloServer, gql} = require('apollo-server')

const usuarios = [
  {
    id: 1,
    nome: 'João Silva',
    email: 'jsilva@zemail.com',
    idade

  }
]

const typeDefs = gql`
  # Pontos de entrada da sua API!  
  scalar Date


  type Produto {
    nome: String!
    preco: Float!
    desconto: Float
    precoComDesconto: Float
  }

  type Usuario {
    id: ID
    nome: String!
    email: String!
    idade: Int
    salario: Float
    vip: Boolean
  }

  type Query {
    ola: String!
    horaAtual: Date!
    usuarioLogado: Usuario
    produtoEmDestaque: Produto
    numerosMegaSena: [Int!]!
  }
`

const resolvers = {
  Usuario: {
    salario(usuario){
      return usuario.salario_real
    }
  },
  Produto: {
    precoComDesconto(produto){
      if(produto.desconto){
        return produto.preco * (1 - produto.desconto)
      } else {
        return produto.preco
      }
    }
  },
  Query: {
    ola(){
      return 'Bom dia!'
    },
    horaAtual(){
      //return `${new Date}`
      return new Date
    },
    usuarioLogado(){
      return {
        id: 1,
        nome: 'Ana da Web',
        email: 'anadaweb@email.com',
        idade: 23,
        salario_real: 1234.56,
        vip: true
      }
    },
    produtoEmDestaque(){
      return {
        nome: 'Camiseta',
        preco: 25,
        desconto: 0.5
      }
    },
    numerosMegaSena(){
      // return [4,8,13,27,33,54]
      const crescente = (a, b) => a - b
      return Array(6).fill(0)
            .map(n => parseInt(Math.random() * 60 + 1))
            .sort(crescente)
    }
  }
}

const server = new ApolloServer({
  typeDefs, 
  resolvers
})

server.listen().then(({url}) => {
  console.log(`Executando em ${url}`)
})