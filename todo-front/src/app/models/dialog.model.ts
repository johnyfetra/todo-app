import { Todo } from "./todo.model";

export interface SimpleConfirmDialogData {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}

export interface TodoDialogBase {
  dialogTitle :string,
  buttonType: string
}

export interface TodoDialogCreate extends TodoDialogBase {}

export interface TodoDialogEdit extends TodoDialogBase {
  todo: Todo
}

export type TodoDialog = TodoDialogCreate | TodoDialogEdit;
