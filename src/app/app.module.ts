import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ToasterService } from './core/Toaster/toaster.service';
import { ToasterComponent } from './core/Toaster/toaster.component';
import { AboutUsComponent } from './pages/aboutUs/about-us/about-us.component';

@NgModule({
  declarations: [AppComponent,
    ToasterComponent,AboutUsComponent], // Declare the toaster component here], // No declarations because AppComponent is standalone
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }), // Import app routes,
    ToasterComponent
  ],
  providers : [ToasterService]
})
export class AppModule {}
