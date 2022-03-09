import React, {useState} from 'react';

import IframeResizer from 'iframe-resizer-react';
import useWindowDimensions from './BrowSize';

var Spinner = require('react-spinkit');

const Iframe2 = ({source, classes, bg_color = 'linear-gradient(340deg, #F5F5F5 30%, #191970 90%)',}) => {

  const dim = useWindowDimensions();
  const height = dim.height;
  const [loading, setLoading] = useState(true);

  if (!source) {
    return (
      <>
        <div>Loading...</div>
      </>
    )
  }

  const hidespinner = () => {
    setLoading(false);
  }

  return (
    <>
      {loading ? (
        <div style={{ width: '1px', minWidth: '100%', height: height + 'px', background: bg_color }}>
        <Spinner className={classes.iframeSpinner} name="line-scale-pulse-out-rapid" color="coral" fadeIn={"quarter"}/>
        </div>) : null}

      <IframeResizer
        // stop redirects outside of iframe
        sandbox="allow-forms allow-scripts allow-same-origin  allow-popups"
        allowtransparency="true"
        backgroundColor={bg_color}
        src={source}
        scrolling="yes"
        onLoad={hidespinner}
        style={{ width: '1px', minWidth: '100%', height: height + 'px', background: bg_color }}
      />
    </>
  );
};

export default Iframe2;

