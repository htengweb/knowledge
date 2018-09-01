```javascript
let loadingInstance
let needLoadingRequestCount = 0
let cookieId=''
// 请求拦截器
axios.interceptors.request.use((config) => {
	if (config.showLoading) {
		if (needLoadingRequestCount === 0) {
			loadingInstance = Loading.service({
			lock: true,
			text: '数据加载中...',
			spinner: 'el-icon-loading',
			background: 'rgba(0, 0, 0, 0.3)',
		  })
		}
		needLoadingRequestCount++
	}
	return config
},error=>{
	return Promise.reject(error)
})
// 响应拦截器
axios.interceptors.response.use((response) => {
	if (response.config.showLoading) {
		if (needLoadingRequestCount <= 0) return
			needLoadingRequestCount--
		if (needLoadingRequestCount === 0) {
			loadingInstance.close()
		}
	}
	cookieId=getCookie('cookieName')
	return response
},err=>{
	Message.error('请求错误:'+err)
	if (needLoadingRequestCount <= 0) return
		needLoadingRequestCount--
	if (needLoadingRequestCount === 0) {
		loadingInstance.close()
	}
  //判断cookie重新刷新页面
	if(getCookie('cookieName') && cookieId!==getCookie('cookieName')){
		window.location.reload()
	}
})
```
