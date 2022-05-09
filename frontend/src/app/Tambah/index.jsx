import {Form, Row, Button, Col, Card, Container} from 'react-bootstrap';
import {useEffect, useState} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Tambah = () => {

  const [name, setName] = useState(``);
  const [category, setCategory] = useState(``);
  const [cek, setCek] = useState(``)
  const [error, setError] = useState(false);
  const history = useHistory();

  const [itemCategori, setCategori] = useState([]);
  
  
  useEffect(()=>{
       getCategori();

  }, [] );

  const getCategori = async () => {
    const response = await axios.get(`http://localhost:5000/api/categories`);
    setCategori(response.data);
    console.log(response);
  }
  
  const saveProduct = async (e) => {
  e.preventDefault();

  if(name.length < 3 || name === "" || name === itemCategori){
    setError(true)
    return false;
  }
  else if(category === ""){
    setError(true)
    return false;
  }
    
  const data = new FormData();
  data.append(`name`, name);
  data.append(`category`, category);

  
    await axios.post(`http://localhost:5000/api/products/`, data)
  .then(() => {
    history.push(`/`);
  })
  .catch((error)=> {
    console.log(error);
  })
};


  return (
    <div>

    <Container  style={{width: '50%', marginTop: '150px '}}>
    <Card>
        <Card.Header>Registration</Card.Header>
        <Card.Body>
          <Form >
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridName">
                <Form.Label>Nama</Form.Label>
                <Form.Control 
                  type="text"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                  type="email" 
          
                />
              </Form.Group>
              
            </Row>

                  {/* row/ baris baru */}
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="Password" 
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPasswordConfirmation">
                <Form.Label>Konfirmasi Password</Form.Label>
                <Form.Control 
                  type="password" 
                />
              </Form.Group>
            </Row>

            <Button variant="primary" type="submit" >
                  Simpan
            </Button>
          </Form>
        </Card.Body>
      </Card>
      </Container>


<div className='container' style={{width:"80%"}}>
  <div className='card'>
      <div className='card-header'>Header</div>
        <div className='card-body'>
          <form onSubmit={saveProduct} autoComplete="off" >
          <div className='row'>
              <div className="form-group col">
                <label >Name</label>
                <input type="text" name="name" className="form-control" placeholder="Enter name"  onChange={ (event) => {
                  const {value} = event.target;
                  setName(value); }} />
                <small className="form-text text-danger"> 
                  {
                  error && name === "" &&  `nama tidak boleh kosong` || 
                  error && name.length < 3 &&  `nama minimal 3 karakter` ||
                  error && name === cek && `nama sudah terdaftar`
                  } 
                 </small>
              </div>

              <div className="form-group col">
                <label >Kategori</label> <br/>
                
                <select className='form-control' defaultValue={`Default`} onChange={ (event) => {
                  const {value} = event.target;
                  setCategory(value);
                  }}>

                      <option value="Default" disabled >--Pilih--</option>
                  {
                    itemCategori.map && itemCategori.map((categories, i) => (
                      <option style={{color: categories.name === "Food" ? "red" : ``}} disabled={ categories.name === "Food" ? `disabled` : ``}  key={i} value={categories.name} > {categories.name === "Food" ? `stok kosong` : categories.name} </option>
                  ))
                  }
                   </select>
                <small className="form-text text-danger">
                {
                  error && category === "" &&  `silahkan pilih category` 
                
                  } 
                  </small>
              </div>
            </div>

          <div className='row'>
            <div className="form-group col-md-6">
              <label >Password</label>
              <input type="password" className="form-control"  placeholder="Password" />
            </div>
          </div>
         
            <div className="form-check">
             
              <label className="form-check-label">Check me out 
             
              </label>
              <input type="checkbox" style={{marginLeft:"10px"}} />
            </div>
          
            <button type="submit" className="btn btn-primary mt-3">Submit</button>
      </form>

      </div>
    </div>
</div>            
                  {/* <div>
                  {
                    itemCategori.map && itemCategori.map((categories, i) => (
                      <div> {categories.name}  </div>
                  ))
                  }
                  </div> */}

{cek}

    </div>
  )
}

export default Tambah;