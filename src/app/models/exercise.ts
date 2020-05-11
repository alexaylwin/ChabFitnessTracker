export interface Exercise {
  type: string;
  id: number;
  unit: UNITS;
}

export enum UNITS {
  'min',
  'sec',
  'rep',
  'km'
}

export const EXERCISE_LIST: Array<Exercise> = [
  { type: 'Pull-up', id: 1, unit: UNITS.rep },
  { type: 'Walking', id: 2, unit: UNITS.km },
  { type: 'Sit-up' , id: 3, unit: UNITS.rep },
  { type: 'Push-up', id: 4, unit: UNITS.rep },
  { type: 'Squat', id: 5, unit: UNITS.rep },
  { type: 'Plank', id: 6, unit: UNITS.sec },
  { type: 'Biking', id: 7, unit: UNITS.km },
  { type: 'Skipping', id: 8, unit: UNITS.sec },
  { type: 'General', id: 9, unit: UNITS.min },
]

export interface ExerciseRecord {
  count: number;
  type: string;
  points: number;
}