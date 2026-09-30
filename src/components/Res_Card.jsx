  function Res_Card({ rate,name, price,src1}) {
  return (
    <div className="res-card">
      <img className="res-logo" src={src1} alt="logo" />
      <h2>{name}</h2>
      <h2>Rating: {rate}</h2>
      <h2>Price: {price}</h2>
    </div>
  )
}
export default Res_Card;