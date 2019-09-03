import React from 'react'
import PropTypes from 'prop-types';
import "./infographItem_m2.scss";

//Method 2:
//Slice the full array into a smaller array based on the displayBars number. When expand is clicked, displayBars becomes the max length of the array.


export default function InfographItemM2(props) 
{
  const bars = props.infItemData.dataItems.slice(0, props.infItemData.displayBars).map((barItem, keyIndex) =>
    <tr key={keyIndex}>
      <td className="title">{barItem.title}</td>
      <td className="counter">{barItem.counter}</td>
      <td className="bar">
        <div data-percentage={barItem.percentage} style={{ backgroundColor: props.infItemData.bgColor , width: barItem.percentage + '%', opacity: barItem.opacity }}></div>
      </td>
    </tr>
  )

  return (
    <section className="datasetM2">
      <h2>{props.infItemData.heading}</h2>
      <div>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Count</th>
              <th>Graph</th>
            </tr>
          </thead>
          <tbody>
            {bars}
          </tbody>
        </table>

        {props.infItemData.dataItems.length > props.maxShowBars &&
          <div className={"collapseBtn " + (props.infItemData.isCollapsed ? "isCollapsed" : "isExpanded")}>
            <button onClick={props.toggleIsCollapsed.bind(this, props.infItemData.id, "method2")}>{(props.infItemData.isCollapsed ? "show more..." : "collapse")}</button>
          </div>
        }
      </div>
    </section>
  )
}



InfographItemM2.propTypes = {
  infItemData: PropTypes.object.isRequired,
  maxShowBars: PropTypes.number.isRequired
}