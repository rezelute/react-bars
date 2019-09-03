//import logo from './logo.svg';
import './style/App.scss';
import Infograph from './Components/Infograph/Infograph';
import Axios from 'axios';
import React, { Component } from 'react'


export default class App extends Component
{
  state = {
    //method 1
    infograph: {
      maxBarsDisplay: 10,
      main_heading: "Skyrim people chat lines",
      datasets: [
        {
          "id": 1,
          "heading": "Markarth area",
          "isCollapsed": true,
          "bgColor": "red",
          "dataItems": [
            {
              "title": "Imedhnain",
              "count": "90",
              "percentage": "100",
              "opacity": "1",
            },
            {
              "title": "Lisbet",
              "count": "50",
              "percentage": "50",
              "opacity": "0.5"
            }
          ]
        },
        {
          "id" : 2,
          "heading": "Falkreath area",
          "isCollapsed": true,
          "bgColor" : "blue",
          "dataItems": [
            {
              "title": "Arcturus",
              "count": "57",
              "percentage": "50",
              "opacity": "0.2"
            },
            {
              "title": "Babette",
              "count": "30",
              "percentage": "10",
              "opacity": "0.1"
            }
          ]
        }
      ]
    },
    //method 2
    infograph_m2: {
      maxBarsDisplay: 10,
      main_heading: "Skyrim people chat lines",
      datasets: [
        {
          "id": 1,
          "heading": "Markarth area",
          "displayBars": 10,
          "isCollapsed": true,
          "bgColor": "red",
          "dataItems": [
            {
              "title": "Imedhnain",
              "count": "90",
              "percentage": "100",
              "opacity": "1",
            },
            {
              "title": "Lisbet",
              "count": "50",
              "percentage": "50",
              "opacity": "0.5"
            }
          ]
        },
        {
          "id" : 2,
          "heading": "Falkreath area",
          "displayBars": 10,
          "isCollapsed": true,
          "bgColor" : "blue",
          "dataItems": [
            {
              "title": "Arcturus",
              "count": "57",
              "percentage": "50",
              "opacity": "0.2"
            },
            {
              "title": "Babette",
              "count": "30",
              "percentage": "10",
              "opacity": "0.1"
            }
          ]
        }
      ]
    },
  }

  //Toggle collapse
  toggleIsCollapsed = (collapseId, methodType) =>
  {
    if (methodType === "method1"){
      let newInfographState = {};
      Object.assign(newInfographState, this.state.infograph);

      newInfographState.datasets.map((dsItem) =>
      {
        if (dsItem.id === collapseId) {
          dsItem.isCollapsed = !dsItem.isCollapsed;
        }
        return dsItem;
      })
      this.setState({ infograph: newInfographState });
    }
    else { //method 2
      let newInfographState = {};
      Object.assign(newInfographState, this.state.infograph_m2);

      newInfographState.datasets.map((dsItem) =>
      {
        if (dsItem.id === collapseId) {
          dsItem.isCollapsed = !dsItem.isCollapsed;
          dsItem.displayBars = (dsItem.displayBars===dsItem.dataItems.length? 10: dsItem.dataItems.length);
        }
        return dsItem;
      })
      this.setState({ infograph_m2: newInfographState });
    }
    
  }

  componentWillMount()
  {
    Axios.get("/assets/data.json")
      .then((response) =>
      {
        //handle success
        this.setState({
          infograph: parseJson(response.data),
          infograph_m2: parseJsonMethod2(response.data)
        });
      })
      .catch((error) =>
      {
        console.log(error);
      })
  }



  render()
  {
    return (
      <div className="App">
        <Infograph dataMethod1={this.state.infograph} dataMethod2={this.state.infograph_m2} toggleIsCollapsed={this.toggleIsCollapsed} />

        <p>End of App line</p>
      </div>
    )
  }
}


//parses the JSON into a new format
function parseJson(origData)
{
  let colorsAr = ["red", "blue", "purple", "green"];

  let newData = {
    main_heading: origData.main_heading,
    maxBarsDisplay: 10,
    datasets: []
  };

  //loop through each original dataset
  origData.datasets.forEach((origDsItem, index) =>
  {
    let newDSItem = {
      id: index,
      heading: origDsItem.heading,
      isCollapsed: false,
      bgColor: colorsAr[0],
      dataItems: []
    };

    //shuffle color array so the first goes to last
    const firstColor = colorsAr.shift();
    colorsAr.push(firstColor);//add first color to last position

    //determine the highest value (this will be 100% of the chart)
    let highestNum = 0;
    let values_ar = Object.values(origDsItem.data); //["50", "100", "20"]
    values_ar.forEach(value => {
      let counter = parseInt(value);
      if (counter > highestNum) {
        highestNum = counter;
      }
    });

    //add each item to array (with percentage for the bars)
    let entries_ar = Object.entries(origDsItem.data);
    entries_ar.forEach(entry => {
      let title = entry[0];
      let count = parseInt(entry[1]);
      
      let pageData = ({
        title: title,
        counter: count,
        percentage: (count * 100 / highestNum),
        opacity: ((count / highestNum) > 0.2 ? (count / highestNum) : 0.2) //opacity doesnt go below 0.2
      });
      newDSItem.dataItems.push(pageData);
     });

    //if number of items >10 => collapse them
    if (newDSItem.dataItems.length > newData.maxBarsDisplay) {
      newDSItem.isCollapsed = true;
    }

    //sort the array by highest to lowest count
    newDSItem.dataItems.sort(function(a, b){
      return b.counter - a.counter
    });

    newData.datasets.push(newDSItem);
  })

  console.log("newData: ", newData);

  return newData;
}

//parses the JSON into a new format
function parseJsonMethod2(origData)
{
  let colorsAr = ["red", "blue", "purple", "green"];

  let newData = {
    main_heading: origData.main_heading,
    maxBarsDisplay: 10,
    datasets: []
  };

  //loop through each original dataset
  origData.datasets.forEach((origDsItem, index) =>
  {
    let newDSItem = {
      id: index,
      heading: origDsItem.heading,
      displayBars: 10,
      isCollapsed: false,
      bgColor: colorsAr[0],
      dataItems: []
    };

    //shuffle color array so the first goes to last
    const firstColor = colorsAr.shift();
    colorsAr.push(firstColor);//add first color to last position

    //determine the highest value (this will be 100% of the chart)
    let highestNum = 0;
    let values_ar = Object.values(origDsItem.data); //["50", "100", "20"]
    values_ar.forEach(value => {
      let counter = parseInt(value);
      if (counter > highestNum) {
        highestNum = counter;
      }
    });

    //add each item to array (with percentage for the bars)
    let entries_ar = Object.entries(origDsItem.data);
    entries_ar.forEach(entry => {
      let title = entry[0];
      let count = parseInt(entry[1]);
      
      let pageData = ({
        title: title,
        counter: count,
        percentage: (count * 100 / highestNum),
        opacity: ((count / highestNum) > 0.2 ? (count / highestNum) : 0.2) //opacity doesnt go below 0.2
      });
      newDSItem.dataItems.push(pageData);
     });

    //if number of items >10 => collapse them
    if (newDSItem.dataItems.length > newData.maxBarsDisplay) {
      newDSItem.isCollapsed = true;
    }

    //sort the array by highest to lowest count
    newDSItem.dataItems.sort(function(a, b){
      return b.counter - a.counter
    });

    newData.datasets.push(newDSItem);
  })

  console.log("newData: ", newData);

  return newData;
}