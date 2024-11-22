
import React, { useEffect, useState } from "react";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { db } from "../../firebase-config";
import { useNavigate, useParams } from "react-router-dom";

const DocEditor = () => {
  const { docId } = useParams();
  const [job, setJob] = useState("");
  const [skills, setSkills] = useState(""); 
  const navigate = useNavigate();

 
  useEffect(() => {
    const fetchDoc = async () => {
      if (docId) {
        try {
          const docRef = doc(db, "Docs", docId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setJob(data.Job || "");
            setSkills(data.Skills || "");
          } else {
            alert("Document does not exist.");
          }
        } catch (error) {
          console.error("Error fetching document:", error);
          alert("Failed to fetch document data.");
        }
      }
    };

    fetchDoc();
  }, [docId]);

  const handleSave = async () => {
    if (!job.trim() || !skills.trim()) {
      alert("Please fill in both Job and Skills fields before saving.");
      return;
    }
  
    const cleanHtml = (html) => {
      return html.replace(/<\/?[^>]+(>|$)/g, "").trim();
    };
  
    try {
      const docRef = doc(db, "Docs", docId);
      await updateDoc(docRef, {
        Job: cleanHtml(job),
        Skills: cleanHtml(skills),
      });
  
      alert("Document updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error updating document:", error);
      alert("Failed to update document. Please try again.");
    }
  };
  

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Edit Document</h2>
      
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Field</th>
              <th>Content</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <label htmlFor="job" className="form-label">
                  Job
                </label>
              </td>
              <td>
                <ReactQuill
                  theme="snow"
                  value={job}
                  onChange={setJob}
                  placeholder="Enter the job title..."
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="skills" className="form-label">
                  Skills
                </label>
              </td>
              <td>
                <ReactQuill
                  theme="snow"
                  value={skills}
                  onChange={setSkills}
                  placeholder="Enter the skills..."
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="text-center mt-4">
        <button onClick={handleSave} className="btn btn-primary">
          Save Document
        </button>
      </div>
    </div>
  );
};

export default DocEditor;
