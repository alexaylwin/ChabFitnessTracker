export interface Exercise {
  type: string;
  id: number;
  unit: UNITS;
  multiplier: number;
}

export interface ExerciseRecord {
  count: number;
  type: string;
  points: number;
}

export enum UNITS {
  min = 'min',
  sec = 'sec',
  rep = 'rep',
  km = 'km'
}

export const EXERCISE_LIST: Array<Exercise> = [
  { type: 'Pull-up', id: 1, unit: UNITS.rep, multiplier: 0.8 },
  { type: 'Walking', id: 2, unit: UNITS.km, multiplier: 10 },
  { type: 'Sit-up' , id: 3, unit: UNITS.rep, multiplier: 0.1 },
  { type: 'Push-up', id: 4, unit: UNITS.rep, multiplier: 0.4 },
  { type: 'Squat', id: 5, unit: UNITS.rep, multiplier: 0.2 },
  { type: 'Plank', id: 6, unit: UNITS.sec, multiplier: 0.067 },
  { type: 'Biking', id: 7, unit: UNITS.km, multiplier: 10 },
  { type: 'Skipping', id: 8, unit: UNITS.sec, multiplier: 0.056 },
  { type: 'General', id: 9, unit: UNITS.min, multiplier: 0.833 },
];

export function CalculateExercisePoints(exercise: Exercise, count: number): number {
  return (exercise === undefined ? 0 : Math.floor(count * exercise.multiplier));
}

export function GetExerciseByType(type: string) {
  return EXERCISE_LIST.find( (exercise) => exercise.type === type);
}
