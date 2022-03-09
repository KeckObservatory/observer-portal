import React from 'react';

import Clock from 'react-live-clock';

function UTclock(props) {

  return (
      <Clock format={props.fmt} ticking={true} timezone={props.zone} />
  )
};

export default UTclock;