//《1》定义一个处理id、class的通用函数
var g = function(id) {
	if(id.substr(0, 1) == '.') {
		return document.getElementsByClassName(id.substr(1));
	}
	return document.getElementById(id);
}

//《2》app启动时全屏显示
if(window.plus) {
	// 全屏显示
	plus.navigator.setFullscreen(true);
} else {
	document.addEventListener('plusready', plusReady, false);
}

//《2-8》 app启动后调用
function plusReady() {
	if(window.plus) {
		// 非全屏显示
		plus.navigator.setFullscreen(false);
	}

}

//《3-9》调用轮播图
function slider() {
	//《3》获得轮播图slider插件对象
	var gallery = mui('.mui-slider');
	gallery.slider({
		interval: 4000 //自动轮播周期，若为0则不自动播放，默认为0；
	});

	document.querySelector('.mui-slider').addEventListener('slide', function(event) {
		//注意slideNumber是从0开始的；
		var imga = event.detail.slideNumber;
		//		console.log(imga);
		//获取所有的轮播图
		var img = g('.img_i');
		//清除按钮属性music_active
		for(var i = 0; i < img.length; i++) {
			img[i].className = img[i].className
				.replace(' music_active', '');
		}
		g('.img_i')[imga].className += ' music_active';

	});

}

//app启动时自动发送请求获取数据
g("load_app").onload = function() {
	load();
}

function nvaBotton() {
	var num1 = 0;
	var num2 = 0;
	var numv = 0;
	//向左滑动
	g("load_app").addEventListener("swipeleft", function() {
		if(numv == 0) {
			numv = 0
		} else {

			claerClass();
			numv--;
			g(".nva_b")[numv].className += " nva_botton";
			g(".music_display")[numv].className += " display_box";
		}

		//		console.log(numv);
	});

	//向右滑动
	g("load_app").addEventListener("swiperight", function() {

		if(numv == 2) {
			numv = 2
		} else {

			claerClass();
			numv++;
			g(".nva_b")[numv].className += " nva_botton";
			g(".music_display")[numv].className += " display_box";

		}

		//		console.log(numv);
		if(numv == 1) {
			num1++;
			if(num1 == 1) {
				botton_sw();
			}
		}

		if(numv == 2) {
			num2++;
			if(num2 == 1) {
				botton_sw2();
				search();
			}
		}

	});

	//清除样式
	function claerClass() {
		var nva_b = g(".nva_b");
		var box_a = g(".music_display");
		//清除每一个的class样式
		for(var b = 0; b < nva_b.length; b++) {
			nva_b[b].className = nva_b[b].className
				.replace(' nva_botton', '');
			box_a[b].className = box_a[b].className
				.replace(' display_box', '');
		}
	}
}

nvaBotton();

headingEvents();
//封装《标题导航栏》点击事件
function headingEvents() {
	//《4》导航栏按钮的点击事件处理
	var nva_box = g(".nva_b");
	var box_a = g(".music_display");
	for(var i = 0; i < nva_box.length; i++) {
		//给每一个按钮添加索引
		nva_box[i].index = i;
		//给按钮添加计数器
		var num1 = 0;
		var num2 = 0;
		//给每一个按钮添加点击事件
		nva_box[i].addEventListener("tap", function() {
			var a = this.index;
			//清除每一个的class样式
			for(var b = 0; b < nva_box.length; b++) {
				nva_box[b].className = nva_box[b].className
					.replace(' nva_botton', '');
				box_a[b].className = box_a[b].className
					.replace(' display_box', '');
			}
			//点击添加class样式
			nva_box[a].className += " nva_botton";
			box_a[a].className += " display_box";

			//点击《排行榜》按钮触发的事件
			if(a == 1) {
				num1++;
				if(num1 == 1) {
					botton_sw();
					//					music_datax();
				}
			}

			//点击《搜索》按钮触发的事件
			if(a == 2) {
				num2++;
				if(num2 == 1) {
					botton_sw2();
					search();
				}
			}

		});

	}
}

