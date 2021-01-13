const fetch = require('node-fetch');

let headers = {
    'Content-Type': 'application/json',
    'X-Challenge-Id': ''
};

const nickname = 'wada';


const main = async () => {
    const url = 'http://challenge.z2o.cloud/challenges';

    let body = {
        nickname: nickname
    }

    let options = {
        method: 'post',
        body: JSON.stringify(body),
        headers: headers,
    }

    let resData = await (await fetch(url, options)).json();

    headers['X-Challenge-Id'] = resData.id;

    options.method = 'put';

    while (!resData.result) {
        if (Date.now() === resData.called_at) {
            resData = await (await fetch(url, options)).json();
        }
    }

    console.log(resData);
}

main();