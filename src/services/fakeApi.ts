export const generateCarePlan = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1,
        problem: 'Mobiliteit',
        goal: 'Zelfstandig lopen binnen 2 weken',
        interventions: [
          { id: 1, description: 'Dagelijkse begeleiding' },
          { id: 2, description: 'Fysiotherapie' },
        ],
        evaluation: 'Wekelijkse check',
      });
    }, 1500);
  });
};

export const generateFakeClients = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'Mevrouw Jansen', status: 'Concept', plan: null },
        { id: 2, name: 'Dhr. De Vries', status: 'Goedgekeurd', plan: null },
        { id: 3, name: 'Mevrouw Bakker', status: 'Concept', plan: null },
        { id: 4, name: 'Mevrouw Amber', status: 'Goedgekeurd', plan: null },
        { id: 5, name: 'Dhr. Dereli', status: 'Goedgekeurd', plan: null },
      ]);
    }, 500);
  });
};
