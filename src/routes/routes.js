const routes = {
  fetchAsk: { GET: '/ask/{:page}.json' },
  fetchJobs: { GET: '/jobs/{:page}.json' },
  fetchNewest: { GET: '/newest/{:page}.json' },
  fetchNews: { GET: '/news/{:page}.json' },
  fetchShow: { GET: '/show/{:page}.json' },
  fetchItem: { GET: '/item/{:id}.json' },
  fetchUser: { GET: '/user/{:name}.json' },
};

export default routes;
