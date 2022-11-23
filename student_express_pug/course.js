class Course {
    constructor(id, name, dept, desc){
        this.id = id;
        this.name = name;
        this.dept = dept;
        this.desc = desc;
    }

    info(){
        let output = `Course ID: ${this.id} Name: ${this.name} Department: ${this.dept} Description: ${this.desc} `
        return output
    }
}

class OngoingCourse extends Course{
    constructor(id, name, dept, desc, remaining){
        super(id,name,dept,desc);
        this.remaining = remaining
    }

    info(){
        let output = super.info();
        output += `Remaining Spots: ${this.remaining}`;
        return output;
    }
}

class CompletedCourse extends Course{
    constructor(id, name, dept, desc, grade){
        super(id, name, dept, desc);
        this.grade = grade;

    }
    
    info(){
        let output = super.info();
        output += `Grade: ${this.grade}`;
        return output;
    }

}

module.exports = { OngoingCourse:OngoingCourse,
CompletedCourse:CompletedCourse}

