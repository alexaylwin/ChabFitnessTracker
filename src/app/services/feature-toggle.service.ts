import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeatureToggleService {

  get autocompleteEnabled(): boolean {
    return false;
  }

  get saveWorkoutEnabled(): boolean {
    return true;
  }

  get manageWorkoutsEnabled(): boolean {
    return true;
  }

  constructor() { }
}
