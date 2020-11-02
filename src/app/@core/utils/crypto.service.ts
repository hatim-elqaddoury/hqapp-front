import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})

export class CryptoService {

  constructor() { }

  private keys:any  = "aesEncryptionKey";
  private initVector:any = "encryptionIntVec";

  //The set method is use for encrypt the value.
  public encrypt(value:any): any{
    if(value){
      value = JSON.stringify(value);
      var key = CryptoJS.enc.Utf8.parse(this.keys);
      var iv = CryptoJS.enc.Utf8.parse(this.initVector);
      var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key,
        {
          keySize: 128 / 8,
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        });

      return {encrypted: encrypted.toString() };
    }
  }

  //The get method is use for decrypt the value.
  public decrypt(value:any): any{
    if (value) {
      var key = CryptoJS.enc.Utf8.parse(this.keys);
      var iv = CryptoJS.enc.Utf8.parse(this.initVector);
      var decrypted = CryptoJS.AES.decrypt(value, key, {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });

      return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
    }
  }
  
}
