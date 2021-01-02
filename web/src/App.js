import { useState } from 'react';
import './App.css';

function App() {
  const [ date, setDate ] = useState( new Date().toISOString().split('T')[0] );

  return (
    <div className="App">
      <header className="App__header">
        <h1 className="App__title">Gastos</h1>
      </header>
      <main className="App__main">
        <h2 className="task__title">Nuevo gasto</h2>
        <form className="inputData">
          <label className="inputData__label">Cantidad: <input type="number" step="0.01" autofocus required className="inputData__textField numberField"/></label>
          <label className="inputData__label">Concepto: <input type="text" required className="inputData__textField"/></label>
          <label className="inputData__label">Fecha: <input type="date" required defaultValue={date} className="inputData__textField"/></label>
          <label className="inputData__label">Categoría: <input type="text" list="cat" className="inputData__textField"/></label>
          <input type="file" accept="image/*" capture="camera" className="inputData__fileField"/>

          <fieldset className="inputData__controls">
            <input type="reset" value="Borrar" className="button"/>
            <input type="submit" value="Guardar" className="button"/>
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
