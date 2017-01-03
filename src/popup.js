function $(tag){
	return document.querySelector(tag);
}
chrome.runtime.sendMessage('Hello', function(response){
	console.log( response );
   	// $('.con').innerText = response.type;

   	if( response.type==0 ){
   		$('.title').innerHTML = '<p>'+response.url+'</p><p><span style="color:#42b735">此页面已部署https</span></p>';
   	}else{
   		$('.title').innerHTML = '<p>'+response.url+'</p><p><span style="color:#ef1616">此页面还未部署https</span></p>';
   	}
   	var html = '<div><table>',
   		len=response.data.length;
   	if( len ){
   		for(var i=0; i<len; i++){
	   		var item = response.data[i];

	   		html += '<tr><td>'+item[0]+'</td><td>'+item[1]+'</td></tr>';
	   	}
	   	html+= '</table></div>';
	   	$('.con').innerHTML = html;
	}else{
		$('.con').innerHTML = '页面无http请求，检测完毕';
	}
});

chrome.runtime.onMessage.addListener(function(request, sender, sendRequest) {
    console.log( request );
    console.log( sender );
});