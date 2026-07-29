import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import placeholderImage from "./../assets/placeholder.png";

// Import the string from the .env with URL of the API/server - http://localhost:5005
const API_URL = import.meta.env.VITE_API_URL;


function StudentDetailsPage() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const { studentId } = useParams();

  useEffect(() => {
    const getStudent = () => {
      axios
        .get(`${API_URL}/api/students/${studentId}`)
        .then((response) => {
          const oneStudent = response.data;
          setStudent(oneStudent);
          setLoading(false);
        })
        .catch((error) => console.log(error));
    };

    getStudent();
  }, [studentId]);
  
  if (loading) return <div>Loading...</div>;

  const linkedInUrl = student?.linkedinUrl || student?.linkedInURl;
  const languages = Array.isArray(student?.languages) ? student.languages : [];
  const program = Array.isArray(student?.program) ? student.program.join(", ") : student?.program || "";
  const projects = Array.isArray(student?.projects) ? student.projects : [];
  const cohortId = typeof student?.cohort === "object" ? student?.cohort?._id : student?.cohort;
  const cohortName = typeof student?.cohort === "object" ? student?.cohort?.cohortName : student?.cohort;

  return (
    <div className="StudentDetailsPage bg-gray-100 py-6 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md mb-6">
        {student && (
          <>
            {/* <img className="w-32 h-32 rounded-full object-cover mb-4" src={student.image} alt="profile-photo" /> */}
            <img
            src={student.image || placeholderImage}
            alt="profile-photo"
            className="rounded-full w-32 h-32 object-cover border-2 border-gray-300"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = placeholderImage;
            }}
          />            
            <h1 className="text-2xl mt-4 font-bold absolute">{student.firstName} {student.lastName}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-24 mb-4 border-b pb-4">
              <p className="text-left mb-2 border-b pb-2">
                <strong>Email:</strong> {student.email}
              </p>
              <p className="mb-2 text-left">
                <strong>Phone:</strong> {student.phone}
              </p>
              <p className="text-left mb-2 border-b pb-2">
                <strong>LinkedIn:</strong> {linkedInUrl || "N/A"}
              </p>
              <p className="text-left mb-2 border-b pb-2">
                <strong>Languages:</strong> {languages.length ? languages.join(", ") : "N/A"}
              </p>
              <p className="text-left mb-2 border-b pb-2">
                <strong>Program:</strong> {program || "N/A"}
              </p>
              <p className="text-left mb-2 border-b pb-2">
                <strong>Background:</strong> {student.background}
              </p>
              <p className="text-left mb-2 border-b pb-2">
                <strong>Cohort:</strong>
                {cohortId ? (
                  <Link className="ml-2 text-blue-500 hover:underline" to={`/cohorts/details/${cohortId}`}>
                    {cohortName || cohortId}
                  </Link>
                ) : (
                  <span className="ml-2">N/A</span>
                )}
              </p>
              {projects.length > 0 && (
              <p className="text-left mb-2 border-b pb-2">
                <strong>Projects:</strong> {projects.join(", ")}
              </p>
              )}
            </div>
            <div className="mt-4">
              <Link to={`/students/edit/${student._id}`}>
                <button className="text-white px-4 py-2 rounded bg-green-500 hover:bg-green-600 transition duration-300 ease-in-out">
                  Edit
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
      
    </div>
  );
}

export default StudentDetailsPage;