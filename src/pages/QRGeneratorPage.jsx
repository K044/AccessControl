import React, {useState} from 'react'
import { Navbar } from '../components/Navbar'
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '../utils/init-firebase'
import { useHistory } from 'react-router-dom'

function QRgenerator() {
    const history = useHistory();
    const [number, setNumber] = useState("");
    const [faculty, setFaculty] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();
        var md5 = require('md5');
        const timestamp = Date.now();
        const id = md5(timestamp).substring(0, 13)
        setDoc(doc(db, "qrcodes", id), {
            number: number,
            faculty: faculty
        });
        history.push('/qrcode/'+id)
      }
    return (
        <div>
            <Navbar />
            <form onSubmit={handleSubmit}>
                <label>Classroom number: 
                    <input
                    type="number" 
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    />
                </label>
                <br></br>
                <br></br>
                <label>Faculty number: 
                    <input
                    type="number" 
                    value={faculty}
                    onChange={(e) => setFaculty(e.target.value)}
                    />
                </label>
                <br></br>
                <br></br>
                <input type="submit" value="Submit" />
            </form>
        </div>
      
    );
  }
  
  export default QRgenerator;