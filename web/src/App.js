import { useState } from 'react';
import './App.css';

function App() {
  const defaultDate = new Date().toISOString().split('T')[0];

  const [ taskTitle, setTaskTitle ] = useState( 'Nuevo gasto' );
  const [ amount, setAmount ] = useState( "" );
  const [ concept, setConcept ] = useState( "" );
  const [ category, setCategory ] = useState( "" );
  const [ date, setDate ] = useState( defaultDate );

  const handleAmount = (ev) => {
    const amount = ev.currentTarget.value;
    setAmount( amount );
    if( amount < 0 ) {
      setTaskTitle( 'Nueva factura' );
    }
    else {
      setTaskTitle( 'Nuevo gasto' );
    }
  };

  const handleDate = (ev) => {
    const date = ev.currentTarget.value;
    setDate( date );
  };

  const handleConceptChange = (ev) => {
    const concept = ev.currentTarget.value;
    setConcept( concept );
  };

  const handleCategoryChange = (ev) => {
    const category = ev.currentTarget.value;
    setCategory( category );
  };

  const handleClickClear = (ev) => {
    setAmount( 0 );
    setConcept( '' );
    setDate( defaultDate );
    setCategory( '' );
  };

  const handleClickSubmit = (ev) => {
    ev.preventDefault();
  }

  return (
    <div className="App">
      <header className="App__header">
        <h1 className="App__title">Gastos</h1>
      </header>
      <main className="App__main">
        <h2 className="task__title">{taskTitle}</h2>
        <form className="inputData">
          <label className="inputData__label">Cantidad: <input type="number" step="0.01" autoFocus required className="inputData__textField numberField" value={amount} onChange={handleAmount} /></label>
          <label className="inputData__label">Concepto: <input type="text" required className="inputData__textField" value={concept} onChange={handleConceptChange} /></label>
          <label className="inputData__label">Fecha: <input type="date" required defaultValue={date} onBlur={handleDate} className="inputData__textField" /></label>
          <label className="inputData__label">Categoría: <input type="text" list="cat" className="inputData__textField" value={category} onChange={handleCategoryChange} /></label>
          <input type="file" accept="image/*" capture="camera" className="inputData__fileField"/>

          <fieldset className="inputData__controls">
            <input type="reset" value="Borrar" className="button" onClick={handleClickClear}/>
            <input type="submit" value="Guardar" className="button" onClick={handleClickSubmit} />
          </fieldset>

          <datalist id="cat">
            <option value="Luz" />
            <option value="Agua" />
            <option value="Internet" />
            <option value="Hosting" />
            <option value="Comida" />
            <option value="Farmacia" />
          </datalist>
        </form>
      </main>
    </div>
  );
}

export default App;
