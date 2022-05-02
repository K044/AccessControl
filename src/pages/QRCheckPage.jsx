import React, {useState} from 'react'
import { Navbar } from '../components/Navbar'
import {Fab, TextField, TextareaAutosize, Grid} from '@material-ui/core'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from "firebase/firestore";
import { db } from '../utils/init-firebase'

function QRCheckPage() {
    const { id } = useParams();
    const [number, setNumber] = useState('')
    const [faculty, setFaculty] = useState('')
    const getData = async () => {
        const docRef = doc(db, "qrcodes", id);
        const docSnap = await getDoc(docRef);
        setNumber(docSnap.data().number);
        setFaculty(docSnap.data().faculty);
    }
    getData()
    
    return (
        <div>
        <Navbar/>
        <br></br>
        <p>Classroom number: {number}</p>
        <br></br>
        <p>Faculty number: {faculty}</p>
      </div>
      
    );
  }
  
  export default QRCheckPage;