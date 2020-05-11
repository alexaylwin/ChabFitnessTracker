import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeatureToggleService {

  get autocompleteEnabled(): boolean {
    return false;
  }

  constructor() { }
}
