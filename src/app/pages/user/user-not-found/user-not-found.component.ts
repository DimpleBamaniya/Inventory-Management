import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutComponent } from '../../layout/layout.component';

@Component({
  selector: 'app-user-not-found',
  standalone: true,
  imports: [LayoutComponent],
  templateUrl: './user-not-found.component.html',
  styleUrl: './user-not-found.component.scss'
})
export class UserNotFoundComponent {

}
