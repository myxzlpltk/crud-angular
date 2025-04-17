type Paging<T> = {
  data: T[];
  total: number;
  skip: number;
  limit: number;
};

export default Paging;
