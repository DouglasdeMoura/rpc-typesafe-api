import type { API } from '../../fastify-rpc-ts/src/procedures'

const query = <Procedure extends keyof API>(
  procedure: Procedure,
  ...args: Parameters<API[Procedure]>
): Promise<ReturnType<API[Procedure]>> => {
  return fetch('http://localhost:3000/rpc', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ procedure, args: args[0] }),
  }).then((response) => response.json()) as any
}

query('updateTarefa', { title: 'Tarefa 1', id: 1 }).then(console.log)