import React from 'react'


class Input extends React.PureComponent {
  render() {
    const { value, onChange, style, placeholder, cusStyle } = this.props
    return (
      <input type="text" style={cusStyle} className={style} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    )
  }
}

export default Input