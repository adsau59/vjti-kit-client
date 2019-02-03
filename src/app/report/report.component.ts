import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { Semister } from '../models/semister';
import { Subject } from '../models/subjects';
import { Course } from '../models/course';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

/**
 * Interface to incapuslate data from New Subject Dialog box
 */
export interface NewSubjectDialogData {
  subject: string;
  grades: string;
  credits: number;
}

/**
 * Interface to incapsulate data from New Semister Dialog box
 */
export interface NewSemisterDialogData {
  semisterNo: number;
}

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})

/**
 * Report
 * Create a report card for yourself to keep your scores in check and to plan ahead.
 */
export class ReportComponent implements OnInit {

  constructor(public dialog: MatDialog, public snackBar: MatSnackBar, ) { }

  /**
   * Course Object that will be loaded from the local storage.
   */
  myCourse: Course;

  /**
   * Arrangement of the columns to be displayed in Subjects Table UI
   */
  columnsToDisplay: string[] = ['name', 'grades', 'credits', 'delete']

  /**
   * Get course from local storage then update UI.
   */
  ngOnInit() {
    this.myCourse = Course.GetMyCourse();
    this.myCourse.notifyChange();
  }

  /**
   * Shows a snackbar message on screen for 2 seconds
   * @param message message to be displayed
   */
  snackMessage(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
    });
  }

  /**
   * Opens new subject dialog box, 
   * called from onclick of create subject button
   * 
   * When the dialog box is closed, result is checked
   * if it exists then new subject is created if values are valid.
   * 
   * @param semister semister object for which new subject has to be created
   */
  openNewSubjectDialog(semister: Semister): void {
    const dialogRef = this.dialog.open(NewSubjectDialog, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result == undefined)
        return;

      if (!semister.addSubject(result.subject, result.grades, Number(result.credits)))
        this.snackMessage("Incorrect Values");
      else
        this.myCourse.notifyChange();
    });
  }

  /**
   * Opens new Semister dialog box,
   * called from onclick of create semister button
   * 
   * When the dialog box is closed, result is checked
   * if it exists then new semister is created if values are valid.
   */
  openNewSemisterDialog(): void {
    const dialogRef = this.dialog.open(NewSemsiterDialog, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result == undefined)
        return;

      if (!this.myCourse.createSemister(Number(result.semisterNo)))
        this.snackMessage("Incorrect Values");

    });
  }

  /**
   * Deletes the target subject in a semister
   * 
   * @param semister semister that contains the subject
   * @param subject subject to delete
   */
  deleteSubject(semister: Semister, subject: Subject) {
    semister.deleteSubject(subject);
    this.myCourse.notifyChange();
  }

  /**
   * Deletes the target semster in the course
   * 
   * @param semister semister to delete
   */
  deleteSemister(semister: Semister) {
    this.myCourse.deleteSemister(semister);
    this.myCourse.notifyChange();
  }

}

@Component({
  selector: 'new-subject-dialog',
  templateUrl: 'new-subject-dialog.html',
})

/**
 * New Subject Dialog
 */
export class NewSubjectDialog {

  constructor(
    public dialogRef: MatDialogRef<NewSubjectDialog>,
    @Inject(MAT_DIALOG_DATA) public data: NewSubjectDialogData) { }

  /**
   * Closes the dialogbox, callback from No button on dialog box
   */
  onNoClick() {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'new-semister-dialog',
  templateUrl: 'new-semister-dialog.html',
})

/**
 * New Semister Dialog Box
 */
export class NewSemsiterDialog {

  constructor(
    public dialogRef: MatDialogRef<NewSemisterDialogData>,
    @Inject(MAT_DIALOG_DATA) public data: NewSemisterDialogData) { }

  /**
   * Closes the dialogbox, callback from No button on dialog box
   */
  onNoClick(): void {
    this.dialogRef.close();
  }
}

