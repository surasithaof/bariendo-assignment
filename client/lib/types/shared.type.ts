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

export interface Paging<TData> {
  page: number;
  limit: number;
  total: number;
  data: TData[];
}

export interface Audiable {
  createdAt: Date;
  updatedAt: Date;
}
