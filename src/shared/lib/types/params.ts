export interface GetApiParams {
  page: number;
  limit: number;
  categoryId: string;
  subCategoryId: string;
  occasionId: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  sortBy: 'bestSelling' | 'mostPopular';
  sortOrder: 'asc' | 'desc';
  search: string;
}

export interface GetDataPayload<T> {
  data: T;
  metadata: {
    page: string;
    limit: string;
    total: string;
    totalPages: string;
  };
}
