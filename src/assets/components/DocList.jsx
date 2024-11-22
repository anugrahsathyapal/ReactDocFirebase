import React, { useEffect, useState } from "react";
import { collection, getDocs as fetchDocs, deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase-config";

const DocList = () => {
  const [documents, setDocuments] = useState([]);
  const documentsCollection = collection(db, "Docs");
  const navigate = useNavigate();

  const getDocuments = async () => {
    const data = await fetchDocs(documentsCollection);
    console.log(data);
    setDocuments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const del = async (id, job) => {
    try {
      await deleteDoc(doc(db, "Docs", id));
      setDocuments(documents.filter((document) => document.id !== id));
      alert(`Document with Job ${job} deleted!`);
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  useEffect(() => {
    getDocuments();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-evenly align-items-center flex-wrap">
        {documents.map((doc) => (
          <div key={doc.id} className="border border-black border-3 rounded-4 p-3 w-25 d-flex flex-column align-items-center ms-5 mt-5">
            <h1 className="text-center mb-3">{doc.Job}</h1>
            <p className="text-justify">
              {doc.Skills ? doc.Skills : 'No content'}
            </p>
            <div>
              <button className="btn btn-info me-2" onClick={() => navigate(`/edit/${doc.id}`)}>Edit</button>
              <button className="btn btn-danger" onClick={() => del(doc.id, doc.Job)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DocList;
