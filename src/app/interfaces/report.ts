export interface Report {
}

export interface CodeReport {
  Id?: number;
  CreatedBy?: number | string;
  CreatedDate: Date;
  Type: number;
  Material: Material[];
  Tools?: Tool[];
}

export interface Material {
  Id?: number;
  Name: string;
  Description: string;
  Quantity: number;
  Unit: string;
  Status: number;
  CodeReportId?: number;
}

export interface Tool {
  Id?: number;
  Name: string;
  Description: string;
  Quantity: number;
  CodeReportId?: number;
}
