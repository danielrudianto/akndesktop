import { Client } from './client';
import { User } from './user';

export interface CodeProjectForm {
  Id?: number;
  Name: string;
  ClientId: number;
  CreatedBy?: number;
  CreatedDate?: Date;
  ConfirmedDate?: Date;
  ConfirmedBy?: number;
  Address: string;
  DocumentName: string;
  IsCompleted: boolean;
  CompletedDate?: Date;
  CompletedBy?: number;
  IsDelete: boolean;
  Tasks: TaskFormGroup[];
  Users: CodeProjectUser[];
}

export interface CodeProject {
  Id?: number;
  Name: string;
  CreatedBy?: number;
  CreatedDate?: Date;
  ConfirmedDate?: Date;
  ConfirmedBy?: string;
  Address: string;
  DocumentName: string;
  IsCompleted: boolean;
  CompletedDate?: Date;
  CompletedBy?: number;
  IsDelete: boolean;
  Project: TaskFormGroup[];
  CodeProjectUser: CodeProjectUser[];
  CodeProjectDocument: CodeProjectDocument[];
  Client: Client;
}

export interface CodeProjectDocument {
  Id?: number;
  Name: string;
  Url: string;
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

export interface CodeProjectUser {
  Id?: number;
  UserId: number;
  CodeProjectId?: number;
  User?: User;
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
