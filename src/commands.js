const table = require('console.table');
const request = require('request-promise-native');

async function list({ host }) {
  try {
    const { snapshots } = await request.get(`${host}/_snapshot/cs-automated/_all`).then(JSON.parse);

    const data = snapshots
      .filter(({ state }) => state === 'SUCCESS')
      .map(({ snapshot, start_time }) => ({ ID: snapshot, Date: start_time.slice(0, 10) }));

    console.table(data);
  } catch (error) {
    console.error(error.message);
  }
}

async function restore({ host }, id) {
  try {
    const { snapshots: [{ indices }] } = await request.get(`${host}/_snapshot/cs-automated/${id}`).then(JSON.parse);

    const body = JSON.stringify({
      indices: indices.filter((index) => index !== '.kibana').join(','),
      ignore_unavailable: true,
      include_global_state: true
    });

    const response = await request.post(`${host}/_snapshot/cs-automated/${id}/_restore`, { body }).then(JSON.parse);

    console.info(response);
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = { list, restore };
