import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  // providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),provideHttpClient()]
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    // provideAnimationsAsync(),
    // providePrimeNG({
    //   theme: {
    //     preset: Aura,
    //     options: {
    //         darkModeSelector: false || 'none'
    //     }
    // }
    // }),
    // provideToastr({
    //   timeOut: 3000,
    //   positionClass: 'toast-top-right',
    //   preventDuplicates: true
    // }),
    provideHttpClient()
  ]
};

function provideAnimationsAsync(): import("@angular/core").Provider | import("@angular/core").EnvironmentProviders {
  throw new Error('Function not implemented.');
}

function providePrimeNG(arg0: { theme: { preset: any; options: { darkModeSelector: string; }; }; }): import("@angular/core").Provider | import("@angular/core").EnvironmentProviders {
  throw new Error('Function not implemented.');
}

function provideToastr(arg0: { timeOut: number; positionClass: string; preventDuplicates: boolean; }): import("@angular/core").Provider | import("@angular/core").EnvironmentProviders {
  throw new Error('Function not implemented.');
}

