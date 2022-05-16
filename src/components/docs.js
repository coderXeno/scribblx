import React, { useEffect, useRef, useState } from "react";
import { getFirestore, addDoc, collection, onSnapshot } from "firebase/firestore";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from "@mui/material";

export default function Docs({database}){
    const [open, setOpen] = useState(false);
    const [title,setTitle] = useState('');
    const [docsData,setDocsData] = useState([]);

    const handleOpen = () => setOpen(true);

    const collectionRef = collection(database,'docsData');

    const addData = () => {
       addDoc(collectionRef, {
           title: title
       }) 
       .then(() => {
           toast.success('New Note Added',{
               autoClose: 2000
           })
       })
       .catch((err) => {
           console.log(err);
           toast.error('Couldnt Add Note',{
               autoClose: 2000
           })
       })
    }

    const getData = () => {
        onSnapshot(collectionRef, (data) => {
            setDocsData(data.docs.map((doc)=>{
                return {
                    ...doc.data(),
                    id: doc.id
                }
            }))
        })
    }

    const isMounted = useRef();

    useEffect(() => {
        if(isMounted.current){
            return
        }

        isMounted.current = true;
        getData();
    },[]);

    let navigate = useNavigate();

    const getID = (id) => {
        navigate(`/editDocs/${id}`);
    }

    return(
        <Container maxWidth="sm">
            <div className="docs-main">
                <ToastContainer/>
                <h1><span className="name">ScribblX</span></h1>

                <button 
                    className="add-doc"
                    onClick={handleOpen}
                >
                    <span className="plus">+</span>
                </button>

                <Modal
                open={open}
                setOpen={setOpen}
                title={title}
                setTitle={setTitle}
                addData={addData}
                />

                <div className="grid-main">
                    {
                        docsData.map((doc,index)=>{
                            return(
                                <div 
                                    key={index}
                                    className="grid-child"
                                    onClick={() => getID(doc.id)}
                                >
                                    <p>{doc.title}</p>
                                    <div dangerouslySetInnerHTML={{__html: doc.docsDesc}} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </Container>
    )
}