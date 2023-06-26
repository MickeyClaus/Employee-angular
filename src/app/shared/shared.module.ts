import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { PhoneFormatPipe } from './pipes/phone-format.pipe';
import { PhoneNumberFormatDirective } from './directives/phone.directive';



@NgModule({
    declarations: [
        PhoneFormatPipe,
        PhoneNumberFormatDirective
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule
    ],
    exports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        PhoneFormatPipe,
        PhoneNumberFormatDirective
    ]
})
export class SharedModule {}
