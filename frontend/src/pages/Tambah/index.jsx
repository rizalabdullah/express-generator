
import Input from '../../components/Input';
import './index.scss';
import {useState} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Tambah = () => {
  
 
  const [name, setName] = useState(``);
  const [price, setPrice] = useState(``);
  const [stock, setStock] = useState(``);
  const [image, setImage] = useState(``); 
  const [error, setError] = useState(false);
  const history = useHistory();
  
  const saveProduct = async (e) => {
  e.preventDefault();

      console.warn(!name);
      if(name.length < 3 || name == ""){
        setError(true)
        return false;
      }
      else if(!price){
        setError(true)
        return false;
      }

  const data = new FormData();
  data.append(`name`, name);
  data.append(`price`, price);
  data.append(`stock`, stock);
  data.append(`image`, image);
  
    await axios.post(`http://localhost:5000/api/v3/product/`, data)
  .then(() => {
    history.push(`/`);
  })
  .catch((error)=> {
    console.log(error);
  })
};


  return (
    <div className="main">
      <div className="card">
        <h2>Tambah Produk</h2>
        <br />
        <form onSubmit={saveProduct} autoComplete="off">
    
          <Input name="name" type="text" placeholder="Nama Produk..." label="Nama"  onChange={ (event) => {
           
            setName(event.target.value);
          }}/>

          {error && name == "" &&  <span style={{marginBottom:"5px"}}>nama tidak boleh kosong</span> || error && name.length < 3 &&  <span>nama minimal 3 karakter</span>}

          <Input name="price" type="number" placeholder="Harga Produk..." label="Harga"  onChange={(event) => {
            const {value} = event.target;
            setPrice(value);
          }}/>
           {error && !price &&  <span>price tidak boleh kosong</span>}
          <Input name="stock" type="number" placeholder="Stock Produk..." label="Stock"  onChange={(event) => {
            const {value} = event.target;
            setStock(value);
          }}/>
           <Input name="image" type="file" placeholder="Gambar Produk..." label="Image"  onChange={(event) => {
            const file = event.target.files[0];
            setImage(file);
          }}/>
         
           <Input name="status" type="checkbox" label="Active" defaultChecked/>
          <button type="submit" className="btn btn-primary" >Simpan</button>

  

        </form>
      </div>
    </div>
  )
}

export default Tambah;