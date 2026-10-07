
function Res_Card({ rate, name, price, src1 }) {
  return (
    <div className="res-card">
      <img className="res-logo" src={src1} alt={name} />
      <h2>{name}</h2>
      <h2>Rating: {rate}</h2>
      <h2>Price: {price}</h2>
    </div>
  );
}

// Higher-Order Component
export function Rescardwithlabel(Res_Card) {
  return function (props) {
    if (props.rate > 4.3) {
      return (
        <div className="promoted-container">
          <label className="promoted-label">Promoted ✅</label>
          <Res_Card {...props} />
        </div>
      );
    }

    return <Res_Card {...props} />;
  };
}

export default Res_Card;