import React from "react";
import { TableWrapper } from "./styled";

const Table = (props) => {
    const { data } = props;
    return (
      <TableWrapper>
        <thead>
          <tr>
            {Object.keys(data[0]).map(value => (
              <th>{value.replaceAll('_',' ').toUpperCase()}</th>
            ))
            }
          </tr>
        </thead>
        <tbody>
          {data.map(catalog => (
            <tr>
              {
                Object.keys(catalog).map(value => (
                  <td>{catalog[value]}</td>
                ))
              }
            </tr>
          ))}
        </tbody>
      </TableWrapper>
    )
}

export default Table