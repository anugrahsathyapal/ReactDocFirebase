
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { db } from "../../firebase-config";

const DocAdd = () => {
  const [job, setJob] = useState(""); 
  const navigate = useNavigate();

  const handleAddDoc = async () => {
    const sanitizedJob = job.replace(/<\/?[^>]+(>|$)/g, "").trim(); 

    if (!sanitizedJob) {
      alert("Please enter a value for Job");
      return;
    }

    try {
     
      await addDoc(collection(db, "Docs"), {
        Job: sanitizedJob,
      });

      alert(`Document with Job ${sanitizedJob} added!`);
      setJob(""); 
      navigate("/"); 
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Add New Document</h2>

 
      <div className="mb-3">
        <label htmlFor="job" className="form-label">
          Job
        </label>
        <ReactQuill
          id="job"
          theme="snow"
          value={job}
          onChange={(value) => setJob(value)}
          placeholder="Enter Job"
        />
      </div>


      <button onClick={handleAddDoc} className="btn btn-primary">
        Save Document
      </button>
    </div>
  );
};

export default DocAdd;
