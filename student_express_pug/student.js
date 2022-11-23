class Student{
    constructor(id, name, dept, semester, courses_enrolled, courses_completed){
        this.id = id;
        this.name = name;
        this.dept = dept;
        this.semester = semester;
        this.courses_enrolled = courses_enrolled;
        this.courses_completed = courses_completed;
    }

    info(){
        let output = `Student ID: ${this.id} Name: ${this.name} Department: ${this.dept} Semester: ${this.semester}\n`
        output += 'Courses Enrolled:\n'
        this.courses_enrolled.forEach(element => {
            output += `${element.name}\n`
        });
        output += 'Courses Completed:\n'
        this.courses_completed.forEach(element => {
            output += `${element.name}\n`
        });
        return output
    }

    average(){
        let total = 0;
        this.courses_completed.forEach(element => {total += element.grade});
        return(total/this.courses_completed.length);
      }
}

module.exports = Student;