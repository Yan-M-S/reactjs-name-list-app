import './styles.css'

import React, {useState, useEffect} from 'react';

import { Card } from '../../components/Card'


export function Home() {

  function handleAddName(){
    const newName ={
      name: listName,
      time: new Date().toLocaleTimeString("pt-br",{
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    }
    

    setListNames(oldState =>[...oldState, newName])
  }

  const [listName, setListName] = useState('');
  const [listNames, setListNames] = useState([])
  const [user, setUser] = useState({name:'', avatar: ''})

  //  function handleAddName(name){
  //    console.log(`Entrou na função ${name}`);
  //  }


  

  useEffect(() => {
    fetch('https://api.github.com/users/Yan-M-S')
    .then(response => response.json())
    .then(data => {
      setUser({
        name: data.name,
        avatar: data.avatar_url,
      })
    })
  }, [])

  return (
      <div className='container'>

        <header>
          <h1>Bem vindo: {listName}</h1>
          <div>
            <strong>{user.name}</strong>
            <img src={user.avatar}/>
          </div>
        </header>



        <input
          type='text'
          placeholder='Name...'
          onChange={e =>setListName(e.target.value)}
        />
        
        <button
          type="button"
          onClick={handleAddName}
          >
          Add
        </button>

        {
          listNames.map(listName => 
          <Card 
          key={listName.time}
          name={listName.name} 
          time={listName.time}

          />)
        }

      </div>
  )
}


