import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  messages: { text: string; type: 'success' | 'error' | 'info' }[] = [];

  show(text: string, type: 'success' | 'error' | 'info' = 'info') {
    this.messages.push({ text, type });
    setTimeout(() => this.messages.shift(), 3000); // Automatically remove the toast after 3 seconds
  }
}

