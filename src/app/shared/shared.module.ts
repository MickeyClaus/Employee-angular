import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { PhoneFormatPipe } from './pipes/phone-format.pipe';
import { PhoneNumberFormatDirective } from './directives/phone.directive';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
    declarations: [
        PhoneFormatPipe,
        PhoneNumberFormatDirective,
        PaginatorComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        MatPaginatorModule
    ],
    exports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        PhoneFormatPipe,
        PhoneNumberFormatDirective,
        PaginatorComponent

    ]
})
export class SharedModule {}
