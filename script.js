// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript",
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50,
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150,
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500,
    },
  ],
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47,
    },
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150,
    },
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400,
    },
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39,
    },
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140,
    },
  },
];

// function getLearnerData(course, ag, submissions) {
//   // here, we would process this data to achieve the desired result.

//   const grade = [];
//   const newStudent = {};
  
//   // const result = [
//   //   {
//   //     id: 125,
//   //     avg: 0.985, // (47 + 150) / (50 + 150)
//   //     1: 0.94, // 47 / 50
//   //     2: 1.0 // 150 / 150
//   //   },
//   //   {
//   //     id: 132,
//   //     avg: 0.82, // (39 + 125) / (50 + 150)
//   //     1: 0.78, // 39 / 50
//   //     2: 0.833 // late: (140 - 15) / 150
//   //   }
//   // ];
// // if(!newStudent[l])

// // for (student in newStudent){
// //   const student = newStudent[newStudent];
// //   // const avg = student.
// //   // result.push({id:student.})
// // }
//   return result;
// }

// //?========learner id ++++++++
// const result = [];
// const learner = LearnerSubmissions.forEach((el) => {
//   result.push(el.learner_id);
// });
// const uniqueLeaner = [...new Set(result)];
// console.log(uniqueLeaner);

// getLearnerData();

// //? ===========grades array
// //  AssignmentGroup.assignments.forEach(points => {
// uniqueLeaner.forEach((id) => {
//   if (AssignmentGroup["assignments.id"] === id) {
//     const grades = [];
//     grades.push();
//   }
// });

// //  })

// //?================ getLearnerData()

// LearnerSubmissions.forEach((s) => console.log(s.submission.score));
// const result2 = LearnerSubmissions.find((el) => el.assignment_id === 3);

// AssignmentGroup.assignments.forEach((s) => console.log(s.points_possible));

// console.log(AssignmentGroup.assignments[0].id);

// const result3 = AssignmentGroup.assignments.find((el) => el.id === 3);

// // console.log(result2);
// // console.log(result3);

// // Date
// const currentDate = new Date();
// console.log(currentDate.getDay());

// const date = new Date("2023-01-25");
// console.log(date.getDay());
function getLearnersData(courseInfo, ag, submissions) {
  const result = [];
  const newStudent = {};
  submissions.forEach((submission) => {
    const learner_id = submission.learner_id;
    const assignment_id = submission.assignment_id;
    const score = submission.submission.score;
    const submitted_at = new Date(submission.submission.submitted_at);
    const maxPoints = ag.assignments.find((assignment)=> assignment.id == assignment_id).points_possible;
    const due_at = new Date (ag.assignments.find((assignment) => assignment.id == assignment_id).due_at);
    const currentDate = new Date();
    if (!newStudent[learner_id]) {
      newStudent[learner_id] = {
        id: learner_id,
        avgScore: 0,
        maxPoints: 0,
        assignmentScore: {}
      }
    }
    let penalty = 0;
    if (submitted_at > due_at) {
      penalty = maxPoints * .1;
    }
    if (due_at > currentDate) {
      return;
      
    }

    newStudent[learner_id].assignmentScore[assignment_id] = ((score - penalty)/ maxPoints).toFixed(2);
    newStudent[learner_id].avgScore += score - penalty;
    newStudent[learner_id].maxPoints += maxPoints;
  })

    for (const students in newStudent) {
      const student = newStudent[students];
      const avg = Number(student.avgScore / student.maxPoints);
      // console.log(student.avgScore);
      console.log( student.maxPoints);
      result.push({id: student.id, avg, assignmentScore: student.assignmentScore});


    }
    return result;
  };
  

const results = getLearnersData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log(results);