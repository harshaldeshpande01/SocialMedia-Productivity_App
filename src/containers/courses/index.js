import React, { useState, useEffect } from "react";
import "./style.css";
import { Course } from "..";
import { db } from "../../firebase";

export default function Courses( {currentUser} ) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    db.collection("courses").onSnapshot((snapshot) => {
      // snapshot.docs.orderBy("semester");
      setCourses(snapshot.docs.map((doc) => ({ id: doc.id, course: doc.data() })));
    });
    // setCourses(courses.sort((a, b) => {return a.semester - b.semester}))
    // console.log(courses)
  }, []);
  return (
    <>
    <div className="courses">
      {courses.map(({ id, course }) => {
        return (
          <Course
            currentUser = {currentUser}
            key={id}
            id={id}
            course_name={course.course_name}
            course_type={course.course_type}
            semester={course.semester}
            professor={course.professor}
            comments={course.comments}
            username={course.username}
            rating={course.rating}
          />
        );
      })}
    </div>
    </>
  );
}
