export interface Intervention {
  id: string;
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
  // problem: string;
  // goal: string;
  // intervention: Intervention[];
  // evalation: string;
  plan: Plan;
}
