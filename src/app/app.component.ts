import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserModule } from './pages/user/user.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,UserModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'web';
}
