export interface Exercise {
  type: string;
  id: number;
  unit: UNITS;
}

export enum UNITS {
  'm',
  'sec',
  'rep'
}

export const EXERCISE_LIST: Array<Exercise> = [
  { type: 'Pull-up', id: 1, unit: UNITS.rep },
  { type: 'Walking', id: 2, unit: UNITS.m },
  { type: 'Sit up' , id: 3, unit: UNITS.rep }
]