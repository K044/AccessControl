import React, {useState} from 'react'
import { Navbar } from '../components/Navbar'
import {Fab, TextField, TextareaAutosize, Grid} from '@material-ui/core'
import { useParams } from 'react-router-dom'
import { doc, getDoc, collection, query, where, getDocs, setDoc } from "firebase/firestore";
import { db, auth } from '../utils/init-firebase'
import { Button, GridItem,chakra, Container, Heading, Box, Center, Text, Table, Th, Tr, Tbody, Td, TableContainer } from '@chakra-ui/react'
import { Layout } from '../components/Layout'
import { render } from '@testing-library/react';

var logged = false;

function QRCheckPage() {
    let todayDate = new Date().toISOString().replace(/T.*$/, '')
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes();
    const { id } = useParams();
    const [accessGranted, setAccess] = useState(null);
    const getData = async () => {
        const docRef = doc(db, "qrcodes", id);
        const docSnap = await getDoc(docRef);
        auth.onAuthStateChanged(async function(user) {
          if(user) {
            const q = query(collection(db, "events"), where("uid", "==", user.uid), where("date", "==", todayDate));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            if(doc.data().location.includes(docSnap.data().number) && doc.data().location.includes(docSnap.data().faculty)) {
              if(doc.data().startTime < time && time < doc.data().endTime) {
                setAccess(true);
                console.log(docSnap.data().number);
              }
            }
          });
          if(accessGranted && !logged) {
            logged = true;
            await setDoc(doc(db, "attendance", (Math.random() + 1).toString(36).substring(5)), {
              uid: user.uid,
              date: todayDate,
              time: time,
              classroom: docSnap.data().number,
              faculty : docSnap.data().faculty
            });
          }
        }}
        )
        if(accessGranted == null) {
          setAccess(false);
        }
    }
    getData()
    if(accessGranted == null) {
      return <Layout></Layout>;
    }
    if(accessGranted) {
      return (
        <Layout>
            <Heading color='green'>Access Granted</Heading>
      </Layout>
      )
    }
    else if(accessGranted == false) {
      return (
        <Layout>
            <Heading color='red'>Access Denied</Heading>
      </Layout>
      )
    }
}
  export default QRCheckPage;