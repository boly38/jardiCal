import React, { Component } from 'react'
import { Badge } from 'react-bootstrap';
import { Form, FormControl, Button} from 'react-bootstrap';
import { AiOutlineCloseSquare } from 'react-icons/ai';

class JSearchEntries extends Component {

  focus() {
    if (this.searchInput) {
      this.searchInput.focus();
    }
  }

  render() {
      return this.props.searchLocked ? (
                <div className="mb-3">
                 <Badge variant="secondary" size="sm mr-2 mt-2"
                    onClick={this.props.onUnlock}>search : {this.props.searchString}</Badge>
                 &#160;
                 <AiOutlineCloseSquare
                             onClick={this.props.unSearch}
                             style={{cursor: 'pointer'}}
                             title="Annuler la recherche (raccourci: Escape)"/>
                </div>
      ) : (
                <Form inline className="mb-3" onSubmit={this.props.onSearch}>
                    <FormControl key="entriesSearch"
                                 type="text"
                                 placeholder="Recherche par nom"
                                 value={this.props.searchString}
                                 className="mr-sm-2"
                                 onChange={e => this.props.onSearchStringUpdated(e.target.value)}
                                 size="sm"
                                 ref={(input) => { this.searchInput = input; }}
                    />
                    <Button key="entriesSearchButton"
                            variant="outline-success"
                            onClick={this.props.onSearch}
                            title="Lancer la recherche (raccourci: Enter)"
                            size="sm"
                            >Rechercher</Button>
                </Form>
      );
  }
}

export default JSearchEntries;