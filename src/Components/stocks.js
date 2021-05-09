import React from "react";

const Posts = ({ stocks, loading }) => {
  if (loading) {
    return <h2>loading....</h2>;
  }
  return (
    <table
      onClick={(e) => {
        var list = e.target.parentElement.parentElement.childNodes;
        console.log(list);
      }}
      className="table table-striped mt-4"
    >
      <thead>
        <tr>
          <th>Company name</th>
          <th>Symbol</th>
          <th>Max_Supply</th>
        </tr>
      </thead>
      <tbody>
        {stocks.map((stock) => {
          return (
            <tr key={stock.id}>
              <td>{stock.name}</td>
              <td>{stock.symbol}</td>
              <td>{stock.max_supply}</td>
              <td>
                <button type="button" className="btn btn-primary mt-1">
                  save data
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
export default Posts;
