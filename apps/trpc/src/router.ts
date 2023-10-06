import { initTRPC } from '@trpc/server'
import { z } from 'zod'

type Tarefa = {
  id: number
  title: string
}

export let tarefas: Tarefa[] = [
  {
    id: 1,
    title: 'Tarefa 1',
  },
  {
    id: 2,
    title: 'Tarefa 2',
  },
  {
    id: 3,
    title: 'Tarefa 3',
  },
]

export const t = initTRPC.create()
export const appRouter = t.router({
  getTarefas: t.procedure.query(() => tarefas),
  getTarefa: t.procedure.input(z.number()).query(({ input: id }) => {
    const tarefa = tarefas.find((todo) => todo.id === id)

    if (!tarefa) {
      throw new Error('Tarefa não encontrada')
    }

    return tarefa
  }),
  addTarefa: t.procedure.input(z.string()).mutation(({ input: title }) => {
    const id = tarefas.length + 1

    tarefas.push({ id, title })

    return id
  }),
  updateTarefa: t.procedure
    .input(z.object({ id: z.number(), title: z.string() }))
    .mutation(({ input: { id, title } }) => {
      const tarefa = tarefas.find((todo) => todo.id === id)

      if (!tarefa) {
        throw new Error('Tarefa não encontrada')
      }

      tarefa.title = title

      return id
    }),
  deleteTarefa: t.procedure.input(z.number()).mutation(({ input: id }) => {
    const tarefa = tarefas.find((todo) => todo.id === id)

    if (!tarefa) {
      throw new Error('Tarefa não encontrada')
    }

    tarefas = tarefas.filter((todo) => todo.id !== id)

    return id
  }),
})

// Exporta a definição de tipos do router
export type AppRouter = typeof appRouter
