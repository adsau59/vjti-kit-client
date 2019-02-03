import {BehaviorSubject} from 'rxjs';
import {Subject, GradesValue} from './subjects';
import Helper from '../helper';
import { autoserializeAs, autoserialize } from '../serialize';
import { debug } from 'util';

/**
 * Semister Model
 * Data Model from semister in a course
 * 
 * Used to encapsulate data of subjects and to serialize them inorder to save them in local storage,
 * contains the list of subjects and number of the semister.
 */
export class Semister{
    
    /**
     * List of subjects
     */
    @autoserializeAs(Subject) subjects:Subject[];

    /**
     * Semister number
     */
    @autoserialize semister_no:number;
   
    /**
     * Signifies if the semister is in edit mode in the UI,
     * In edit mode, user can add, remove `Subject` from the `Semister`
     */
    editmode:boolean;

    /**
     * Used to notify the UI when any subject is added/removed
     */
    subjectsTableObservable:BehaviorSubject<Subject[]>;

    /**
     * outputs calculated when the subjects are changed
     */
    credits:number;
    earnedGradePoints:number;
    spi:number;

    /**
     * Constructor
     * 
     * @param semister_no semister number
     * @param subjects `Subject` array
     */
    constructor(semister_no, subjects:Subject[]){
        this.semister_no = semister_no;
        this.subjects = subjects;
        this.editmode = false;
        this.subjectsTableObservable = new BehaviorSubject(subjects);
    }

    /**
     * Creates a new semister object with editmode true
     * 
     * @param semNo semister number
     * @returns newly created `Semister` object
     */
    static CreateNewSemister(semNo:number):Semister{
        var sem = new Semister(semNo, []);
        sem.editmode = true;
        return sem;
    }

    /**
     * Notifies the UI to update the subjects table
     */
    public refreshObservable(){
        this.subjectsTableObservable.next(this.subjects);
    }

    /**
     * Toggles `editmode`
     */
    public toggleEdit(){
        this.editmode = !this.editmode;
    }

    /**
     * Converts the `semister_no` integer into a roman equivalant string
     */
    public getSemisterRoman(): string{
        return Helper.romanize(this.semister_no);
    }

    /**
     * Creates a new `Subject` object and adds it into the `subjects` list
     * 
     * @param subjectName name of the subject
     * @param grades grades scored in the subject
     * @param credits credits assigned for the subject
     * @returns `false` if the created subject is invalid
     */
    public addSubject(subjectName:string, grades:string, credits:number): boolean{
        var sub = new Subject(subjectName, grades, credits);
        if(GradesValue.GetValue(sub.grades) < 0 || Number.isNaN(credits))
            return false;
        
        this.subjects.push(sub);
        return true;
    }

    /**
     * Deletes the subject from the `subjects` list if it exists
     * @param subject `Subject object`
     */
    public deleteSubject(subject:Subject){
        var i= this.subjects.indexOf(subject);
        if (i !== -1) {
            this.subjects.splice(i, 1);
        }
    }

    /**
     * Callback which is executed when a subject is added/removed from the `subjects` list
     * 
     * Creates temporary variables, calculates them and updates the output variable
     * 
     * sends subjects table UI notification to update though observable
     */
    public notifyUpdate(){

        let credits = 0;
        let earnedGradePoints = 0;

        this.subjects.forEach(sub => {
            credits += sub.credits;
            earnedGradePoints += (sub.credits*GradesValue.GetValue(sub.grades))
        });

        this.credits = credits;
        this.earnedGradePoints = earnedGradePoints;
        this.spi = parseFloat((earnedGradePoints/credits).toFixed(2));

        this.subjectsTableObservable.next(this.subjects);

    }

}