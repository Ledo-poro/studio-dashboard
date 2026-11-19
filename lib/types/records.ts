export interface Project {
  name: string;
  client: string;
  status: string;
  progress: number;
  budget: string;
  due: string;
  color?: string;
}

export interface Client {
  name: string;
  email: string;
  company: string;
  value: string;
  status: string;
}

export interface Revenue {
  source: string;
  client: string;
  amount: string;
  date: string;
}

export interface Spend {
  title: string;
  category: string;
  amount: string;
  date: string;
}
