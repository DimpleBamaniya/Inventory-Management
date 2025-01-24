import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserModule } from './pages/user/user.module';
import { ProductModule } from './pages/product/product.module';
import { CommonModule } from '@angular/common';
import { ToasterService } from './core/Toaster/toaster.service';
import { ToasterComponent } from './core/Toaster/toaster.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, UserModule, ProductModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Inventory-Management';

  constructor(private toasterService: ToasterService) {}

  showSuccess() {
    this.toasterService.show('Operation successful!', 'success');
  }

  showError() {
    this.toasterService.show('Something went wrong!', 'error');
  }

  showInfo() {
    this.toasterService.show('This is an informational message.', 'info');
  }
}
