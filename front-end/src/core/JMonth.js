import React, { Component } from 'react'
import { ToggleButtonGroup, ToggleButton} from 'react-bootstrap';

class JMonth extends Component {
  constructor(props) {
    super(props);
    this.data = "";

    this.handleMonthsChange = this.handleMonthsChange.bind(this);
  }


  componentDidMount() {
    if (this.data !== "") {
      return;
    }
    console.log("fetch json");
      var board = this;
      fetch('/garden.json')
            .then(res => res.json())
            .then((data) => {
              board.data = data;
              console.log("data", data);
              this.forceUpdate();
            })
            .catch(console.log)
  }


  handleMonthsChange(months) {
    console.log('handleMonthsChange', months);
    this.bucket = [];
    this.ground = [];
    this.data.forEach(element => {
      if (element.sowBucket) {
        var isBucket = false;
        element.sowBucket.forEach(elementBucket => {
            if (months.includes(elementBucket)) {
                isBucket = true;
            }
        })
        if (isBucket) {
            this.bucket.push(element.name);
        }
      }
      if (element.sowGround) {
        var isGround = false;
        element.sowGround.forEach(elementGround => {
            if (months.includes(elementGround)) {
                isGround = true;
            }
        })
        if (isGround) {
            this.ground.push(element.name);
        }
      }
    });
    this.forceUpdate();
  }

  render() {
    return (
      <div className="jmonth">
       <div className="selectMonth">
        <h1>Par mois</h1>
        <p>
        Choisissez un ou plusieurs mois
        </p>
          <ToggleButtonGroup type="checkbox" defaultValue={[]}
            className="mb-2"
            onChange={this.handleMonthsChange}>
            <ToggleButton value={1}>Janvier</ToggleButton>
            <ToggleButton value={2}>Février</ToggleButton>
            <ToggleButton value={3}>Mars</ToggleButton>
            <ToggleButton value={4}>Avril</ToggleButton>
            <ToggleButton value={5}>Mai</ToggleButton>
            <ToggleButton value={6}>Juin</ToggleButton>
            <ToggleButton value={7}>Juillet</ToggleButton>
            <ToggleButton value={8}>Août</ToggleButton>
            <ToggleButton value={9}>Septembre</ToggleButton>
            <ToggleButton value={10}>Octobre</ToggleButton>
            <ToggleButton value={11}>Novembre</ToggleButton>
            <ToggleButton value={12}>Décembre</ToggleButton>
          </ToggleButtonGroup>
       </div>
       <div className="showMonth">
           Semis en godets : { this.bucket }<br/>
           Semis en pleine terre : { this.ground }<br/>
       </div>
      </div>
    );
  }
}

export default JMonth;