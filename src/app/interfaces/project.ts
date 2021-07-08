export interface CodeProject {
  Id?: number;
}

export interface Task {
  Id?: number;
  Name: string;
  Description: string;
  BudgetPrice?: number;
  Price?: number;
  Quantity?: number;
  Done?: number;
  Children?: Task[];
  EstimatedDuration?: number;
  Timeline?: number;
  End?: number;
  Unit: string;
}

export interface TaskForm {
  Id: string;
  Name: string;
  Description: string;
  BudgetPrice?: number;
  Price?: number;
  Quantity?: number;
  Done?: number;
  Children?: Task[];
  EstimatedDuration?: number;
  Timeline?: number;
  End?: number;
  Unit: string;
  GroupId: string;
  Color: string;
}

export interface TaskFormGroup {
  Id: string;
  Name: string;
  Description: string;
  Tasks: TaskForm[];
}
