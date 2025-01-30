import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { CommonModule } from '@angular/common';
import { AboutUsComponent } from './pages/aboutUs/about-us/about-us.component';

@NgModule({
  declarations: [AppComponent,AboutUsComponent],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })// Import app routes
    ],
  providers : []
})
export class AppModule {}
