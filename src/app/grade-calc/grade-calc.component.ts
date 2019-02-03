import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, Form, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { GradesValue } from '../models/subjects';
import { Subscription } from 'rxjs';

/**
 * Error when invalid control is dirty, touched, or submitted.
 */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-grade-calc',
  templateUrl: './grade-calc.component.html',
  styleUrls: ['./grade-calc.component.scss']
})

/**
 * GradeCalcComponent
 * calculates the Grade of a subject using scores in the users exams and internal score,
 * user can use this feature to plan ahead to form a target score to achive in the next exam.
 * 
 * It contains a form with 4 input fields, which is when updated and valid shows output using text.
 */
export class GradeCalcComponent implements OnInit {

  /**
   * Output string to be displayed in HTML for normalized score.
   */
  outOf10String: string;

  /**
   * Output string to be displayed in HTML for grades.
   */
  gradeString: string;

  /**
   * FormControl for each of the form field with their validation parameters.
   */
  midTerms = new FormControl('', [
    Validators.required,
    Validators.max(30)
  ]);
  endSem = new FormControl('', [
    Validators.required,
    Validators.max(100)
  ]);
  internals = new FormControl('', [
    Validators.required,
    Validators.max(10)
  ]);

  highest = new FormControl('', [
    Validators.max(10)
  ]);

  /**
   * Form Group used to create the form update subscription.
   */
  formGroup = new FormGroup({
    midTerms: this.midTerms,
    endSem: this.endSem,
    internals: this.internals,
    highest: this.highest
  });
  
  /**
   * Subscription for form update event, subscribed in ngOnInit and unsubscribed in ngOnDestroy
   */
  formChangesSubscription: Subscription;

  /**
   * Error when invalid control is dirty, touched, or submitted.
   */
  matcher = new MyErrorStateMatcher();

  /**
   * Normilizes and calculates the relative score depending on the weightage of the exam and the absolute 
   * normalized score of the highest scorer in the class using a formula.
   * 
   * @param midTerms Marks scored in Mid Terms exam out of 30
   * @param endSem  Marks score in End Semister exam out of 100
   * @param internals Marks scored in internals out of 10
   * @param highest absolute normalized score of the highest scorer out of 10
   */
  static CalcOutOf10(midTerms, endSem, internals, highest): number {
    return ((midTerms + (endSem * 0.6) + internals) / highest);
  }

  /**
   * Initialize both the output strings to default value.
   * 
   * An event is subscribed which is notified when the form is updated.
   * 
   * When the form is updated and it is valid, normalized score and the grade is calculated and the output strings are
   * updated accordingly.
   */
  ngOnInit() {

    this.outOf10String = "0.00";
    this.gradeString = "II";

    this.formChangesSubscription = this.formGroup.valueChanges.subscribe(
      x => {
        if (!this.formGroup.valid)
          return;

        var highestMarks = this.highest.value ? this.highest.value : 10;

        var outOf10 = GradeCalcComponent.CalcOutOf10(this.midTerms.value, this.endSem.value, this.internals.value, highestMarks);
        this.outOf10String = outOf10.toFixed(2);
        this.gradeString = GradesValue.GetGrades(outOf10);
      }
    );
  }

  /**
   * Unsubcribes the form updated subscription
   */
  ngOnDestroy() {
    this.formChangesSubscription.unsubscribe();
  }

}
