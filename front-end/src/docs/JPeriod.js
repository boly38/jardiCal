import React, { Component } from 'react'
import { Button} from 'react-bootstrap';

class JPeriod extends Component {
  render() {
    var v = this.props.value;
    return (<div>
      <Button variant={ v.includes(1) ? 'primary':'secondary' } size="sm" disabled>jan.</Button>
      <Button variant={ v.includes(2) ? 'primary':'secondary' } size="sm" disabled>fév.</Button>
      <Button variant={ v.includes(3) ? 'primary':'secondary' } size="sm" disabled>mars</Button>
      <Button variant={ v.includes(4) ? 'primary':'secondary' } size="sm" disabled>avril</Button>
      <Button variant={ v.includes(5) ? 'primary':'secondary' } size="sm" disabled>mai</Button>
      <Button variant={ v.includes(6) ? 'primary':'secondary' } size="sm" disabled>juin</Button>
      <Button variant={ v.includes(7) ? 'primary':'secondary' } size="sm" disabled>juil.</Button>
      <Button variant={ v.includes(8) ? 'primary':'secondary' } size="sm" disabled>août</Button>
      <Button variant={ v.includes(9) ? 'primary':'secondary' } size="sm" disabled>sep.</Button>
      <Button variant={ v.includes(10) ? 'primary':'secondary' } size="sm" disabled>oct.</Button>
      <Button variant={ v.includes(11) ? 'primary':'secondary' } size="sm" disabled>nov.</Button>
      <Button variant={ v.includes(12) ? 'primary':'secondary' } size="sm" disabled>déc.</Button>
    </div>)
  }
}

export default JPeriod;