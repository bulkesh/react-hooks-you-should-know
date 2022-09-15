import {ReactElement, useContext} from 'react';
import { Navbar, Nav, Button} from 'react-bootstrap';
import { Link , NavLink } from 'react-router-dom';
import { themeContext } from '../utils/Theme';

export function AppNavbar(): ReactElement {
    const {style, setStyle} = useContext(themeContext);
    const isCursive = style?.fontFamily === 'cursive';

    return (
        <Navbar bg='dark' variant='dark'>
            <Navbar.Brand as={Link} to="/">
                React Hooks for Props
            </Navbar.Brand>
            <Nav className='me-auto'>
                <Nav.Link as={NavLink} to="/person-editor">
                    Person Editor
                </Nav.Link> 
                <Nav.Link as={NavLink} to="/counter">
                    Counter
                </Nav.Link> 
                <Nav.Link as={NavLink} to="/user-editor">
                    User Editor
                </Nav.Link> 
                <Nav.Link href='https://formik.org/docs/api/formik' target="formilk">
                    Formilk
                </Nav.Link> 
            </Nav>
            <Nav>
                <Nav.Link 
                className="justify-content-end" 
                as={Button}
                onClick={()=>{
                    setStyle({ fontFamily: isCursive ? 'inhirit' : 'cursive' });
                }}>
                    {isCursive ? "Normal" : "Cursive"}
                </Nav.Link>
            </Nav>

        </Navbar>
    )
}