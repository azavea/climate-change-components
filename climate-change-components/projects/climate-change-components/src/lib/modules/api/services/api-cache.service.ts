/**
 * Derived from cache.service.ts in
 *  https://github.com/ashwin-sureshkumar/angular-cache-service-blog
 * Implements a secondary in-flight cache so that multiple requests for the same object
 *  will share a single subject. Avoids multiple calls for a result while the first is
 *  still pending.
 */
import { throwError as observableThrowError, of as observableOf, Observable, Subject } from 'rxjs';

import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

interface CacheValue {
    expiry: number;
    value: any;
}

@Injectable()
export class APICacheService {

  public readonly DEFAULT_MAX_AGE_S = 60 * 60 * 24;

  private cache: Map<string, CacheValue> = new Map<string, CacheValue>();
  private inFlight: Map<string, Subject<any>> = new Map<string, Subject<any>>();

  public clear(key: string) {
    if (this.inFlight.has(key)) {
      this.inFlight.delete(key);
    }
    if (this.has(key)) {
      this.cache.delete(key);
    }
  }

  public get(key: string, fallback?: Observable<any>, maxAge: number = this.DEFAULT_MAX_AGE_S): Observable<any> | Subject<any> {
    if (this.hasValidValue(key)) {
      return observableOf(this.cache.get(key).value);
    }

    if (this.inFlight.has(key)) {
      return this.inFlight.get(key);
    } else if (fallback && fallback instanceof Observable) {
      this.inFlight.set(key, new Subject());
      return fallback.pipe(tap((value) => { this.set(key, value, maxAge); }));
    } else {
      return observableThrowError(`Requested key ${key} is not available in Cache`);
    }
  }

  public has(key: string) {
    return this.cache.has(key);
  }

  public set(key: string, value: Observable<any>, maxAge: number = this.DEFAULT_MAX_AGE_S) {
    this.cache.set(key, { value: value, expiry: Date.now() + maxAge });
    this.notifyInFlight(key, value);
  }

  private hasValidValue(key: string) {
    if (this.has(key)) {
      if (this.cache.get(key).expiry < Date.now()) {
        this.cache.delete(key);
        return false;
      }
      return true;
    } else {
      return false;
    }
  }

  private notifyInFlight(key: string, value: any) {
    if (this.inFlight.has(key)) {
      const inFlight = this.inFlight.get(key);
      const observersCount = inFlight.observers.length;
      if (observersCount) {
        inFlight.next(value);
      }
      inFlight.complete();
      this.inFlight.delete(key);
    }
  }
}
