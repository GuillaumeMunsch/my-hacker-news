const routes = {
  fetchAsk: { GET: '/ask/{:page}.json' },
  fetchJobs: { GET: '/jobs/{:page}.json' },
  fetchNewest: { GET: '/newest/{:page}.json' },
  fetchNews: { GET: '/news/{:page}.json' },
  fetchShow: { GET: '/show/{:page}.json' },
};

export default routes;
