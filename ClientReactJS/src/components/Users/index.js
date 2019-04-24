import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles'
import * as _ from 'lodash'


class Users extends React.PureComponent {
  render() {
    const { items, selected } = this.props
    const styleActive = _.merge({}, styles.itemUser, styles.itemSelected)
    return (
      <ul className="list-group">
        {items.map((item, index) => {
          return <li key={index} className={["list-group-item d-flex justify-content-between align-items-center"]} style={selected === index ? styleActive : styles.itemUser} onClick={() => this.onSelect(index)}>
            {item.username}
            {
              item.isNew &&
              <span className={"badge badge-primary badge-pill"}>new</span>
            }
          </li>
        })}
      </ul>
    )
  }

  onSelect = (index) => {
    this.props.onSelect(index);
  }
}

Users.propTypes = {
  items: PropTypes.array
}

export default Users