//《搜索》页面所有事件封装
function search() {

	//《5》处理搜索页面的所有点击事件
	g("inpot").addEventListener("tap", function() {

		g("claer").style.display = "block";
	});

	//给搜索的《取消》按钮添加点击事件
	g("claer").addEventListener("tap", function() {
		g("claer").style.display = "none";
		g("myInput").value = "";
		g("mx").style.display = "none";
		g("hot_sw").style.display = "block";
		g("list_id").style.display = "none";
	});

	//给键盘《回车键》添加点击事件
	g("myInput").onkeydown = function(event) {

		if(event.keyCode == 13) {
			//获取输入框的数据
			var data = g("myInput").value;
			//判断是否有数据输入		
			if(data == "") {
				alert("请输入.......")
			} else {

				getHot(data);
				g("list_id").style.display = "block";
				g("hot_sw").style.display = "none";
			}

		}
	}

	//给输入框添加输入检测事件
	g("myInput").oninput = function() {
		//	获取输入的长度
		var a = g("myInput").value.length;
		//判断输入是否大于0触发事件
		if(a > 0) {
			g("mx").style.display = "block";

		}
		//判断输入是否等于0触发事件
		if(a == 0) {
			g("mx").style.display = "none";
		}
	}

	//给输入框添加点击事件
	g("myInput").addEventListener("tap", function() {
		//	g("myInput").style.placeholder="none";
		g("hot_sw").style.display = "none";
	});

	//给输入框的《小图标》添加点击事件
	g("mx").addEventListener("tap", function() {
		g("myInput").value = "";
		this.style.display = "none";
		g("list_id").style.display = "none";
	});

}

//《6》获取所有的热门标题的《歌曲、歌手名》
function dataName() {
	var muName = g(".tags_a");
	console.log(muName);
	for(i in muName) {
		muName[i].onclick = function() {
			var name = this.innerHTML;
			g("myInput").value = name;
			getHot(name);
			g("hot_sw").style.display = "none";
			g("list_id").style.display = "block";
			g("claer").style.display = "block";

		}
	}

}

//《7》获取页面所有的图片，用以预加载使用		
function imagex() {
	var imga = document.getElementsByTagName("img");
	console.log(imga);
	//计数器
	var numx = 0;
	for(var i = 0; i < imga.length; i++) {
		//创建图片对象
		var imgx = new Image();
		//每一张图片的加载状态
		imgx.onload = function() {
			numx++;
			if(numx == i) {
				g("load_music").style.display = "block";
				g("loadImg").style.display = "none";
				plusReady();
				setTimeout(slider, 500);

			}

		}
		//得到每一张图片的链接付给图片对象
		imgx.src = imga[i].src;
	}
}

//页面加载完触发的获取图片		
document.onreadystatechange = function() {
	if(document.readyState == "complete") {
		setTimeout(imagex, 1000);
	}
}

function sw_bottom() {
	//上滑动
	g("load_music"), addEventListener("swipeup", function() {
		g("bottom_play").setAttribute("class", "sw_play");
	})
	//下滑动
	g("load_music"), addEventListener("swipedown", function() {
		g("bottom_play").setAttribute("class", "");
	})

	g("bottomx").addEventListener("tap", function() {
		g("mask2").setAttribute("class", "mask sw_mask");
		//		g("bottom_play").setAttribute("class", "");	
		g("load_music").style.display = "none";
		if(window.plus) {
			//设置系统状态栏样式为深色前景色样式
			plus.navigator.setStatusBarStyle('light');
		}

	});

	g("return").addEventListener("tap", function() {
		g("mask2").setAttribute("class", "mask");
		g("bottom_play").setAttribute("class", "sw_play");
		g("load_music").style.display = "block";
		if(window.plus) {
			//设置系统状态栏样式为深色前景色样式
			plus.navigator.setStatusBarStyle('dark');
		}
		
	});
}

sw_bottom();

