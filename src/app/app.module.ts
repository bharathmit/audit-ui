import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

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

import { MatDialogModule, MAT_DIALOG_DATA, MatDialogTitle, MAT_DIALOG_DEFAULT_OPTIONS, MatDialog, MatDialogRef } from '@angular/material/dialog';

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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ErrorShowingComponent } from './components/error-showing/error-showing.component';
import { ClientsComponent } from './components/clients/clients.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ErrorShowingService } from './services/errorService/error-showing.service';
import { LyThemeModule, LY_THEME } from '@alyle/ui';
import { MinimaLight, MinimaDark } from '@alyle/ui/themes/minima';
import { LyButtonModule } from '@alyle/ui/button';
import { LyToolbarModule } from '@alyle/ui/toolbar';
import { LyResizingCroppingImageModule } from '@alyle/ui/resizing-cropping-images';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

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
        ClientsComponent,
        PageNotFoundComponent,
        
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
        MatTabsModule,
        LyThemeModule.setTheme('minima-light'),
        LyButtonModule,
        LyToolbarModule,
        LyResizingCroppingImageModule,
        NgbModule
    ],
    entryComponents: [
        ErrorShowingComponent, LoginComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    providers: [{ provide: MatDialogTitle, useValue: {} }, { provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: [] }, { provide: LY_THEME, useClass: MinimaLight, multi: true }, { provide: LY_THEME, useClass: MinimaDark, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
