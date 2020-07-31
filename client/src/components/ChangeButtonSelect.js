import React from 'react';

export default function ChangeButtonSelect({ icon, onClick }) {
  const handleClickButton = () => {
    onClick(icon);
  };

  return (
    <div>
      {/* prettier-ignore */}
      <a href='#!' className="btn btn-small waves-effect waves-light"
        onClick={handleClickButton} style={{zIndex: 0}}>
        <i className="material-icons">{icon}</i>
      </a>
    </div>
  );
}