//排行榜
function music_datax() {

	function datax() {
		var li_arr = g(".list_topic");
		console.log(li_arr);
		for(i in li_arr) {
			li_arr[i].index = i;
			li_arr[i].onclick = function() {
				var num = this.index;
				g("bottn_nva").style.display = "none";
				g("music_box").style.marginTop = "0";
				var id = li_arr[num].getAttribute("data-id");
				Ranking(id);
				botton_swx();
			}
		}

	}

	setTimeout(datax, 1000);

}

//排行榜歌单返回事件
function bottn_a() {
	g("bottn_a").addEventListener("tap", function() {
		g("music_list").style.display = "";
		g("none_p").style.display = "";
		g("music_box").style.marginTop = "";
		g("bottn_nva").style.display = "block";
		g("bottom_play").setAttribute("class", "");
	})
}
bottn_a();

function botton_swx() {
	g("none_p").style.display = "none";
	g("music_list").style.display = "block";

}

//排行榜里面的歌单信息
var mmc = 0;

function muiscListx() {
	var listArr = g(".music_li");
	console.log(listArr);
	for(i in listArr) {
		listArr[i].index = i;
		listArr[i].onclick = function() {
			mmc = this.index;
			g("bottom_play").setAttribute("class", "sw_play");
			g("play_b").className = g("play_b").className.replace(' pause2', '');
			g("play_b").className += " pause2";
			g("music_a").className = g("music_a").className.replace(' pause', '');
			g("music_a").className += " pause";
			music_namex();
			g("img_id").setAttribute("class", "imgs");

		}
	}

}

//播放暂停
g("music_a").addEventListener("tap", function() {
	playBotton();
})
//UI播放暂停	
g("play_b").addEventListener("tap", function() {
	playBotton();
})

function playBotton() {
	var names = g("music_a").className;
	if(names == "music_Play pause") {
		g("music_a").className = g("music_a").className.replace(' pause', '');
		g("play_b").className = g("play_b").className.replace(' pause2', '');
		g("musicDatas").pause();
		g("img_id").setAttribute("class", "");
	} else {
		g("musicDatas").play();
		g("music_a").className += " pause";
		g("play_b").className += " pause2";
		g("img_id").setAttribute("class", "imgs");
	}
}

//上一曲
function music_x() {

	g("play_a").addEventListener("tap", function() {
		play_s();
	})
	g("music_c").addEventListener("tap", function() {
		play_s();
	})

	function play_s() {
		mmc--;
		if(mmc > 0) {
			console.log("上一曲：" + mmc);
		}
		var names = g("music_a").className;
		if(names !== "music_Play pause") {
			g("music_a").className += " pause";
			g("play_b").className += " pause2";
		}
		g("lrc").style.transform = "translateY(0)";    
		music_namex();
		music_v();
		return mmc;
	}
}
music_x();

//下一曲
function nextSong() {
	g("music_b").onclick = function() {
		numv();
	}
	g("play_c").onclick = function() {
		numv();
	}

	function numv() {
		mmc++;
		console.log("下一曲：" + mmc);
		var names = g("music_a").className;
		if(names !== "music_Play pause") {
			g("music_a").className += " pause";
			g("play_b").className += " pause2";
		}
		g("lrc").style.transform = "translateY(0)"; 
		music_namex();
		music_v();
		return mmc;
	}

}
nextSong();

//初始化所有的状态
function music_v() {
	g("sm_s").style.left = "";
	g("pro_s2").style.width = "";
	g("musicDatas").load();
	g("musicDatas").pause();
	g("mask_img").style.backgroundImage = "";
	g("singer_img").src = "img/mxz.jpg";
	g("img_id").setAttribute("class", "");
}

