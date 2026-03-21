export interface ISearch {
  transactionId: string;
  amount: number;
  status?: string;
  message: string;
}
export interface ISearchProps{
  search: ISearch
}