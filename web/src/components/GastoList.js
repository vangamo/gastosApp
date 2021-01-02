
function GastoList( props ) {
  return (
    <table>
      {props.gastos.map( (gastoData, gastoIndex) => (
        <tr key={gastoData.id}><td>{gastoData.concept}</td></tr>
      ))}
    </table>
  );
}

export default GastoList;