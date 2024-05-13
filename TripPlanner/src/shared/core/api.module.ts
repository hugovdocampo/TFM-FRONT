import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';

import { ViajesResourceService } from './api/viajesResource.service';
import { PlanesResourceService } from './api/planesResource.service';
import { PropuestasResourceService } from './api/propuestasResource.service';
import { TicketsResourceService } from './api/ticketsResource.service';
import { PagosResourceService } from './api/pagosResource.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    ViajesResourceService,
    PlanesResourceService,
    PropuestasResourceService,
    TicketsResourceService,
    PagosResourceService]
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
