import './GastoList.css';

function GastoList( props ) {

  const handleClickDelete = (ev) => {
    const gastoId = parseInt(ev.currentTarget.parentElement.parentElement.dataset.gastoId);
    props.handleDelete( gastoId );
  };

  return (
    <table className="gastosTable">
      <thead>
        <tr className="gastosTable__head-row"><td>Fecha</td><td>Concepto</td><td>Cantidad</td><td>Categoría</td><td></td></tr>
      </thead>
      <tbody>
        {props.gastos.map( (gastoData, gastoIndex) => (
          <tr key={gastoData.id} data-gasto-id={gastoData.id} className="gastosTable__row">
            <td><span>{gastoData.id}</span> {gastoData.date}</td>
            <td>{gastoData.concept}</td>
            <td>{gastoData.amount}</td>
            <td>{gastoData.category}</td>
            <td><button onClick={handleClickDelete}>Borrar</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default GastoList;