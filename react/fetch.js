import fetch from 'dva/fetch';

function parseJSON(response) {
	return response.json();
}

function checkStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return response;
	}

	const error = new Error(response.statusText);
	error.response = response;
	throw error;
}
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
// export default function request(url, options) {
//   return fetch(url, options)
//     .then(checkStatus)
//     .then(parseJSON)
//     .then(data => ({ data }))
//     .catch(err => ({ err }));
// }

export default{
	get(url,params){
		let arr=[];
		for(var k in params){
			arr.push(k+'='+params[k]);
		}
		if(typeof params=='string' || typeof params=='boolean' || params instanceof Array){
			url+='';
		}else{
			url+='?'+arr.join('&');
		}
		return fetch(url,{
			method:'GET',
			mode: 'cors',
			headers:{
				"Content-Type": "application/x-www-form-urlencoded",
				"Accept":"application/json"
			}
		})
		.then(checkStatus)
		.then(parseJSON)
		.then((data)=>{return data;})
		.catch(err=>({err}));
	},
	post(url,params){
		let formData=new FormData();
		for(var k in params){
			formData.append(k,params[k]);
		}
		return fetch(url,{
			method:'POST',
			mode: 'cors',
			headers:{
				"Content-Type": "application/json",
				"Accept":"application/json",
				"xml": "application/xml, text/xml"
			},
			body:JSON.stringify(params)
		})
		.then(checkStatus)
		.then(parseJSON)
		.then((data)=>{return data;})
		.catch(err=>({err}));
	}
}
