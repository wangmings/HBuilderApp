$(function(){
	
	$("#musicDatas").ontimeupdate = function(){
	// 获取总时长
		var time = this.duration;
		// 获取播放时长
		var stime = this.currentTime;
		console.log(stime);
		//格式化时间
	//	var ftime = formartTime(stime);
	alert(1);
	}
	
	
		
	
})
