import { NgModule } from '@angular/core';
import { DtPipe } from '../pipes/dt/dt.pipe';

@NgModule({
    declarations: [DtPipe],
    exports: [ DtPipe ]
})
export class ApplicationPipes {}
