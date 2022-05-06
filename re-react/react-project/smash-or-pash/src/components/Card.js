export default function Card({ pokemon }) {
  const sprite =
    pokemon.sprites.versions["generation-v"]["black-white"]["animated"]
      .front_default;

  const typeElement = pokemon.types.map((type) => (
    <div className={`type__pill ${type.type.name}`} key={type.slot}>
      {type.type.name}
    </div>
  ));
  return (
    <div className="box card">
      <div className="circles">
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
      <div className="box shadow"></div>
      <div className="top">
        <div className="info">
          <div className="type">{typeElement}</div>
          <p>{`#${pokemon.id}`}</p>
        </div>
        <div className="sprite">
          <img src={sprite} alt="pokemon sprite" />
        </div>
      </div>
      <div className="items">
        <div className="circle circle-xl"></div>
        <ul className="speaker">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div className="bottom">
        <h3>{pokemon.forms[0].name}</h3>
      </div>
    </div>
  );
}
