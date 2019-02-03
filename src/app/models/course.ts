import { Semister } from './semister';
import { autoserialize, autoserializeAs, Deserialize, Serialize } from '../serialize';

/**
 * Course Model
 * Data model for the course 
 * 
 * Used to encapsulated data for the components and to serialize it inorder to save it,
 * contains the list of semisters, which is used to calculate earned credits, grade points, and cpi.
 */
export class Course {

    /**
     * List of semisters,
     * saved locally.
     */
    @autoserializeAs(Semister) semisters: Semister[];

    /**
     * earnedCredits, earnedGradePoints, cpi
     * 
     * output calculated when the any of the subjects are updated.
     */
    earnedCredits: number;
    earnedGradePoints: number;
    cpi: number;

    /**
     * Constructor
     * 
     * @param semisters array of semisters
     */
    constructor(semisters?: Semister[]) {
        this.semisters = semisters;
    }

    /**
     * Loads the course from the local storage and returns it
     * if it doesn't exists, creates a new course
     * @returns `Course` object
     */
    static GetMyCourse(): Course {
        var courseString = localStorage.getItem('my-course');
        if (!courseString) {
            return new Course([]);
        }
        return Deserialize(JSON.parse(courseString), Course);
    }

    /**
     * Deletes the course from local storage
     */
    static deleteMyCourse() {
        localStorage.removeItem('my-course');
    }


    /**
     * Saves the course in local storage, if cookies consent has been accepted
     */
    saveMyCourse() {
        if (!localStorage.getItem('cookie-accepted'))
            return;

        localStorage.setItem('my-course', JSON.stringify(Serialize(this)));
    }

    /**
     * Checks if a semister with specified number (not index) exists in the `semisters` array
     * @param semisterNo specifed semister number 
     * @returns `false` if semister doesnt exists
     */
    private doesSemisterExist(semisterNo: number): boolean {
        for (let i = 0; i < this.semisters.length; i++) {
            if (this.semisters[i].semister_no == semisterNo)
                return true;
        }
        return false;
    }

    /**
     * Creates a semister with a specified semister number if it doesnt exists
     * @param semister_no specifed semister number
     * @returns true if the semister is created successfully
     */
    createSemister(semister_no: number): boolean {
        if (Number.isNaN(semister_no) || semister_no <= 0 || this.doesSemisterExist(semister_no))
            return false;

        this.semisters.push(Semister.CreateNewSemister(semister_no));
        this.semisters.sort((a, b) => a.semister_no - b.semister_no);
        return true;
    }

    /**
     * Deletes the semister from the `semsiters` array if it exists
     * @param sem semister object
     */
    deleteSemister(sem: Semister) {
        const index: number = this.semisters.indexOf(sem);
        if (index !== -1) {
            this.semisters.splice(index, 1);
        }
    }

    /**
     * Callback which is executed when any semister object is changed in the `semisters` array
     * 
     * Creates temporary variables for each of the calculated outputs,
     * loops though the `semisters` array to calculate them
     * 
     * Updates the output variables. 
     */
    notifyChange() {

        let earnedCredits = 0;
        let earnedGradePoints = 0;
        let sumOfSPI = 0;

        for (let i = 0; i < this.semisters.length; i++) {
            this.semisters[i].notifyUpdate()

            earnedCredits += this.semisters[i].credits;
            earnedGradePoints += this.semisters[i].earnedGradePoints;
            sumOfSPI += this.semisters[i].spi;
        }

        this.earnedCredits = earnedCredits;
        this.earnedGradePoints = earnedGradePoints;

        let cpi = (sumOfSPI / this.semisters.length);

        console.log(cpi);

        if (!cpi)
            this.cpi = 0;
        else
            this.cpi = parseFloat(cpi.toFixed(2));

        this.saveMyCourse();
    }
}