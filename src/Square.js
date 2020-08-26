import React from 'react';

const squareStyle = {
  width: '60px',
  height: '60px',
  backgroundColor: '#ddd',
  margin: '4px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '20px',
  color: 'white',
  cursor: 'pointer',
};

class Square extends React.Component {
  render() {
    const { value, handleSquareClick } = this.props;

    return (
      <div className="square" style={squareStyle} onClick={handleSquareClick}>
        {value}
      </div>
    );
  }
}

export default Square;
