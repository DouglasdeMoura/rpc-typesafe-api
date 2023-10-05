export class ProcedureError extends Error {
  code: number
  title: string | undefined

  constructor(message: string, code: number, title?: string) {
    super(message)
    this.title = title
    this.code = code
  }
}