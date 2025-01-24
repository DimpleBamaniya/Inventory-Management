import { Component } from '@angular/core';
import { ToasterService } from './toaster.service';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.scss'
})
export class ToasterComponent {
  constructor(public toasterService: ToasterService) {}
  
  removeMessage(message: { text: string; type: 'success' | 'error' | 'info' }) {
    const index = this.toasterService.messages.indexOf(message);
    if (index > -1) {
      this.toasterService.messages.splice(index, 1);
    }
  }
}

