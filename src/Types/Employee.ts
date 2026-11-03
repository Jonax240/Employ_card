export interface Employee {
  name: {
    title?: string;
    first: string;
    last: string;
  };
  email: string;
  picture: {
    medium: string;
  };
}