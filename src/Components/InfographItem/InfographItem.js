import React from 'react'
import PropTypes from 'prop-types';
import "./infographItem.scss";

//Method 1:
//Check if the height is over 400px, if so, collapse the DIV container and add 'expand' button

export default function InfographItem(props) 
{
  const bars = props.infItemData.dataItems.map((barItem, keyIndex) =>
    <tr key={keyIndex}>
      <td className="title">{barItem.title}</td>
      <td className="counter">{barItem.counter}</td>
      <td className="bar">
        <div data-percentage={barItem.percentage} style={{ backgroundColor: props.infItemData.bgColor , width: barItem.percentage + '%', opacity: barItem.opacity }}></div>
      </td>
    </tr>
  )

  return (
    <section className="dataset">
      <h2 style={{color:props.infItemData.bgColor}}>{props.infItemData.heading}</h2>
      <div className={(props.infItemData.isCollapsed ? "collapse" : "full-list")}>
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
            <button onClick={props.toggleIsCollapsed.bind(this, props.infItemData.id, "method1")}>{(props.infItemData.isCollapsed ? "show more..." : "collapse")}</button>
          </div>
        }
      </div>
    </section>
  )
}



InfographItem.propTypes = {
  infItemData: PropTypes.object.isRequired,
  maxShowBars: PropTypes.number.isRequired
}