import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ToasterService } from './core/Toaster/toaster.service';
import { ToasterComponent } from './core/Toaster/toaster.component';

@NgModule({
  declarations: [AppComponent,
    ToasterComponent], // Declare the toaster component here], // No declarations because AppComponent is standalone
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot(routes), // Import app routes,
    ToasterComponent
  ],
  providers : [ToasterService]
})
export class AppModule {}
