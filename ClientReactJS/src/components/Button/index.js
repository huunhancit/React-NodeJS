import React from 'react'


class Button extends React.PureComponent {
  render() {
    const { name, onClick, className, type, disabled, loading } = this.props;
    return (
      <button className={className} type={type} disabled={loading || disabled} onClick={onClick}>{loading ? 'Loading...' : name}</button>
    )
  }
}

export default Button