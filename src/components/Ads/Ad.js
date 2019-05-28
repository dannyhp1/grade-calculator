import React from 'react';

export default class Ad extends React.Component {
  componentDidMount () {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

render () {
    return (
      <div className='ad'>
        <ins class="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-2447134112656109"
          data-ad-slot="5018483341"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }
}