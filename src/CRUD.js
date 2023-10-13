import React,{useState,useEffect, Fragment} from "react";
import Table  from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import { ToastContainer,toast } from "react-toastify"; 
import 'react-toastify/dist/ReactToastify.css';

const CRUD=()=>{
     const handleActiveChange=(e)=>{
        if(e.target.checked){
       setisActive(1);
        }
        else{
         setisActive(0);
       }
  
      }

      const handleEditActiveChange=(e)=>{
           if(e.target.checked){
            setEditisActive(1);
           }

        else{
          setEditisActive(0);
          }
    
      }
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [name, setName]=useState('');
    const [Age, setAge]=useState('');
    const [isActive, setisActive]=useState(0);

    const [editID,setEditId] =useState('');
    const [editname, setEditname]=useState('');
    const [editAge, setEditAge]=useState('');
    const [isEditActive, setEditisActive]=useState(0);
  

    //const empdata=[
     //   {
      //      id : 1,
      //      name : 'khulekani',
     //       age : 28,
     //       isActive : 1
     //   },
     //   {
     //       id : 2,
      //      name : 'Scina',
      //      age : 30,
      //      isActive : 1
      //  },
      //  {
      //      id : 3,
      //      name : 'Bayanda',
      //      age : 45,
      //      isActive : 0
      //  }
       
    //]
const baseUrl='https://localhost:7006/api/Employee';
    const [data ,setData]= useState([]);
    useEffect(()=>{
      getData(data);
    },[])

    const getData=()=>{
  
      axios.get('https://localhost:7006/api/Employee')
      .then((result)=>{
        setData(result.data)
        
      })
      .catch((error)=>{
        console.log(error)
      })
    }


    const handleEdit=(id)=>{

    handleShow();
    
        axios.get(`https://localhost:7006/api/Employee/${id}`)
        .then((result)=>{
          
          setEditId(id);
          setEditname(result.data.name);
          setEditAge(result.data.age);
          setEditisActive(result.data.isActive);
    })
   
   

     }
const handleDelete=(id)=>{

 
   if(window.confirm("are you sure you want to delete this employee")==true){
      axios.delete(`https://localhost:7006/api/Employee/${id}`)
      .then((results)=>{
        
        if(results.status=200){
          toast.success('Employee has been succesfully deleted');
          getData();
        }
        
      })
    }
    
}

const handleUpdate =()=>{
  const url=`https://localhost:7006/api/Employee/${editID}`;
   
  const data ={
      "id": editID,
      "name": editname,
      "age": editAge,
      "isActive": isEditActive
  }
  
  axios.put(url, data).then((result)=>{
    getData();
    handleClose();
    clear();
    toast.success(`Employee ${data.name} has been modified`);
  })
}
const handleSave= ()=>{
  const url='https://localhost:7006/api/Employee';

  const data ={
    
      "name": name,
      "age": Age,
      "isActive": isActive
  }

  axios.post(url, data)
  .then((result)=>{
    getData();
    clear();
    toast.success('Employee has been added');
  })
}
const clear =()=>{
  setName('');
  setAge('');
  setisActive(0);

  setEditname('');
  setEditAge('');
  setEditisActive(0);
  setEditId('');
}



    return(
      <Fragment>
        <ToastContainer/>
            <Container>
              
                 <Row>
                    <Col>
                       <input type="text" className="form-control" placeholder="Enter Name"
                       value={name} onChange={(e)=>setName(e.target.value)}/>
                    </Col>
                        <Col><input type="text" className="form-control" placeholder="Enter Age"
                        value={Age} onChange={(e)=>setAge(e.target.value)}/>
                    </Col>
                    <Col>
                       <input type="checkbox" 
                       checked={isActive == 1 ? true :false}
                       onChange={(e)=> handleActiveChange(e)} value={isActive}
                       />
                       <label>isActive</label>
                    </Col>
                    <Col>
                       <button className="btn btn-primary" onClick={()=>handleSave()}>Submit</button>
                    </Col>
                    
                </Row>
            </Container>
    <br></br>
<Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Age</th>
          <th>isActive</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          
            data && data.length > 0 ?
            data.map((item,index)=>{
                return(
                <tr key={index}>
                    <td>{index+ 1}</td>
                   <td>{item.name}</td>
                   <td>{item.age}</td>
                    <td>{item.isActive}</td>
                    <td colSpan={2}>
                        
                        <button className="btn btn-primary" onClick={()=>handleEdit(item.id)}>Edit</button> &nbsp;
                        <button className="btn btn-danger" onClick={()=>handleDelete(item.id)}>Delete</button>
                    </td>
                </tr>
                )
            })
            :
            'Loading ...'
        }
        
      
       
      </tbody>
    </Table>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modify / update Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row>
        <Col>
                    <input type="text" className="form-control" placeholder="Enter Name"
                       value={editname} onChange={(e)=>setEditname(e.target.value)}/>
                    </Col>
                        <Col><input type="text" className="form-control" placeholder="Enter Age"
                        value={editAge} onChange={(e)=>setEditAge(e.target.value)}/>
                    </Col>
                    <Col>
                    <input type="checkbox" 
                       checked={isEditActive == 1 ? true :false}
                       onChange={(e)=> handleEditActiveChange(e)} value={isEditActive}
                       />
                       <label>isActive</label>
                    </Col>
                    
                    
                </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </Fragment>
    )
}

export default CRUD;