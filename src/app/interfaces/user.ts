export interface User {
  Id?: number;
  FirstName: string;
  LastName: string;
  Email: string;
  IsActive: boolean;
  Password: string;
  ImageUrl: string;
  ThumbnailUrl: string;
  UserContact?: UserContact[];
  UserPosition?: UserPosition[];
}

export interface UserContact {
  Id?: number;
  PhoneNumber: string;
  WhatsappAvailable: boolean;
  UserId?: number;
}

export interface UserPosition {
  Id?: number;
  Position: number;
  EffectiveDate: Date;
  CreatedDate: Date;
  CreatedBy: number | string;
  UserId?: number;
}
