"use client"
import Image from "next/image";
import { useState, useEffect } from "react";
import { firestore } from "@/firebase"
import { Box, Button, Container, Modal, Stack, TextField, Typography, rgbToHex } from "@mui/material";
import { DocumentReference, collection, deleteDoc, getDoc, getDocs, query, setDoc, doc } from "firebase/firestore";


export default function Home() {
  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState(false)
  const [itemName, setItemName] = useState("")

  const updateInventory = async() => {
    const snapshot = query(collection(firestore, "Inventory"))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() })
    })
    setInventory(inventoryList)
  }


  //Fucntions for adding and removing items
  //Removing Fucntion
  const removeItem = async(item) =>{
    const docRef = doc(collection(firestore, "Inventory"), item)
    const docSnap = await getDoc(docRef)
    
    if(docSnap.exists()){
      const {quantity} = docSnap.data()
      if (quantity === 1){
        await deleteDoc(docRef)
      }
      else{
        await setDoc(docRef, {quantity: quantity - 1} )
      }
    }

    await updateInventory()
  }

  //Adding Functions
  const addItem = async(item) =>{
    const docRef = doc(collection(firestore, "Inventory"), item)
    const docSnap = await getDoc(docRef)
    
    if(docSnap.exists()){
      const {quantity} = docSnap.data()
        await setDoc(docRef, {quantity: quantity + 1} )
      
    }
    else {
      await setDoc(docRef, {quantity: 1})
    }

    await updateInventory()
  }

  //This will make sure that while updateding ourt page doesnn't freeze
  //Works with aysnc
  useEffect(() => {
    updateInventory()
  }, [])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
  <Box sx={{
    backgroundImage:"url(https://images.unsplash.com/photo-1565015392272-745549aa4abe?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
   
  }}>
    
  <Box 
    sx={{
        backgroundColor: '#ff7575', 
        borderRadius: '16px',  // Makes the edges round
        padding: 5,
        marginTop: "50px",
        border: "2px solid white",
        boxShadow: "0px 5px 10px rgba(255, 255, 255)",
        transition: 'all 0.3s ease',  // Smooth transition for hover effect
        '&:hover': {
          backgroundColor: '#ff4f4f',  // Changes background color on hover
          boxShadow: '0px 6px 30px rgba(255,255,255)',  // Increases shadow on hover
        },
    }}  
  >

  <Typography 
    variant="h1"
    sx={{
      fontFamily:"monospace",
      color: "white"
    }}
    >The Pantry App</Typography>

  </Box>



  <Box width= "100vw" height= "100vw" display="flex" 
  justifyContent= "center" alignItems="center" gap={2} flexDirection= "column"
  
  >
      <Modal open = {open} onClose={handleClose}>
          <Box
            position="absolute" top = "50%" left="50%"
            width={400}
            bgcolor= "white"
            border= "2px solid #533"
            boxShadow={24}
            borderRadius= '16px'
            p={4}
            display="flex"
            flexDirection="column"
            gap = {3}
            sx={{
              transform: "transform(-50%,-50%)"
            }}
          >
              <Typography variant="h6">Add Item</Typography>
              <Stack width="100%" direction="row" spacing={2}>
                  <TextField 
                  variant="outlined"
                  fullWidth
                  value={itemName}
                  onChange={(e)=>
                    setItemName(e.target.value)
                  }
                  />
                  <Button
                    variant="outlined"
                    onClick={() => {
                      addItem(itemName)
                      setItemName('')
                      handleClose()
                    }}
                    >Add</Button>
              </Stack>
          </Box>
      </Modal>
      <Button variant="contained" onClick={() => {
        handleOpen()

      }
    }
      >
        Add a New Item
      </Button>
      <Box>
        <Box width="800px" height= "100px" bgcolor= "#ed6b83" 
        justifyContent="center" display="flex" borderRadius={'16px'} 
        marginBottom={'10px'} sx={{
          boxShadow: '0px 5px 10px rgba(255, 255, 255)',
          border: "2px Solid white"
        }}
        >
            <Typography variant="h2" color="white" 
            fontFamily = 'monospace'> Inventory Items</Typography>
        </Box>
      
      <Stack
        width="800px"
        height="300px"
        spacing={2}
       
      >
        {
          inventory.map(({name, quantity})=>(
            <Box key={name} width="100%" 
            minHeight="150px" 
            display="flex" 
            alignItems="center"
            justifyContent="space-between"
            bgcolor="#f0f0f0"
            padding={5}
            borderRadius={'16px'}
        
            >
                <Typography variant="h3" color="#333" textAlign="center">

                    {name.charAt(0).toUpperCase() + name.slice(1)}

                </Typography>
                <Typography variant="h3" color="#333" textAlign="center">

                    {quantity}

                </Typography>
                <Stack direction="row" spacing={2}>
                  <Button variant="contained" onClick={() => {
                    addItem(name)
                  }}>
                      Add
                  </Button>
                  <Button variant="contained" onClick={() => {
                    removeItem(name)
                  }}>
                      Remove
                  </Button>
                </Stack>
            </Box>
          ))
        }

      </Stack>
      </Box>
  </Box>
  </Box>
  )
}
