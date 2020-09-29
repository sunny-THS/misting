const API_URL = 'https://fir-9d177.firebaseio.com/ThongSo.json?&auh=YA2HldfmtXM9ZtNtAz5yetMTgxFpd8Gu2Dx8seta';

const temperature = document.querySelector('#_t');
const humidity = document.querySelector('#_h');
const pump = document.querySelector('.pump');

var _t, _h, _p, ip;

const database = firebase.database();

setTimeout(getIPAddress, 500);
GetDB();

function GetDB() {
  fetch(API_URL)
  .then(res => res.json())
  .then(db => {
    _t = db.NhietDo;
    temperature.textContent = `${Math.round(db.NhietDo*100)/100} ᵒC`;

    _h = db.DoAm;
    humidity.textContent = `${db.DoAm} %`;

    _p = db.PumpIsWork;
    if(db.PumpIsWork == 1) {
      pump.style.background = 'green';
    }else {
      pump.style.background = 'red';
    }
  });
  setTimeout(GetDB, 500);
}

function getIPAddress() {
  fetch(API_URL)
    .then(res => res.json())
    .then(db => {
      let scores = db.IP;
      ip = db.IP;
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
    });
}

// function SetData() {
//   database.ref().set({
//     DoAm: _h,
//     NhietDo: _t,
//     IP: {
//       DHT: {
//         name: ip['DHT'].name,
//         val: ip['DHT'].val
//       },
//       Relay: {
//         name: ip['Relay'].name,
//         val: ip['Relay'].val
//       }
//     },
//     PumpIsWork: _p,
//   });
// }
