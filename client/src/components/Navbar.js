import React from 'react';

export default function Navbar() {
  return (
    <div>
      <nav style={styles.cores}>
        <div className="nav-wrapper">
          <a href="/#" className="brand-logo">
            Controle Financeiro
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <a href="/#">Sass</a>
            </li>
            <li>
              <a href="/#">Components</a>
            </li>
            <li>
              <a href="/#">JavaScript</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
const styles = {
  cores: {
    backgroundColor: '#00BFFF',
  },
};
