import React from 'react'
import PropTypes from 'prop-types';
import InfographItem from '../InfographItem/InfographItem';
import InfographItemM2 from '../InfographItem/InfographItemM2';
import "./infograph.scss";


export default function Infograph(props)
{
  //let maxBarsDisplay = props.data.maxBarsDisplay;
  //console.log(props)
  return (
    <section className="infograph">
      <div id="infograph_method1">
        <h1>{props.dataMethod1.main_heading} [Method 1]</h1>
        <p>Check if the height is over 400px, if so, collapse the DIV container and add 'expand' button</p>
        <div id="infograph-sections">
          {
            props.dataMethod1.datasets.map((infoData, index) => (
              <InfographItem key={index} infItemData={infoData} maxShowBars={props.dataMethod1.maxBarsDisplay} toggleIsCollapsed={props.toggleIsCollapsed}/>
            ))
          }
          </div>
      </div>

      <div id="infograph_method2">
        <h1>{props.dataMethod2.main_heading} [Method 2]</h1>
        <p>Slice the full array into a smaller array and only display the sliced number of items.</p>
        <div id="infograph-sections">
          {
            props.dataMethod2.datasets.map((infoData, index) => (
              <InfographItemM2 key={index} infItemData={infoData} maxShowBars={props.dataMethod2.maxBarsDisplay} toggleIsCollapsed={props.toggleIsCollapsed}/>
            ))
          }
          </div>
      </div>
    </section>
  )
}


Infograph.propTypes = {
  dataMethod1: PropTypes.object.isRequired,
  dataMethod2: PropTypes.object.isRequired,
}