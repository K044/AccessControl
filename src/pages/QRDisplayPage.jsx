import React, {useState} from 'react'
import { Navbar } from '../components/Navbar'
import {Fab, TextField, TextareaAutosize, Grid} from '@material-ui/core'
import {ArrowBack, GetApp} from '@material-ui/icons'
import { Link } from "react-router-dom";
import QRcode from 'qrcode.react'
import { useParams } from 'react-router-dom'

function QRDisplayPage() {
    const { id } = useParams();
    const link = 'https://localhost:3000/qrcode/'+id
    const [qr, setQr] = useState(link);
    const handleChange = (event) => {
        setQr(event.target.value);
    };
    const downloadQR = () => {
        const canvas = document.getElementById("myqr");
        const pngUrl = canvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "myqr.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };
    return (
        <div>
        <Navbar/>
        <div className="App-header-modified">
          
          
            <Link to="/">
            <Fab style={{marginRight:10}} color="primary">
                <ArrowBack/>
            </Fab>
            </Link>
            <span>Generated QR code</span>
            
            <div style={{marginTop:30}}>
                <TextField onChange={handleChange} style={{width:320}}
                value={qr} label="QR content" size="large" variant="outlined" color="primary" 
                />
            </div>

            <div>
                {
                    qr ?
                    <QRcode 
                        id="myqr"
                        value={id} 
                        size={320}
                        includeMargin={true}
                    /> :
                    <p>No QR code preview</p>
                }
            </div>
            <div>
                {
                    qr ? 
                    <Grid container>
                        <Grid item xs={10}>
                        <TextareaAutosize
                            style={{fontSize:18, width:250, height:100}}
                            rowsMax={4}
                            defaultValue={qr}
                            value={qr}
                        />
                        </Grid>
                        <Grid item xs={2}>
                        <Fab onClick={downloadQR} style={{marginLeft:10}} color="primary">
                            <GetApp/>
                        </Fab>
                        </Grid>
                    </Grid> :
                    ''
                }
            </div>
      </div>
      </div>
      
    );
  }
  
  export default QRDisplayPage;