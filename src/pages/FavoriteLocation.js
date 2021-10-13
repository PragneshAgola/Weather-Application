import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Students = () => {
  const [students, setStudents] = useState([]);
  const studentsCollectionRef = collection(db, "student");

  const getStudents = async () => {
    const response = await getDocs(studentsCollectionRef);

    setStudents(
      response.docs.map((setData) => ({ ...setData.data(), id: setData.id }))
    );
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <React.Fragment>
      {students.map((getData) => {
        return (
          <div style={{ fontSize: "20px" }} key={getData.id}>
            <ul>
              <li style={{ listStyle: "none" }}>
                Weather Country: {getData} <br />
                Student Percentage: {getData}
              </li>
            </ul>
          </div>
        );
      })}
    </React.Fragment>
  );
};

export default Students;
