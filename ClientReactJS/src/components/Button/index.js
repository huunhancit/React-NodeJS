import React from 'react'


class Button extends React.PureComponent {
  render() {
    const { name, onClick, style, type, disabled, loading } = this.props;
    return (
      <button className={style} type={type} disabled={loading || disabled} onClick={onClick}>{loading ? 'Loading...' : name}</button>
    )
  }
}

export default Button