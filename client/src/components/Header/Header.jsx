import React from 'react';
import './Header.scss';

function Header() {
  return (
    <div className="header-container">
      <header className="header">
        <div className="icon-container">
          <a
            href="https://steamcommunity.com/id/stripsa"
            target="_blank"
            style={{ textDecoration: 'none' }}
            data-tooltip="Мой стим"
          >
            <i className="fa-brands fa-steam" aria-hidden="true"></i>
          </a>
          <a
            href="https://discord.gg/WWfshaCBj7"
            target="_blank"
            style={{ textDecoration: 'none' }}
            data-tooltip="discord"
          >
            <i className="fa-brands fa-discord" aria-hidden="true"></i>
          </a>
          <a
            href="https://www.twitch.tv/eiztrips"
            target="_blank"
            style={{ textDecoration: 'none' }}
            data-tooltip="twitch"
          >
            <i className="fa-brands fa-twitch" aria-hidden="true"></i>
          </a>
          <a
            href="https://github.com/Eiztrips"
            target="_blank"
            style={{ textDecoration: 'none' }}
            data-tooltip="Github"
          >
            <i className="fa-brands fa-github" aria-hidden="true"></i>
          </a>
          <a
            href="https://shield.land/blogs/eiztrips"
            target="_blank"
            style={{ textDecoration: 'none' }}
            data-tooltip="Shield Land"
          >
            <i className="fa-solid fa-shield-halved" aria-hidden="true"></i>
          </a>
        </div>
      </header>
    </div>
  );
}

export default Header;
