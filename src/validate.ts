import { throwIf } from './utils';

type Validator<T> = (candidate: T) => void;

export const regexp = (re: RegExp): Validator<string> => candidate => {
  throwIf(
    !re.test(candidate),
    `Argument ${candidate} did not match requirement: ${re}`,
  );
};

export const maxLength = (len: number): Validator<string> => candidate => {
  throwIf(
    candidate.length <= len,
    `Argument ${candidate} is longer than required ${len} characters`,
  );
};

export const minLength = (len: number): Validator<string> => candidate => {
  throwIf(
    candidate.length >= len,
    `Argument ${candidate} is shorter than required ${len} characters`,
  );
};

export const EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const combine = <T>(
  ...validators: Array<Validator<T>>
): Validator<T> => candidate => {
  validators.forEach(validator => validator(candidate));
};
