// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState('');
  const [insights, setInsights] = useState(null);

  useEffect(() => {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId      : '<YOUR_APP_ID>',
        cookie     : true,
        xfbml      : true,
        version    : 'v13.0'
      });
      window.FB.AppEvents.logPageView();
    };
  }, []);

  const loginWithFacebook = () => {
    window.FB.login(response => {
      if (response.authResponse) {
        fetchUserProfile(response.authResponse.accessToken);
      }
    }, { scope: 'pages_show_list,pages_read_engagement' });
  };

  const fetchUserProfile = (accessToken) => {
    window.FB.api('/me', { fields: 'name,picture', access_token: accessToken }, (response) => {
      setUser(response);
      fetchUserPages(accessToken);
    });
  };

  const fetchUserPages = (accessToken) => {
    window.FB.api('/me/accounts', { access_token: accessToken }, (response) => {
      setPages(response.data);
    });
  };

  const fetchPageInsights = (pageId, accessToken) => {
    axios.get(`https://graph.facebook.com/v13.0/${pageId}/insights?metric=page_fans,page_engaged_users,page_impressions,page_reactions&access_token=${accessToken}`)
      .then(response => {
        setInsights(response.data.data);
      });
  };

  const handlePageSelection = (event) => {
    const pageId = event.target.value;
    const page = pages.find(p => p.id === pageId);
    setSelectedPage(pageId);
    fetchPageInsights(pageId, page.access_token);
  };

  return (
    <div>
      {!user ? (
        <button onClick={loginWithFacebook}>Login with Facebook</button>
      ) : (
        <div>
          <h1>Welcome, {user.name}</h1>
          <img src={user.picture.data.url} alt={user.name} />
          <select onChange={handlePageSelection} value={selectedPage}>
            <option value="">Select a Page</option>
            {pages.map(page => (
              <option key={page.id} value={page.id}>{page.name}</option>
            ))}
          </select>
          {insights && (
            <div>
              {insights.map(insight => (
                <div key={insight.name}>
                  <h2>{insight.title}</h2>
                  <p>{insight.values[0].value}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
