import React from 'react';

export function Header(props) {
    const userinfo = props.userinfo

    return (
      <div className={props.classes.header}>
        <h1>{userinfo.Title} {userinfo.FirstName} {userinfo.LastName}</h1>
      </div>
      )
    }

export default Header;
