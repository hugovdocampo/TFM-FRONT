import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';

import { ViajeControllerService } from './api/viaje-controller/viaje-controller.service';
import { PlanControllerService } from './api/plan-controller/plan-controller.service';
import { PropuestaControllerService } from './api/propuesta-controller/propuesta-controller.service';
import { TicketControllerService } from './api/ticket-controller/ticket-controller.service';
import { PagoControllerService } from './api/pago-controller/pago-controller.service';


@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    ViajeControllerService,
    PlanControllerService,
    PropuestaControllerService,
    TicketControllerService,
    PagoControllerService]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<ApiModule> {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
