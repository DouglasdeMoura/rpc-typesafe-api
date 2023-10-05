import { describe, it } from 'vitest'
import assert from 'node:assert'
import { app } from './app.js'

const server = app()

describe('POST /rpc', () => {
  it('deve retornar erro 400 quando a procedure não estiver definida no corpo da requisição', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/rpc',
    })

    assert.equal(response.statusCode, 400)
    assert.deepEqual(response.json(), {
      title: 'Faltam parâmetros obrigatórios',
      details: 'O parâmetro "procedure" é obrigatório.',
    })
  })

  it('deve retornar erro 404 quando a procedure não for encontrada', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/rpc',
      payload: {
        procedure: 'inexistente',
      },
    })

    assert.equal(response.statusCode, 404)
    assert.deepEqual(response.json(), {
      title: 'Procedure não encontrada',
      details: 'A procedure inexistente não foi encontrada.',
    })
  })

  it('deve retornar erro 500 quando ocorrer um erro na procedure', async () => {

    const response = await server.inject({
      method: 'POST',
      url: '/rpc',
      payload: {
        procedure: 'error',
      },
    })

    assert.equal(response.statusCode, 500)
    assert.deepEqual(response.json(), {
      title: 'Erro',
      details: 'Ocorreu um erro.',
    })
  })

  it('deve retornar o resultado da procedure solicitada', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/rpc',
      payload: {
        procedure: 'getTarefas',
      },
    })

    assert.equal(response.statusCode, 200)
    assert.deepEqual(response.json(),
      [
        {
          id: 1,
          title: 'Tarefa 1'
        },
        {
          id: 2,
          title: 'Tarefa 2'
        },
        {
          id: 3,
          title: 'Tarefa 3'
        }
      ])
  })
})