import { DataResponse } from './data-response';

export type PaginatedDataResponse<T> = DataResponse<T[]> & {
  meta: {
    total: number;
    page: number;
    limit: number;
  };
};