//点击进度条和拖动进度条的处理
function _clicks() {
	g("sm_s").addEventListener('touchmove', function(event) {
		var div1 = g("pro_box");
		//取消事件的默认动作
		event.preventDefault();
		//获取元素的样式
		var styles = window.getComputedStyle(div1, null);
		//获取元素的宽，然后取数字
		var widths = parseInt(styles.width);
		//获取真实的实际宽度
		var windows = window.screen.width;
		var num_x = (windows - widths) / 2;

		//当前对象上所有触摸点的列表
		if(event.targetTouches.length == 1) {
			var touch = event.targetTouches[0];
			console.log(touch)
			var moveleft = (touch.pageX - num_x);

			//判断开始位置
			if(moveleft <= 0) {
				moveleft = 0;
			};

			//判断结束位置	
			if(moveleft >= widths) {
				moveleft = widths;
			}
			var num = (moveleft / widths) * 100;

			g("sm_s").style.left = num + "%";
			g("pro_s2").style.width = num + "%";

			//检测手指是否离开屏幕了
			g("sm_s").addEventListener('touchend', function(event) {
				g("musicDatas").currentTime = g("musicDatas").duration * (moveleft / widths);
				g("musicDatas").play();

				var names = g("music_a").className;
				if(names !== "music_Play pause") {
					g("music_a").className += " pause";
					g("play_b").className += " pause2";
				}
			})

		};

	})
	
	

	g("pro_s").onclick = function(event) {
		var div1 = g("pro_s");
		//获取元素的样式
		var styles = window.getComputedStyle(div1, null);
		//获取元素的宽，然后取数字
		var widths = parseInt(styles.width);
		//获取真实的实际宽度
		var windows = window.screen.width;
		var num_x = (windows - widths) / 2;

		var sm = (event.clientX) - num_x;
		//判断结束位置	
		if(sm >= widths) {
			sm = widths;
		}
		var vm = (sm / widths) * 100;

		g("sm_s").style.left = vm + "%";
		g("pro_s2").style.width = vm + "%";
		g("musicDatas").currentTime = g("musicDatas").duration * (sm / widths);
		g("musicDatas").play();
		var names = g("music_a").className;
		if(names !== "music_Play pause") {
			g("music_a").className += " pause";
			g("play_b").className += " pause2";
		}
	}

}

_clicks();

//处理歌曲名字显示和获取歌曲专辑图片和歌词部分
function music_namex() {
	var name = g(".musicNamex")[mmc].innerHTML;
	var singer = g(".names")[mmc].innerHTML;
	var n = "— " + singer + " —";
	g("music_name").innerHTML = name;
	g("music_singer").innerHTML = singer;
	g("musicName").innerHTML = name;
	g("singer_name").innerHTML = n;
	musicLrc(name, singer);
	dispose(name, singer);

}

var music_names = "";
var singer_names = "";

function dispose(musicName, singerName) {

	music_names = dispose_name(musicName);
	singer_names = dispose_name2(singerName);
	console.log("歌单歌曲名处理：" + music_names);
	console.log("歌单歌手名处理：" + singer_names);

	//中文处理歌曲名
	function dispose_name(musicName) {
		
		var music = musicName.split(" ");
		if(music[1] !== undefined) {
			musicName = music[0];
			return musicName;
		}
		
		
		var music = musicName.split("(");
		if(music[1] !== undefined) {
			musicName = music[0].replace(/\s*/g, "");
			console.log(musicName)
			return musicName;
		}
		
		return musicName;
	}

	//中文处理歌手名
	function dispose_name2(singerName) {
		var singerx = singerName.split("（");
		if(singerx[1] !== undefined) {
			singerName = singerx[0];
			return singerName;
		}

		var singerx3 = singerName.split("(");
		if(singerx3[1] !== undefined) {
			singerName = singerx3[0];
			console.log(singerName)
			return singerName;
		}

		var singerx2 = singerName.split("(");
		if(singerx2[1] !== undefined) {
			//取出匹配正则表达式获取小括号的内容
			var singerName = singerName.substring(singerName.indexOf("(") + 1, singerName.indexOf(")"));
			return singerName;
		}

		return singerName;

	}
}

