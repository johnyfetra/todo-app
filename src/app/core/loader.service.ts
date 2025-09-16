import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private _active$ = new BehaviorSubject<boolean>(false);
  readonly active$ = this._active$.asObservable();

  show() { this._active$.next(true); }
  hide() { this._active$.next(false); }
}


