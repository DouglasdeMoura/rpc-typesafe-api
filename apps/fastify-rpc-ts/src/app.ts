import Fastify from 'fastify'
import * as procedures from './procedures'
import { ProcedureError } from './errors'

export const app = () => {
  const fastify = Fastify()

  fastify.post<{
    Body: {
      procedure: string
      args?: any
    }
  }>('/rpc', async (req, res) => {
    if (!req.body?.procedure) {
      res.status(400).send({
        title: 'Faltam parâmetros obrigatórios',
        details: 'O parâmetro "procedure" é obrigatório.'
      })
    }

    const procedure = procedures?.[req.body?.procedure as keyof typeof procedures]

    if (!procedure || typeof procedure !== 'function') {
      return res.status(404).send({
        title: 'Procedure não encontrada',
        details: `A procedure ${req.body.procedure} não foi encontrada.`
      })
    }

    try {
      const response = procedure(req.body.args)
      return res.status(response?.status || 200).send(response?.data)
    } catch (error) {
      const { code, title, message } = error as ProcedureError

      return res.status(code|| 500).send({
        title: title || 'Erro',
        details: message || 'Ocorreu um erro.'
      })
    }
  })

  return fastify
}