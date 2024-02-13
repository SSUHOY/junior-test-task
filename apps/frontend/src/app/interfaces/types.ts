export interface IOption {
  value: string;
  label: string;
}

export interface IGetFilters {
  id: string;
  key: string;
  helperText: string;
  type?: string;
  select?: boolean;
  options?: IOption[];
}

export interface IResponseItem {
  data: [];
  error: string;
  isLoading: boolean;
}

export interface IFilterResponse {
  page: number;
  pageSize: number;
  results: IResponseItem[];
  total: number;
}
