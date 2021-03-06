import React from 'react'


class Input extends React.PureComponent {
  render() {
    const { value, onChange, className, placeholder, cusStyle } = this.props
    return (
      <input type="text" style={cusStyle} className={className} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    )
  }
}

export default Input