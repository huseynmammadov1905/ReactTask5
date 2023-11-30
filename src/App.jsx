import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  let [value,setValue] = useState('')

  let [arr,setArr] = useState([
    {
      name: "Iphone",
      price: 5000,
      description: "Phone",
      id: 1,
    },
    {
      name: "Samsung",
      price: 2000,
      description: "Phone",
      id: 2,
    },
    {
      name: "LG",
      price: 8000,
      description: "TV",
      id: 3,
    },
    {
      name: "Toshiba",
      price: 7000,
      description: "Pc",
      id: 4,
    },
    {
      name: "HP",
      price: 8500,
      description: "Pc",
      id: 5,
    },
    {
      name: "Asus",
      price: 15000,
      description: "Monitor",
      id: 6,
    },
  ])

  const [filteredArr,setFilteredArr] = useState([...arr])
  let [selectValue,setSelectValue] = useState('')
  let [priceValue,setPriceValue] = useState('')
  let [objIndex,setObjIndex] = useState(null)
  let [show,setShow] = useState(false)

  useEffect(()=>{
    setFilteredArr(arr.filter((item)=> item.name.startsWith(value)));
  },[value,arr,priceValue])

  return (
    <div className="App">

      <select onChange={(e)=>{
        setSelectValue(e.target.value)
        console.log(selectValue);
        if(selectValue === 'Increase'){
          setFilteredArr(filteredArr.sort((a,b)=> a.price - b.price));
          console.log(filteredArr)
        }
        else if(selectValue === 'Decrease'){
          setFilteredArr(filteredArr.sort((a,b)=> b.price - a.price));
          console.log(filteredArr)
        }
      }}>
        <option value='Increase'>Increase</option>
        <option value='Decrease'>Decrease</option>

      </select>

      <input onChange={(e)=>{
        setValue(e.target.value)
      }} type='text'/>

      <p>{value}</p>
      <ul>
        {filteredArr.map((item,index)=>{
          return(
            <li key={item.id}>
              <input defaultValue={item.name} disabled={true}/>
              <input defaultValue={item.description}  disabled={true}/>
              <input defaultValue={item.price}  disabled={true}/>
              <button onClick={()=>{
                let newArr  = [...arr];
                let obj = newArr.find((itemGoods)=> itemGoods.id === item.id);
                newArr.splice(newArr.indexOf(obj),1)
                setArr(newArr)
              }}>Delete</button>

<button onClick={()=>{
                
                let obj = arr.find((itemGoods)=> itemGoods.id === item.id);
                setObjIndex(arr.indexOf(obj))
                setPriceValue(obj.price)
                setShow(true)
              }}>Edit</button>
            </li>
          )
        })}
      </ul>
     {show && <div id='modal'>
        <div>
          <input defaultValue={priceValue} type='text' onChange={(e)=>{
            setPriceValue(e.target.value)
          }}/>
          <button onClick={()=>{
            let newArr  = [...arr];
            let obj = newArr[objIndex]
            obj.price = priceValue
            // newArr.splice(newArr.indexOf(obj),1)
            setArr(newArr)
            
            setShow(false)
          }}>Edit</button>
        </div>
      </div>}
    </div>
  );
}

export default App;
