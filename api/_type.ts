export interface Pagination {
  meta: {
    page: number;
    pageSize: number;
    pageCount: number;
    totalCount: number;
  },
  items: unknown[];
}