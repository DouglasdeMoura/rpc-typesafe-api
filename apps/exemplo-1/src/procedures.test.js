import { describe, it } from 'node:test'
import assert from 'node:assert';
import { tarefas, getTarefas, getTarefa, addTarefa, updateTarefa, deleteTarefa } from './procedures.js'

describe('getTarefas', () => {
  it('deve retornar todas as tarefas', () => {
    const result = getTarefas()

    assert.strictEqual(result.status, 200)
    assert.deepStrictEqual(result.data, tarefas)
  })
})

describe('getTarefa', () => {
  it('deve lançar um erro se o id não for fornecido', () => {
    assert.throws(() => {
      getTarefa()
    }, Error('O id é obrigatório'))
  })

  it('deve lançar um erro se a tarefa não for encontrada', () => {
    assert.throws(() => {
      getTarefa(4)
    }, Error('Tarefa 4 não encontrada'))
  })

  it('deve retornar a tarefa com o id fornecido', () => {
    const result = getTarefa(2)

    assert.strictEqual(result.status, 200)
    assert.deepStrictEqual(result.data, tarefas[1])
  })
})

describe('addTarefa', () => {
  it('deve lançar um erro se o título não for fornecido', () => {
    assert.throws(() => {
      addTarefa()
    }, Error('O título é obrigatório'))
  })

  it('deve adicionar uma nova tarefa', () => {
    const result = addTarefa('Tarefa 4')

    assert.strictEqual(result.status, 201)
    assert.strictEqual(result.data.id, 4)
    assert.strictEqual(tarefas.length, 4)
    assert.strictEqual(tarefas[3].title, 'Tarefa 4')
  })
})

describe('updateTarefa', () => {
  it('deve lançar um erro se o id ou o título não forem fornecidos', () => {
    assert.throws(() => {
      updateTarefa()
    }, Error('O id e o título são obrigatórios'))
  })

  it('deve lançar um erro se a tarefa não for encontrada', () => {
    assert.throws(() => {
      updateTarefa({ id: 10, title: 'Tarefa 10' })
    }, Error('Tarefa 10 não encontrada'))
  })

  it('deve atualizar a tarefa com o id fornecido', () => {
    const result = updateTarefa({ id: 2, title: 'Nova Tarefa' })

    assert.strictEqual(result.status, 200)
    assert.strictEqual(tarefas[1].title, 'Nova Tarefa')
  })

  describe('deleteTarefa', () => {
    it('deve lançar um erro se o id não for fornecido', () => {
      assert.throws(() => {
        deleteTarefa()
      }, Error('O id é obrigatório'))
    })

    it('deve lançar um erro se a tarefa não for encontrada', () => {
      assert.throws(() => {
        deleteTarefa(10)
      }, Error('Tarefa 10 não encontrada'))
    })

    it('deve excluir a tarefa com o id fornecido', () => {
      const result = deleteTarefa(2)

      assert.strictEqual(result.status, 204)
    })
  })
})
