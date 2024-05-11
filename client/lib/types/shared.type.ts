export interface Option {
  key: number;
  label: string;
}

export interface OptionString {
  key: string;
  label: string;
}

export interface APIErrorResponse {
  httpStatus: number;
  code: string;
  message: string;
}

export interface PagingReq {
  page: number;
  limit: number;
  order?: string;
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
