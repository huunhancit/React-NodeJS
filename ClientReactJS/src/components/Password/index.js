import React from 'react'



class Password extends React.PureComponent {
  render() {
    const { value, onChange, style, placeholder } = this.props
    return (
      <input type="password" className={style}  placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
    )
  }
}

export default Password