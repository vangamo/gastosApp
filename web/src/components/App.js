import { useState, useEffect } from 'react';
import GastoNew from './GastoNew';
import GastoList from './GastoList';
import './App.css';

function App() {

  const [ gastoList, setGastoList ] = useState( [] );
  const [ categoryList, setCategoryList ] = useState( [] );

  useEffect( () => {
    fetch( '/api/gastos/' )
      .then( (response) => response.json() )
      .then( (data) => {
        setGastoList( data );
      });

    fetch( '/api/categories/' )
      .then( (response) => response.json() )
      .then( (data) => {
        setCategoryList( data );
      })
  }, []);

  const createNewGasto = ( data ) => {
    fetch('/api/gastos/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify( data )})
    .then( (response) => response.json() )
    .then( (data) => {
      console.log(data);
      if( data.status === 'ok' ) {
        setGastoList( [data.data, ...gastoList] );
      }
    });
  }

  const deleteGasto = ( gastoId ) => {
    fetch('/api/gastos/'+gastoId, {
      method: 'DELETE' })
    .then( (response) => response.json() )
    .then( (data) => {
      console.log(data);
      if( data.status === 'ok' ) {
        setGastoList( gastoList.filter( (data) => data.id !== gastoId) );
      }
    });
  }

  return (
    <div className="App">
      <header className="App__header">
        <h1 className="App__title">Gastos</h1>
      </header>
      <main className="App__main">
        <GastoNew categories={categoryList} handleCreate={createNewGasto} />
        <GastoList gastos={gastoList} handleDelete={deleteGasto} />
      </main>
    </div>
  );
}

export default App;
