import { Injectable } from '@angular/core';

import * as cryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private readonly password: string;

  constructor() {
    this.password = 'myGreatPass';
  }

  public encrypt(messageToEncrypt: string): string {
    return cryptoJS.AES.encrypt(
      messageToEncrypt.trim(),
      this.password
    ).toString();
  }

  public decrypt(messageToDecrypt: string): string {
    return cryptoJS.AES.decrypt(
      messageToDecrypt,
      this.password
    ).toString(cryptoJS.enc.Utf8);
  }
}
