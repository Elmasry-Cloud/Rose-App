import { Dispatch, SetStateAction } from 'react';
import React from 'react';

export default interface ISteps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  emailInputRef: React.RefObject<HTMLInputElement | null>;
}
