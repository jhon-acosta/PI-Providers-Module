import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModuleProvidersModule } from './module-providers/module-providers.module';
import { ProviderEnviromentModule } from './provider-enviroment/provider-enviroment.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    //<=Modulos de proveedor(2)=>
    ModuleProvidersModule,
    ProviderEnviromentModule
    // <=======================>
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
