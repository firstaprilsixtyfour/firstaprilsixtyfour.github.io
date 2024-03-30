import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";


export interface Check {
  name: string;
  errorMessage: string;
  check: (password: string) => boolean;

}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgForOf, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor() {
    this.updateChecks()
  }

_password: string = 'sdf/8K1964978';
  get password() {
    return this._password;
  }
  set password(p: string) {
    this._password = p;
    this.updateChecks()
  }
  title = 'password-checker';

  error : Check | null = null;
  successChecks : Check [] = [
  ]

  checks : Check [] = [
    {
      name: 'minLength',
      errorMessage: 'La password deve essere lunga almeno 5 caratteri',
      check: (password: string) => password.length >= 5
    },
    {
      name: 'containsNumber',
      errorMessage: 'La password deve contenere almeno un numero',
      check: (password: string) => /\d/.test(password)
    },
    {
      name: 'containsUpperCase',
      errorMessage: 'La password deve contenere almeno una lettera maiuscola',
      check: (password: string) => /[A-Z]/.test(password)
    },
    {
      name: 'containsLowerCase',
      errorMessage: 'La password deve contenere almeno una lettera minuscola',
      check: (password: string) => /[a-z]/.test(password)
    },
    {
      name: 'containsSpecialCharacter',
      errorMessage: 'La password deve contenere almeno un carattere speciale',
      check: (password: string) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)
    },
    {
      name: 'containsYourBirthYear',
      errorMessage: 'Il tuo anno di nascita deve essere una sottosequenza della password',
      check: (password: string) => this.isValidSubsequence(password, '1964')
    },
    {
      name: 'containsOurBirthYear',
      errorMessage: 'Il nostro anno di nascita deve essere una sottosequenza della password',
      check: (password: string) => this.isValidSubsequence(password, '1997') && this.isValidSubsequence(password, '1998')
    }
  ]

  isValidSubsequence(array: string, sequence: string) {
    let index = -1;
    for (const value of sequence) {
      index = array.indexOf(value, index + 1); // find the next sequence value
      if (index === -1) {
        return false; // not found, return false immediately
      }
    }
    return true;
  }

  updateChecks() {
    let errorIndex = this.checks.findIndex(check => !check.check(this.password))
    this.error = errorIndex === -1 ? null : this.checks[errorIndex]
    this.successChecks = this.checks.slice(0, errorIndex === -1 ? this.checks.length : errorIndex)
  }
}
