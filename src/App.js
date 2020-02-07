import React, {useContext, useState} from 'react';
import './App.css';
import  {Input, Button} from 'antd';
import {Bar} from 'react-chartjs-2';

const context = React.createContext()

function App() {
  const [state, setState] = useState({
    searchTerm:'',
  })
  return <context.Provider value = {{
    ...state,
    set: v=> setState({...state, ...v}),
    }}>
  
    <div className="App">
      <Header />
      <Body />
      
      
    </div>
    </context.Provider>
}

function Header(){
  const ctx = useContext(context)
  //children context
  return <header className="App-header">
    <Input 
      value={ctx.searchTerm}
      onChange={e=> ctx.set({searchTerm: e.target.value})}
      style={{height:'2rem',fontSize:'1rem'}} 
      onKeyPress={e=>{
        if(e.key==='Enter' && ctx.searchTerm) search(ctx)
      }}
    />

    <Button style={{marginLeft:5,height:'2rem'}}
      onClick={()=> search(ctx)} type="primary"
      disabled={!ctx.searchTerm}>
      Search
    </Button>
  </header>
}

function Body(){
  const ctx = useContext(context)
  const {error, weather} = ctx
  let data
  if(weather){
    console.log(weather)
    data = {
      labels: weather.hourly.data.map(d=>d.time),
      datasets: [{
        label:'Temperature',
        data: weather.hourly.data.map(d=>d.temperature)
      }]
    }
  }

  return <div className="App-body">
    {error && <div className="error">{error}</div>}
    {data && <div>
      <Bar data={data}
        width={800} height={400}
      />
    </div>}
  </div>
}

async function search({searchTerm, set}){
 try {
   //try & catch = if not success, catch
   const term = searchTerm
   set({searchTerm:'', error:''})

  const osmurl = `https://nominatim.openstreetmap.org/search/${searchTerm}?format=json`
  const r = await fetch (osmurl)
  const loc = await r.json()


  if (!loc[0]){
    return set({error:'no city match'
    })
  }
  const city = loc[0]  

  const key = '9911a6ddcf1acb0f54f598416560a9f3'
  const url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${key}/${city.lat},${city.lon}`
  const r2 = await fetch(url)
  const weather = await r2.json()
  set({weather})
  

}
  catch(e) {
    set({error: e.message})
  }

}
export default App;
