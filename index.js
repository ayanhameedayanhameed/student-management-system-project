#! /usr/bin/env node
//This project is a simple console based Student Management System. In this project you will be learning how to add new students, how to generate a 5 digit unique studentID for each student, how to enroll students in the given courses. Also, you will be implementing the following operations enroll, view balance, pay tuition fees, show status, etc. The status will show all the details of the student including name, id, courses enrolled and balance.This is one of the best projects to implement the Object Oriented Programming concepts.
// importing inquirer and chalk.
import inquirer from "inquirer";
import chalk from "chalk";
// defining a student class
class Student {
    static counter = 10000;
    id;
    name;
    courses;
    balance;
    // initializing all properties value
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = []; // initializing an empty array for courses
        this.balance = 1000; // we are giving by default 1000 dollars
    }
    // method to enroll a student in a course
    enrollCourse(course) {
        this.courses.push(course);
    }
    // method to view a student balance
    viewStudentBalance() {
        console.log(chalk.blue(`Balance for ${this.name}: $${this.balance}`));
    }
    // method to pay student fee
    payFee(amount) {
        this.balance -= amount;
        console.log(chalk.green(`$${amount} fees paid successfully for ${this.name}`));
        console.log(chalk.yellow(`Remaining balance: $${this.balance}`));
    }
    // method to display student status
    showStatus() {
        console.log(chalk.magenta(`ID: ${this.id}`));
        console.log(chalk.magenta(`Name: ${this.name}`));
        console.log(chalk.magenta(`Enrolled courses: ${this.courses.join(", ")}`));
        console.log(chalk.magenta(`Balance: ${this.balance}`));
    }
}
// defining a new class named studentManager to manage students
class studentManager {
    students;
    constructor() {
        this.students = [];
    }
    // method to add a new student
    addStudent(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(chalk.green(`Student: ${name} added successfully. Student ID: ${student.id}`));
    }
    // method to enroll a student in a course
    enrollStudent(studentId, course) {
        let findingStudent = this.findStudent(studentId);
        if (findingStudent) {
            findingStudent.enrollCourse(course);
            console.log(chalk.green(`Student with ID ${studentId} enrolled in ${course} successfully.`));
        }
        else {
            console.log(chalk.red(`No student found with ID: ${studentId}`));
        }
    }
    // method to view a student balance
    viewStudentBalance(studentId) {
        let findingStudent = this.findStudent(studentId);
        if (findingStudent) {
            findingStudent.viewStudentBalance();
        }
        else {
            console.log(chalk.red(`No student found with ID: ${studentId}`));
        }
    }
    // method to pay student fee
    payStudentFee(studentId, amount) {
        let findingStudent = this.findStudent(studentId);
        if (findingStudent) {
            findingStudent.payFee(amount);
        }
        else {
            console.log(chalk.red(`No student found with ID: ${studentId}`));
        }
    }
    // method to show student status
    showStudentStatus(studentId) {
        let findingStudent = this.findStudent(studentId);
        if (findingStudent) {
            findingStudent.showStatus();
        }
        else {
            console.log(chalk.red(`No student found with ID: ${studentId}`));
        }
    }
    // method to find a student by student id
    findStudent(studentId) {
        return this.students.find((std) => std.id === studentId);
    }
}
// main function to run the program
async function main() {
    console.log(chalk.cyan("-".repeat(50)));
    console.log(chalk.cyan("Welcome to Ayan student management system project"));
    console.log(chalk.cyan("-".repeat(50)));
    let student_Manager = new studentManager();
    // while loop to keep program running
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select an option",
                choices: [
                    "Add a new student",
                    "Enroll a student in a course",
                    "View a student balance",
                    "Pay a student fee",
                    "View a student status",
                    "Exit",
                ],
            },
        ]);
        // using switch statements to handle user choice
        switch (choice.choice) {
            case "Add a new student":
                let nameInput = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter student name",
                    },
                ]);
                student_Manager.addStudent(nameInput.name);
                break;
            case "Enroll a student in a course":
                let courseInput = await inquirer.prompt([
                    {
                        name: "studentId",
                        type: "input",
                        message: "Enter a student ID",
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter a course name",
                    },
                ]);
                student_Manager.enrollStudent(Number(courseInput.studentId), courseInput.course);
                break;
            case "View a student balance":
                let balanceInput = await inquirer.prompt([
                    {
                        name: "studentID",
                        type: "number",
                        message: "Enter a student ID",
                    },
                ]);
                student_Manager.viewStudentBalance(balanceInput.studentID);
                break;
            case "Pay a student fee":
                let feeInput = await inquirer.prompt([
                    {
                        name: "studentID",
                        type: "number",
                        message: "Enter a student ID",
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter the amount of course to pay",
                    },
                ]);
                student_Manager.payStudentFee(feeInput.studentID, feeInput.amount);
                break;
            case "View a student status":
                let statusInput = await inquirer.prompt([
                    {
                        name: "studentID",
                        type: "number",
                        message: "Enter a student ID",
                    },
                ]);
                student_Manager.showStudentStatus(statusInput.studentID);
                break;
            case "Exit":
                console.log(chalk.red("Exiting....."));
                process.exit();
        }
    }
}
// calling the main function
main();
