import Fastify from 'fastify'
import * as procedures from './procedures.js'

export const app = () => {
  const fastify = Fastify()

  fastify.post('/rpc', async (req, res) => {
    if (!req.body?.procedure) {
      res.status(400).send({
        title: 'Faltam parâmetros obrigatórios',
        details: 'O parâmetro "procedure" é obrigatório.'
      })
    }

    const procedure = procedures[req.body.procedure]

    if (!procedure || typeof procedure !== 'function') {
      return res.status(404).send({
        title: 'Procedure não encontrada',
        details: `A procedure ${req.body.procedure} não foi encontrada.`
      })
    }

    try {
      const response = procedure?.(req.body.args)
      return res.status(response?.status || 200).send(response?.data)
    } catch (error) {
      return res.status(error?.status || 500).send({
        title: error?.title || 'Erro',
        details: error?.message || 'Ocorreu um erro.'
      })
    }
  })

  return fastify
}