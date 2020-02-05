import React, {useContext, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import  {Input, Button} from 'antd';

const context = React.createContext()

function App() {
  // const [state, setState]=useState({
  //   searchTerm = '',
  // })
  return <context.Provider value = {{
    ...state,
    set: v=> setState({...state, ...v}),
    }}>
  
    <div className="App">
      <Header />
      {state.error && <div>{state.error}</div>}
      
    </div>
    </context.Provider>
}

function Header(){
  const ctx = useContext(context)
  return <header className="App-header">
    <Input 
      value={ctx.searchTerm}
      onChange={e=> ctx.set({searchTerm: e.target.value}) }
      style={{height:48,fontSize:'1rem'}}
      // onKeyPress={e=>{
      // if(e.key=='Enter')
      // }}
      />

    <Button style={{marginLeft:3,height:48,fontsize:'1rem'}}>
      onClick = {() => search(ctx)} type="primary"
     
      Search
    </Button>
  </header>
}
async function searchTerm({searchTerm, set}){
  set({searchTerm:'', error:''})

  const osmurl = `https://nominatim.openstreetmap.org/search/${searchTerm}?format=json`
  const r = await fetch (osmurl)
  const loc = await r.jason()
  if (!loc[0]){
    return set({error:'no city match'
    })
  }
  const key = '9911a6ddcf1acb0f54f598416560a9f3'
  const url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${key}/${city.lat},${city.lon}`
  const r2 = await fetch(url)
  const weather = await r2.jason()
  set({weather})

}
export default App;
