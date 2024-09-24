import './FeedPage.css'
import React from 'react';
import NovebarFeed from '../novebarFeed/NovebarFeed.js';
function FeedPage () {
    return(
        <div className="container text-center">
  
        <NovebarFeed />
  <div className='maindiv'>
    <div className="row">
      <div className="col">
        Column 1
      </div>
      <div className="col">
        Column 2
      </div>
      <div className="col">
        Column 3
      </div>
    </div>
  </div>
</div>
      );
}

export default FeedPage;