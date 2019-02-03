import { autoserialize } from '../serialize';


/**
 * Subject Model
 * Data Model for subject
 * 
 * Used to encapsulated data for the components and to serialize it inorder to save it in local storage,
 * contains name of the subject, grades string, and credits assgined for the subject.
 */
export class Subject {
    /**
     * Name of the subject
     */
    @autoserialize name: string;

    /**
     * Grade earned in the subject
     */
    @autoserialize grades: string;

    /**
     * Credits assigned for the subject
     */
    @autoserialize credits: number;

    constructor(name?:string, grades?:string, credits?:number) {
        
        if(grades)
            grades = grades.toUpperCase();

        this.name = name;
        this.grades = grades;
        this.credits = credits;
    }
}

/**
 * GradesToValue
 * 
 * Encapsulates the relationship between grades and the normalized score value out of 10
 */
export class GradesValue {

    grades: string;
    value: number;

    constructor(grades:string, value:number) {
        this.grades = grades;
        this.value = value;
    }

    /**
     * Converts normalized score to grades
     * @param score normalized score
     * @returns grades string
     */
    static GetGrades(score:number): string {

        for (var index = 6; index >= 0; index--) {
            var current = grades_to_value_list[index];
            var next = grades_to_value_list[index + 1];

            if (score >= next.value && score < current.value) {
                return next.grades;
            }
        }

        //edge case
        if (score === grades_to_value_list[0].value)
            return grades_to_value_list[0].grades;

        return null;
    }

    /**
     * Converts grades string into normalized integer score value
     * @param grades grades string
     * @returns normalized score integer value
     */
    static GetValue(grades:string): number {

        for (var index = 0; index < grades_to_value_list.length; index++) {
            var i = grades_to_value_list[index];
            if (grades == i.grades) {
                return i.value;
            }
        }
        return -1;
    }
}

/**
 * List of valid grades, with normalized score integer values
 */
var grades_to_value_list: GradesValue[] = [
    new GradesValue("AA", 10),
    new GradesValue("AB", 9),
    new GradesValue("BB", 8),
    new GradesValue("BC", 7),
    new GradesValue("CC", 6),
    new GradesValue("CD", 5),
    new GradesValue("DD", 4),
    new GradesValue("FF", 0),
    new GradesValue("II", 0),
    new GradesValue("RR", 0)
]