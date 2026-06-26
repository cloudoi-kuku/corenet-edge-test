module.exports = async function (context, req) {
  context.log('CoreNet edge test: hello');

  context.res = {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
    body: {
      message: 'Hello from CoreNet edge',
      route: '/api/hello',
      timestamp: new Date().toISOString(),
    },
  };
};