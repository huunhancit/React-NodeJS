import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles'
import * as _ from 'lodash'


class Users extends React.PureComponent {
  render() {
    const { items, selected, onSelect } = this.props
    const styleActive = _.merge({}, styles.itemUser, styles.itemSelected)
    return (
      <ul className="list-group">
        {items.map((item, index) => {
          return <li key={index} className={["list-group-item"]} style={selected === index ? styleActive : styles.itemUser} onClick={() => onSelect(index)}>{item}</li>
        })}
      </ul>
    )
  }
}

Users.propTypes = {
  items: PropTypes.array
}

export default Users