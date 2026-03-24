export type Intervention = {
  id: string;
  description: string;
};

export type Plan = {
  id: number;
  problem: string;
  goal: string;
  interventions: Intervention[];
  evaluation: string;
};

export type Client = {
  id: number;
  name: string;
  status: string;
  plan: Plan | null;
};
