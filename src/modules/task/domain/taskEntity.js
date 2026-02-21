export class TaskEntity {
  constructor({ ID, TITULO, DESCRIPCION, ESTADO }) {
    this.ID = ID;
    this.TITULO = TITULO || null;
    this.DESCRIPCION = DESCRIPCION || null;
    this.ESTADO = ESTADO ?? "pendiente";
  }
}
