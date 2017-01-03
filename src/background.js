var result = null;
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	// document.querySelector('.title').innerText = request.greeting;
    console.log(sender.tab ?
                "来自内容脚本：" + sender.tab.url :
                "来自扩展程序");
   	console.log( request );
    // if (request.greeting == "您好"){
    //   	sendResponse({farewell: "再见"});
    // }

    if(request == 'Hello'){
        if( result ){
        	sendResponse(result);
        }
    }else{
    	console.log(request);
	 	console.log(sender);
	 	result = request;
	 	result.url = sender.tab.url;
    	sendResponse('Hello to page.');
    }
});

// document.querySelector('.main .con').innerText = Date.now();