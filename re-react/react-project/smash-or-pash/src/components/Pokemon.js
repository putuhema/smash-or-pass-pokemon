export default function Pokemon({ picked }) {
  const listItem = picked.map((pokemon) => (
    <div key={pokemon.name} className="picked-pokemon">
      <img src={pokemon.img} alt={pokemon.name} />
    </div>
  ));
  return <div className="pokemon">{listItem}</div>;
}
