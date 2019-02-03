import { Component, OnInit } from '@angular/core';
import { MatSnackBarRef } from '@angular/material';

@Component({
  selector: 'app-cookie-snackbar',
  templateUrl: './cookie-snackbar.component.html',
  styleUrls: ['./cookie-snackbar.component.scss']
})

/**
 * custom snackbar for cookie consent
 */
export class CookieSnackbarComponent {

  constructor(private snackBarRef: MatSnackBarRef<CookieSnackbarComponent>) { }

  /**
   * Callback for `Got it` button
   */
  onActionBtnClick() {
    this.snackBarRef.dismissWithAction();
  }

}
