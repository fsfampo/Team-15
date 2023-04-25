import React, { useState } from "react";
import { Dbchart } from "./Dbchart";
import { Card } from "react-bootstrap";

function Metrics(){
    return(
        <>
        
        <div style={{marginLeft:'20px'}}>
        <h1>Analytics</h1>
        </div>
        
        <div style={{display:'flex',justifyContent:'space-between'}}>
        <Card style={{width:"250px", height:"150px",overflow:'scroll',backgroundColor:'#d5dee8',display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <Card.Body>
                    <Card.Title style={{ fontSize:'25px', color:'black'}}>Admin</Card.Title>
                    <Card.Text>
                         <h2>1</h2>
                    </Card.Text>
                    </Card.Body>
                </Card>
                <Card style={{width:"250px", height:"150px",overflow:'scroll',backgroundColor:'#d5dee8',display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <Card.Body>
                    <Card.Title style={{ fontSize:'25px', color:'black'}}>No. of Meal Plans</Card.Title>
                    <Card.Text>
                         <h2>4</h2>
                    </Card.Text>
                    </Card.Body>
                </Card>
                <Card style={{width:"250px", height:"150px",overflow:'scroll',backgroundColor:'#d5dee8',display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <Card.Body>
                    <Card.Title style={{ fontSize:'25px', color:'black'}}>No. of Meals</Card.Title>
                    <Card.Text>
                         <h2>7</h2>
                    </Card.Text>
                    </Card.Body>
                </Card>
                <Card style={{width:"250px", height:"150px",overflow:'scroll',backgroundColor:'#d5dee8',display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <Card.Body>
                    <Card.Title style={{ fontSize:'25px', color:'black'}}>No. of Routines</Card.Title>
                    <Card.Text>
                         <h2>8</h2>
                    </Card.Text>
                    </Card.Body>
                </Card>
                <Card style={{width:"250px", height:"150px",overflow:'scroll',backgroundColor:'#d5dee8',display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <Card.Body>
                    <Card.Title style={{ fontSize:'25px', color:'black'}}>No. of Workouts</Card.Title>
                    <Card.Text>
                         <h2>12</h2>
                    </Card.Text>
                    </Card.Body>
                </Card>
                
                </div>
                <div style={{display:'flex',marginTop:'30px'}}>
                <Card style={{width:"250px", height:"150px",overflow:'scroll',backgroundColor:'#d5dee8',marginRight:'45px',display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <Card.Body>
                    <Card.Title style={{ fontSize:'25px', color:'black'}}>Trainers</Card.Title>
                    <Card.Text>
                         <h2>52</h2>
                    </Card.Text>
                    </Card.Body>
                </Card>
                <Card style={{width:"250px", height:"150px",overflow:'scroll',backgroundColor:'#d5dee8',display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <Card.Body>
                    <Card.Title style={{ fontSize:'25px', color:'black'}}>Users</Card.Title>
                    <Card.Text>
                         <h2>275</h2>
                    </Card.Text>
                    </Card.Body>
                </Card>
                </div>
                <div style={{paddingBottom:'50px'}}>
                <Dbchart/>
                </div>
                        

        </>

    );
}
export default Metrics;