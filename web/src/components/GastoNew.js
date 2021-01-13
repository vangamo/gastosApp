import { useState } from 'react';
import './GastoNew.css';

function GastoNew( props ) {
  const defaultDate = new Date().toISOString().split('T')[0];

  const [ taskTitle, setTaskTitle ] = useState( 'Nuevo gasto' );
  const [ amount, setAmount ] = useState( "" );
  const [ amountError, setAmountError ] = useState( "" );
  const [ concept, setConcept ] = useState( "" );
  const [ conceptError, setConceptError ] = useState( "" );
  const [ category, setCategory ] = useState( "" );
  const [ categoryError, setCategoryError ] = useState( "" );
  const [ date, setDate ] = useState( defaultDate );

  const handleAmount = (ev) => {
    let amountValue = ev.currentTarget.value;
    setAmount( amountValue );

    amountValue = amountValue.trim();
    if( amountValue === "" ) {
      setAmountError( "El campo cantidad no debe quedar vacío y debe ser un número." );
      return true;
    }

    amountValue = parseFloat( amountValue );
    if( amountValue > -0.01 && amountValue < 0.01 ) {
      setAmountError( "El campo cantidad no puede ser 0.0." );
      return true;
    }
    setAmountError( "" );

    if( amountValue < 0 ) {
      setTaskTitle( 'Nueva factura' );
    }
    else {
      setTaskTitle( 'Nuevo gasto' );
    }
  };

  const handleDate = (ev) => {
    const dateValue = ev.currentTarget.value;
    setDate( dateValue );
  };

  const handleConceptChange = (ev) => {
    let conceptValue = ev.currentTarget.value;

    if( conceptValue.trim() === "" ) {
      setConceptError( "Debes escribir un concepto" );
    }
    else {
      setConceptError( "" );
    }

    setConcept( conceptValue );
  };

  const handleCategoryChange = (ev) => {
    let categoryValue = ev.currentTarget.value;

    if( categoryValue.trim() === "" ) {
      setCategoryError( "Debes escribir una cegetoría" );
    }
    else {
      setCategoryError( "" );
    }

    setCategory( categoryValue );
  };

  const handleClickClear = (ev) => {
    setAmount( 0 );
    setConcept( '' );
    setDate( defaultDate );
    setCategory( '' );
  };

  const handleClickSubmit = (ev) => {
    ev.preventDefault();

    if( amountError !== "" || conceptError !== "" || categoryError !== "" ) {
      return;
    }

    const selected_category = props.categories.findIndex( (catData) => catData.name.trim().toLowerCase() === category.trim().toLowerCase() );

    if( selected_category < 0 ) {
      setCategoryError("La categoría no existe.")
      return;
    }

    const gastoData = { concept, amount, category:props.categories[ selected_category].id, date };
    props.handleCreate( gastoData );
  }

  return (
    <>
      <h2 className="task__title">{taskTitle}</h2>
      <form className="inputData">
        <label htmlFor="concept" className="inputData__label">Concepto:</label>
        <input type="text" autoFocus required id="concept" className="inputData__textField" value={concept} onChange={handleConceptChange} />
        <label htmlFor="amount" className="inputData__label">Cantidad:</label>
        <input type="number" step="0.01" required id="amount" className={"inputData__textField numberField " + (amountError && "error")} value={amount} onChange={handleAmount} />
        <label htmlFor="date" className="inputData__label">Fecha:</label>
        <input type="date" required id="date" defaultValue={date} onBlur={handleDate} className="inputData__textField" />
        <label htmlFor="category" className="inputData__label">Categoría:</label>
        <input type="text" list="categoryValues" id="category" className="inputData__textField" value={category} onChange={handleCategoryChange} />
        <input type="file" accept="image/*" capture="camera" className="inputData__fileField"/>

        <ul>
          {conceptError && (<li className="inputError">{conceptError}</li>)}
          {amountError && (<li className="inputError">{amountError}</li>)}
          {categoryError && (<li className="inputError">{categoryError}</li>)}
        </ul>

        <fieldset className="inputData__controls">
          <input type="reset" value="Borrar" className="button" onClick={handleClickClear}/>
          <input type="submit" value="Guardar" className="button" onClick={handleClickSubmit} />
        </fieldset>

        <datalist id="categoryValues">
          {props.categories.map( (catData) => (
            <option key={catData.id} value={catData.name} />
          ))}
        </datalist>
      </form>
    </>
  );
}

export default GastoNew;