const API_URL = 'https://fir-9d177.firebaseio.com/ThongSo.json?&auh=YA2HldfmtXM9ZtNtAz5yetMTgxFpd8Gu2Dx8seta';
const LOG_URL = 'https://script.google.com/macros/s/AKfycbwEMg3BHMVn7-_5cdoS6ExQTisCtotJUuXQv1_7kHiVlHMfqNc/exec';

const temperature = document.querySelector('#_t');
const humidity = document.querySelector('#_h');
const pump = document.querySelector('.pump');

var ip;

const database = firebase.database();

app();

function app() {
  GetDB();
  setTimeout(getIPAddress, 500);
}

function logData({
  t,
  h,
  p
}) {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  fetch("https://script.google.com/macros/s/AKfycbwEMg3BHMVn7-_5cdoS6ExQTisCtotJUuXQv1_7kHiVlHMfqNc/exec", requestOptions)
    .catch(handleErr);
}

async function GetDB() {
  let data = await (await fetch(API_URL).catch(handleErr)).json();
  let thp_ = {
    t: data.NhietDo,
    h: data.DoAm,
    p: data.PumpIsWork
  };
  await returnData(thp_);
  await logData(thp_);
  // console.log(thp_);
  setTimeout(GetDB, 500);
}

function returnData({
  t,
  h,
  p
}) {
  temperature.textContent = `${Math.round(t*100)/100}ᵒC`;
  humidity.textContent = `${h}%`;
  pump.style.background = p == 1 ? 'green' : 'red';
}

function handleErr(err) {
  let resp = new Response(
    JSON.stringify({
      code: 400,
      message: 'Stupid network Error'
    })
  );
  return resp;
}

async function getIPAddress() {
  let db = await (await fetch(API_URL).catch(handleErr)).json();
  let scores = db.IP;
  let devices = Object.keys(scores);
  devices.forEach(device => {
    const div = document.querySelector('._IP');

    const name = document.createElement('h2');
    name.textContent = `${scores[device].name}: `;

    const ip = document.createElement('a');
    ip.href = `http://${scores[device].val}/`;
    ip.textContent = `${scores[device].val}`;
    ip.target = '_blank';

    const br = document.createElement('br')

    div.appendChild(name);
    div.appendChild(ip);
    div.appendChild(br);
  });
}
