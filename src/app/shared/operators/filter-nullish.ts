import { OperatorFunction, filter } from 'rxjs';

export function filterNullish<T>(): OperatorFunction<T | null | undefined, T> {
  return source$ =>
    source$.pipe(
      filter(
        (value: T | null | undefined): value is T =>
          value !== null && value !== undefined
      )
    );
}
