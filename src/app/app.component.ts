import { Component, ChangeDetectorRef } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material';
import { CookieSnackbarComponent } from './cookie-snackbar/cookie-snackbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

/**
 * App Component
 * 
 * Main component of the application.
 */
export class AppComponent {
  title = 'VJTI Survival Kit';

  constructor(public snackBar: MatSnackBar, private changeDetector: ChangeDetectorRef) { }

  /**
   * Sidenav open flag
   */
  opened: boolean = false;

  /**
   * Opens side nav
   */
  openSideNav() {
    this.opened = true;
  }


  /**
   * If cookie consent is not accepted open a snackbar with custom snackbar template,
   * Timeout is set to fix `ExpressionChangedAfterItHasBeenCheckedError` error
   * https://stackoverflow.com/questions/48111305/angular-error-in-material-snackbar?rq=1
   */
  ngOnInit() {
    if (!localStorage.getItem('cookie-accepted'))
      setTimeout(() => {
        let cookieSnack = this.snackBar.openFromComponent(CookieSnackbarComponent, { panelClass: ['mat-elevation-z3'] });

        cookieSnack.onAction().subscribe(() => {
          localStorage.setItem("cookie-accepted", "true");
          cookieSnack.dismiss();
        });
      });

  }
}
