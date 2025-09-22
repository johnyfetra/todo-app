// Centralized models for Todo domain
export interface Todo {
  id: number;
  title: string;
  description?: string;
  done: boolean;
}

export interface TodoCreate {
  title: string;
  description?: string;
  done?: boolean;
}

// View model used by UI components
export interface TodoVM {
  id: number;
  title: string;
  description?: string;
  done: boolean;
}


// Filter type used across components/pages
export type TodoFilter = 'all' | 'active' | 'done';


