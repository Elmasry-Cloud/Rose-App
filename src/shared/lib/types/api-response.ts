interface ISuccessResponse<T> {
  status: true;
  code: number;
  message?: string;
  payload?: T;
}

interface IErrorResponse {
  status: false;
  code: number;
  message: string;
  errors?: [];
}

export type IApiResponse<T> = ISuccessResponse<T> | IErrorResponse;
