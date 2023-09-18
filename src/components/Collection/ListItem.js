const ListItem = ({ data }) => {
    return (
        <div className="list-item">
            <div className="list-cell">
                <img src={data.image} alt={data.name} className="diamond-image" />
            </div>
            <div className="list-cell">{data.name}</div>
            <div className="list-cell">${data.currentPrice}</div>
            {data.attributes.map((attr, idx) => (
                <div className="list-cell" key={idx}>{attr.value}</div>
            ))}
        </div>
    );
}


export default ListItem;
