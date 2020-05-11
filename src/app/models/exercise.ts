export interface Exercise {
  type: string;
  id: number;
  unit: UNITS;
  multiplier: number;
}

export enum UNITS {
  'min',
  'sec',
  'rep',
  'km'
}

export const EXERCISE_LIST: Array<Exercise> = [
  { type: 'Pull-up (reps)', id: 1, unit: UNITS.rep, multiplier: 0.8 },
  { type: 'Walking (km)', id: 2, unit: UNITS.km, multiplier: 10 },
  { type: 'Sit-up (reps)' , id: 3, unit: UNITS.rep, multiplier: 0.1 },
  { type: 'Push-up (reps)', id: 4, unit: UNITS.rep, multiplier: 0.4 },
  { type: 'Squat (reps)', id: 5, unit: UNITS.rep, multiplier: 0.2 },
  { type: 'Plank (sec)', id: 6, unit: UNITS.sec, multiplier: 0.067 },
  { type: 'Biking (km)', id: 7, unit: UNITS.km, multiplier: 10 },
  { type: 'Skipping (sec)', id: 8, unit: UNITS.sec, multiplier: 0.056 },
  { type: 'General (min)', id: 9, unit: UNITS.min, multiplier: 0.833 },
];

export interface ExerciseRecord {
  count: number;
  type: string;
  points: number;
}

export function CalculateExercisePoints(exercise: Exercise, count: number): number {
  return (exercise === undefined ? 0 : Math.floor(count * exercise.multiplier));
}

export function GetExerciseByType(type: string) {
  return EXERCISE_LIST.find( (exercise) => exercise.type === type);
}