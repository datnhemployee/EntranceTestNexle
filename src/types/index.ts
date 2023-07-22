export type FetchStatus = 'success' | 'error' | 'loading' | 'new';
export type ListState<I> = {
  data: I[];
  status: FetchStatus;
  message: string;
};