//循环、单曲、播放模式
function play_s() {
	var num = 0;
	g("bottn_a2").addEventListener("tap", function() {
		num++;
		if(num == 1) {
			g("bottn_a2").className = " music_3";
			g("musicDatas").addEventListener('ended', function() {
				mmc;
				music_plays2();
			}, false);
		}
		if(num == 2) {
			num = 0;
			var mv = g("numo").innerHTML;
			var data_w = mv.replace(/[^0-9]/ig, "");
			g("bottn_a2").className = " music_2";
			g("musicDatas").addEventListener('ended', function() {
				var numc = Math.random();
				numc = Math.ceil(numc * data_w);
				mmc = numc;
				music_plays2();
			}, false);
		}

	})

}

play_s();


//判断是否播放完毕
function music_plays2() {
	
	g("musicDatas").addEventListener('ended', function() {
		mmc++;
		g("lrc").style.transform = "translateY(0)";
		var name = g(".musicNamex")[mmc].innerHTML;
		var singer = g(".names")[mmc].innerHTML;
		var n = "— " + singer + " —";
		g("music_name").innerHTML = name;
		g("music_singer").innerHTML = singer;
		g("musicName").innerHTML = name;
		g("singer_name").innerHTML = n;
		musicLrc(name, singer);
		music_v();
		music_namex();
		return mmc;
	}, false);
}
music_plays2();




var data_time = 0;
//处理歌曲时间和歌词滚动部分
function music_ms(data2) {
	//音乐的时间和播放进度的处理
	g("musicDatas").ontimeupdate = function() {
		// 获取总时长
		var time = this.duration;
		// 格式化时间
		var ftime = formartTime(time);
		// 获取播放时长
		var stime = this.currentTime;
		var ftime2 = formartTime(stime);
		// 获取播放的进度
		var pbit = stime / time;
		// 转换成百分比
		var percent = pbit * 100;
		var ms_t = -parseInt(percent) + "%";
		g("pro_s2").style.width = percent + "%";
		g("sm_s").style.left = percent + "%";
		g("mu_s").innerHTML = ftime2;
		if(ftime !== "NaN : NaN") {
			g("ms").innerHTML = ftime;
		}
		

	}

	// 定义格式化日期的函数
	function formartTime(time) {
		var m = Math.floor(time / 60);
		var s = Math.floor(time % 60);
		return(m < 10 ? "0" + m : m) + " : " + (s < 10 ? "0" + s : s);
	}
		
	
	var sd=0;
	//歌词处理<动态>
	data_time = data2;
	var lin_timer = 0;
	g("musicDatas").addEventListener("timeupdate", function() {
		var lrc_p = g("lrc").children;
		for(i in lrc_p){
			lrc_p[i].className="";
		}
		
		// 获取当前播放时间	
		var timer = this.currentTime;
		for(i in data_time) {
			var lrc_s = data_time[i];
			if(timer > lrc_s) {
				lin_timer = i;
			}
		}
			
		g("lrc").children[lin_timer].className= "ms_x";
		var lrc_h =	g("lrc").clientHeight;
		var lrc_box = g("musicx").clientHeight;
		var box_Height = lrc_box / 2;
		var trans_h = lrc_h - lrc_box;
		var p_top = g("lrc").children[lin_timer].offsetTop;
		var p_height = g("lrc").children[0].scrollHeight;
		var mc = p_top - box_Height + p_height;	
		if(p_top > box_Height) {	
		    g("lrc").style.transform = "translateY(-"+mc+"px)";    
		}
		
//		if(mc > trans_h){
//			g("lrc").style.transform = "translateY(-"+(trans_h +10)+"px)"; 
//		}
		
		
		
		//滑动歌词滚动条事件
		function scroll_s(){
			var t1 = 0;
			var t2 = 0;
			var timers = null; // 定时器	
			// scroll监听
			g("musicx").onscroll = function() {
				clearTimeout(timers);
				timers = setTimeout(isScrollEnd, 1000);
				t1 = g("musicx").scrollTop;
			}
			
			function isScrollEnd() {
				t2 = g("musicx").scrollTop;
				if(t2 == t1){
					g("musicx").scrollTop = 0;
				}
			}
		}
		scroll_s();

	})	

}

