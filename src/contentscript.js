;(function(){
    var tags = ['link', 'script', 'img', 'audio', 'video', 'iframe'], // 遍历的资源
    	host_protocol = window.location.protocol.replace(':',''), // 当前页面的协议
    	flag = true; // 是否打开上传

    // 获取元素
    var getElements = function(tag){
    	if( document.querySelectorAll ){
    		return document.querySelectorAll(tag);
    	}else{
    		return document.getElementsByTagName(tag);
    	}
    },
    getElement = function(tag){
    	return document.querySelector(tag);
    };

    // 获取背景图片
    var getBgImg = function(){
    	var _tags = getElements('body *'),
    		result = [];
    	for(var i=0, len=_tags.length; i<len; i++){
    		var item = _tags[i],
                backgroundImage = item.style.backgroundImage||'';

    		if( backgroundImage && backgroundImage!='initial' ){
    			// console.log(item.className, item.id, item.style.backgroundImage.replace(/url\((.*?)\)/ig,"$1"));
    			var url = item.style.backgroundImage.replace(/url\("(.*?)"\)/ig,"$1");
    			if( url.substr(0, 5)=='http:' ){
    				// console.warn('bgimg', item.id, url);
    				result.push( ['bgimg', url] );
    			}else{
                    // console.log('bgimg', item.id, url);
                }
    		}
    	}
    	// console.log(result, result.join('|'));
    	return result;
    }

    // 分别获取 ['link', 'script', 'img', 'audio', 'video', 'iframe'] 资源中http的数量
    var getProItem = function(tag){
    	var result = [];

        var item = getElements( tag ),
        	num = 0;

        for(var j=0, t=item.length; j<t; j++){
            var c = item[j];
            var url = c.getAttribute('href') || c.getAttribute('src') || c.href || c.src;

            if( url ){
                // a.href = url;
                // var protocol = a.protocol.replace(':','');
                var protocol = url.substr(0, 5);
                if( protocol=='http:' ){
                	// console.warn( tag, url );
                	result.push( [tag, url] );
                    num++;
                }else{
                    // console.log( tag, url );
                }
            }
        }

	    return result;
    }

    // 入口函数，获取页面中的http资源，包括背景图片
    var getUrl = function(){
    	var result = getBgImg(),
    		res_num = [],
    		bgimg_num = result.length;
    	// result = result.join('|');

    	bgimg_num && res_num.push( 'bgimg='+bgimg_num );

    	for(var i=0, len=tags.length; i<len; i++){
    		var _tag_res = getProItem(tags[i]),
    			len = _tag_res.length;

    		if( len ){
    			// result += _tag_res.join('|');
    			result = result.concat( _tag_res );
    			result.con
    			res_num.push( tags[i]+'='+len );
    		}
    	}
    	return [result, res_num.join('|')];
    }
    

    if( flag){
        var type = -1;
        if( host_protocol=='http' ){
            // console.info( '此页面还未部署https' );
            type = -2;
        }else{
            type = 0;
        }
        var s = getUrl();

        var load = window.chrome.loadTimes();
        console.log( '页面加载时间： '+ ((load.finishDocumentLoadTime-load.requestTime)*1000).toFixed(6) + ' ms' );
        chrome.runtime.sendMessage({type:type, data:s[0]}, function(response){
            console.log( response );
        });
    }
})();