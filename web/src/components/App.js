import { useState, useEffect } from 'react';
import GastoNew from './GastoNew';
import GastoList from './GastoList';
import './App.css';

function App() {

  const [ gastoList, setGastoList ] = useState( [] );

  useEffect( () => {
    fetch( '/api/gastos/' )
      .then( (response) => response.json() )
      .then( (data) => {
        setGastoList( data );
      })
  }, []);

  const createNewGasto = ( data ) => {
    fetch('/api/gastos/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify( data )})
    .then( (response) => {console.log(response);})
  }

  return (
    <div className="App">
      <header className="App__header">
        <h1 className="App__title">Gastos</h1>
      </header>
      <main className="App__main">
        <GastoNew handleCreate={createNewGasto} />
        <GastoList gastos={gastoList} />
      </main>
    </div>
  );
}

export default App;
