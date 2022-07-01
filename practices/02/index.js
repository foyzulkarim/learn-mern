console.log('script loaded');

//const studentsInput = prompt('Please input students array.');
const studentsInput = `[{"name":"John","age":21,"courses":[{"name":"JavaScript","grade":90},{"name":"Database","grade":85}]},{"name":"Alice","age":20,"courses":[{"name":"JavaScript","grade":92},{"name":"Database","grade":80}]}]`;

const students = JSON.parse(studentsInput);

const grades = students.map((student) => student.courses.reduce((sum, course) => sum = sum + course.grade, 0));
const totalGrades = grades.reduce((sum, current) => sum += current, 0);

console.log(totalGrades); 

// how can we calculate 1. individual grade 175/2  2. overall class grade 345/4

