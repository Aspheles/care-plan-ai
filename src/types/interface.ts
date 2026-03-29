export interface Intervention {
  id: number;
  description: string;
}

export interface Plan {
  id: number;
  problem: string;
  goal: string;
  interventions: Intervention[];
  evaluation: string;
}

export interface Client {
  id: number;
  name: string;
  status: string;
  plan: Plan | null;
}

export interface FormData {
  name: string;
  plan: Plan;
}

export interface Error {
  state: boolean;
  text: string;
}

export interface FormLoginData {
  username: string;
  password: string;
}
