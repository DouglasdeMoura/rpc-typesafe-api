import { ProcedureError } from "./errors";

type Tarefa = {
  id: number
  title: string
}

export let tarefas: Tarefa[] = [
  {
    id: 1,
    title: "Tarefa 1",
  },
  {
    id: 2,
    title: "Tarefa 2",
  },
  {
    id: 3,
    title: "Tarefa 3",
  },
];

type Procedure<TData = unknown, TArgs = undefined> = (args?: TArgs) => {
  status: number
  data?: TData
}

export const getTarefas: Procedure<Tarefa[]> = () => {
  return {
    status: 200,
    data: tarefas,
  };
};

export const getTarefa: Procedure<Tarefa, Tarefa['id']> = (id) => {
  if (!id) {
    throw new ProcedureError(
      "O id é obrigatório",
      400,
      "Faltam parâmetros obrigatórios"
    );
  }

  const tarefa = tarefas.find((todo) => todo.id === id);

  if (!tarefa) {
    throw new ProcedureError(`Tarefa ${id} não encontrada`, 404);
  }

  return {
    status: 200,
    data: tarefa,
  };
};

export const addTarefa: Procedure<{ id: Tarefa['id'] }, Tarefa['title']> = (title) => {
  if (!title) {
    throw new ProcedureError(
      "O título é obrigatório",
      400,
      "Faltam parâmetros obrigatórios"
    );
  }

  const id = tarefas.length + 1;
  const tarefa = {
    id,
    title,
  };

  tarefas.push(tarefa);

  return {
    status: 201,
    data: { id },
  };
};

export const updateTarefa: Procedure<undefined, Tarefa> = (args) => {
  if (!args?.id || !args?.title) {
    throw new ProcedureError(
      "O id e o título são obrigatórios",
      400,
      "Faltam parâmetros obrigatórios"
    );
  }

  const index = tarefas.findIndex((todo) => todo.id === args.id);

  if (index === -1) {
    throw new ProcedureError(`Tarefa ${args.id} não encontrada`, 404);
  }

  tarefas[index].title = args.title;

  return {
    status: 200,
  };
};

export const deleteTarefa: Procedure<undefined, Tarefa['id']> = (id) => {
  if (!id) {
    throw new ProcedureError(
      "O id é obrigatório",
      400,
      "Faltam parâmetros obrigatórios"
    );
  }

  const index = tarefas.findIndex((todo) => todo.id === id);

  if (index === -1) {
    throw new ProcedureError(`Tarefa ${id} não encontrada`, 404);
  }

  tarefas = tarefas.filter((todo) => todo.id !== id);

  return {
    status: 204,
  };
};

export const error = () => {
  throw new ProcedureError("Ocorreu um erro.", 500);
};
