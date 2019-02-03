import { Component, OnInit, isDevMode } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

/**
 * SideBar
 */
export class SidebarComponent implements OnInit {

  constructor(public snackBar:MatSnackBar) { }

  debug:boolean;

  ngOnInit() {
    this.debug = isDevMode();
  }

  /**
   * Clears the local storage, for debug purposes
   */
  deleteSave() {
    if(!this.debug)
      return;

    this.snackBar.open("Deleted save", null, {"duration":2000});
    localStorage.clear();
  }

}
