import { BrowserModule } from '@angular/platform-browser';
import {  NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { SinglePostComponent } from './components/single-post/single-post.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/admin/login/login.component';
import { RegisterComponent } from './components/admin/register/register.component';
import {
    MatButtonModule, MatSidenavModule, MatListModule, MatCardModule, MatInputModule, MatTableModule,
    MatToolbarModule, MatMenuModule, MatIconModule, MatProgressSpinnerModule,
    MatTabsModule,
} from '@angular/material';

import {MatDialogModule,MAT_DIALOG_DATA,MatDialogTitle,MAT_DIALOG_DEFAULT_OPTIONS, MatDialog, MatDialogRef} from '@angular/material/dialog';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotComponent } from './components/admin/forgot/forgot.component';
import { PasswordCreateComponent } from './components/admin/password-create/password-create.component';
import { UserComponent } from './components/admin//user/user.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoaderComponent } from './components/loader/loader.component';
import { TooltipModule } from 'ng2-tooltip-directive';
import { FilterPipe } from './pipes/filterPipe/filter.pipe';
import { MdePopoverModule } from '@material-extended/mde';
// import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
// import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ErrorShowingComponent } from './components/error-showing/error-showing.component';
// import { ErrorShowingService } from './services/errorService/error-showing.service';


@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        HomeComponent,
        SinglePostComponent,
        AboutComponent,
        ContactComponent,
        LoginComponent,
        RegisterComponent,
        ForgotComponent,
        PasswordCreateComponent,
        UserComponent,
        FooterComponent,
        LoaderComponent,
        FilterPipe,
        ErrorShowingComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatCardModule,
        MatDialogModule,
        MatInputModule,
        MatTableModule,
        MatProgressSpinnerModule,
        FormsModule,
        ReactiveFormsModule,
        TooltipModule,
        MdePopoverModule,
        MatDatepickerModule,
        MatTabsModule
    ],
    entryComponents: [
        ErrorShowingComponent ,LoginComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    providers: [ { provide: MatDialogTitle, useValue: {} }, { provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: [] },
     ],
    bootstrap: [AppComponent]
})
export class AppModule { }
