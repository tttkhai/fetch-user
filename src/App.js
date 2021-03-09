import "./styles.css";
import {useState, useEffect} from 'react';
import axios from 'axios';

export default function App() {
  const [count, setCount]= useState(0)
  const [data, setData] =useState([])
  const fetchData =(pageNumber)=>{
    const url=`https://randomuser.me/api?page=${pageNumber}`
    return axios.get(url)
    .then(res => {
      setData([...data, res.data.results[0]]) 
    }).catch(err=>{
      console.log(err)
    })
  }
  const fetchFullName=({title, first, last})=>{
    return `${title} ${first} ${last}`
  }
  const fetchPage=()=>{
    let page=Math.random()*10;
    fetchData(page)
  }

  useEffect(()=>{
    fetchPage();
  }, [])

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <button onClick={()=> fetchPage()}>fetch user</button>
      <div>{data.map((res, index)=>{
        return (
        <div key={index} style={{margin: '10px'}}>
          <div>{fetchFullName(res.name)}</div>
          <img src={res.picture.thumbnail} alt="profile"/>
        </div>
        )
      })}</div>
    </div>
  );
}
