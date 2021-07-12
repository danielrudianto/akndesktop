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

export interface WeatherReportForm {
  WeatherId: number;
  CodeProjectId: number;
  CreatedBy: string;
}

export interface WorkerReportForm {
  Id?: number;
  CreatedDate?: Date;
  Date?: Date;
  CreatedBy: string;
  CodeProjectId: number;
  Workers: Worker[];
}

export interface Worker {
  Id?: number;
  Name: string;
  Quantity: number;
  CodeReportId?: number;
}

export interface ToolReportForm {
  Id?: number;
  CreatedDate?: Date;
  Date?: Date;
  CreatedBy: string;
  CodeProjectId: number;
  Tools: Tool[];
}

export interface MaterialReportForm {
  Id?: number;
  CreatedDate?: Date;
  Date?: Date;
  CreatedBy: string;
  CodeProjectId: number;
  Materials: Material[];
}

