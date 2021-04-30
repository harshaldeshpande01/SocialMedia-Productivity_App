import React from 'react';
import {Deadlines} from '../../containers/index';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';

function deadlinesPage() {
    return (
        <div>
            <center>
            <div style={{display: 'flex', padding: '1em', width: '100%', backgroundColor: '#f3f2ef', alignItems: 'flex-end', justifyContent: 'center'}}>
                <h2 style={{color: 'black', fontSize: '2rem', fontWeight: '700'}}>SocioProd</h2>
            </div>
            <div style={{display: 'flex', width: '100%', height: '50px', backgroundColor: '#f3f2ef', alignItems: 'flex-start', justifyContent: 'center'}}>
            <Button variant='light' style={{backgroundColor: '#f3f2ef', border: 'none'}} ><Link to='/home' style={{textDecoration: 'none'}}>Home</Link></Button>
                <Button variant='light' style={{backgroundColor: '#f3f2ef', border: 'none'}} ><Link to='/courses' style={{textDecoration: 'none'}}>Courses</Link></Button>
                <Button variant='light' style={{backgroundColor: '#f3f2ef', border: 'none'}} ><Link to='/contact' style={{textDecoration: 'none'}}>Contact</Link></Button>
            </div>
            </center>
            <Deadlines />
        </div>
    );
}

export default deadlinesPage;