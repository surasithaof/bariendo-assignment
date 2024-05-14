export interface Option {
  key: number;
  label: string;
}

export interface OptionString {
  key: string;
  label: string;
}

export interface APIErrorResponse {
  statusCode: number;
  message: string;
}

export interface Audiable {
  createdAt: Date;
  updatedAt: Date;
}
