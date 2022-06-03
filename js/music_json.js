//创建XMLHttpRequest对象
var xhr = new XMLHttpRequest();

//推荐页面启动时发送数据请求
function load() {

	var src = "https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=5381&uin=" +
		"0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1526776727832";
	xhr.open("GET", src, true);
	xhr.onload = function() {
		var user = JSON.parse(this.responseText);
		pageData(user);
	}
	xhr.send();
}

//推荐页面的数据接收处理
function pageData(dataArr) {
	var slider_arr = dataArr.data.slider;
	var radioList_arr = dataArr.data.radioList;
	var songList_arr = dataArr.data.songList;

	//轮播图的数据
	g("img_4").innerHTML += `<a href="#"><img src="${slider_arr[4].picUrl}" /></a>`;
	g("img0").innerHTML += `<a href="${slider_arr[0].linkUrl}"><img src="${slider_arr[0].picUrl}" /></a>`;
	g("img1").innerHTML += `<a href="${slider_arr[1].linkUrl}"><img src="${slider_arr[1].picUrl}" /></a>`;
	g("img2").innerHTML += `<a href="${slider_arr[2].linkUrl}"><img src="${slider_arr[2].picUrl}" /></a>`;
	g("img3").innerHTML += `<a href="${slider_arr[3].linkUrl}"><img src="${slider_arr[3].picUrl}" /></a>`;
	g("img4").innerHTML += `<a href="${slider_arr[4].linkUrl}"><img src="${slider_arr[4].picUrl}" /></a>`;
	g("img_0").innerHTML += `<a href="#"><img src="${slider_arr[0].picUrl}" /></a>`;

	//电台的数据
	g('radio_img').innerHTML += `	<img src="${radioList_arr[0].picUrl}"/>`;
	g('img1_h3').innerHTML += `<h3 class="box2_h3">${radioList_arr[0].Ftitle}</h3>`;
	g('radio_img2').innerHTML += `	<img src="${radioList_arr[1].picUrl}"/>`;
	g('img2_h3').innerHTML += `<h3 class="box2_h3">${radioList_arr[1].Ftitle}</h3>`;

	//热门歌单的数据
	muisc_menu = ' ';
	music_url = ' ';
	for(i in songList_arr) {
		music_url = "https://y.qq.com/w/taoge.html?ADTAG=myqq&from=myqq&channel=10007100&id=" + songList_arr[i].id;
		var music_arr = Math.round((songList_arr[i].accessnum / 10000) * 100) / 100;
		muisc_menu += `<div class="menu_li"><a  class="menu_li_a" href="${music_url}"><div class="menu_li_a_box">
									<img src="${songList_arr[i].picUrl}"  /><span class="music_num"><i class="num"></i>${music_arr}万</span>
									<span class="a_box_span  icon_play"></span></div><div class="menu_txet">
									<h3 class="text_h3">${songList_arr[i].songListDesc}</h3>	<p class="text_p">${songList_arr[i].songListAuthor}</p></div></a></div>`;
	}
	g("menu_arr").innerHTML = muisc_menu;

}

//排行榜页面的数据请求发送
function botton_sw() {
	var src = "https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg?g_tk=5381&uin=0&format=" +
		"json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1527176721712";

	xhr.open("GET", src, true);
	xhr.onload = function() {
		var user_arr = JSON.parse(this.responseText);
		var user_topic = user_arr.data.topList;
		topic_arr(user_topic);
	}
	xhr.send();
}

//排行榜页面数据接收处理
function topic_arr(listArr) {
	imgsc = "";
	8
	DataArr = "";
	for(i in listArr) {

		music_url2 = "https://y.qq.com/w/toplist.html?ADTAG=myqq&from=myqq&channel=10007100&id=" + listArr[i].id + "&type=top";
		var num_arr = Math.round((listArr[i].listenCount / 10000) * 100) / 100;
		DataArr += `<li class="list_topic" data-id="${listArr[i].id}"><div class="topic_box" ><a href="#" class="box_a"><img src="${listArr[i].picUrl}" />
						<span class="box_span"><i class="icon"></i>${num_arr}万</span></a>		
						<div class="box_tite"><div class="tite_header"><h3 class="header_h3">${listArr[i].topTitle}</h3>			
						<p>1<span class="text_name">${listArr[i].songList[0].songname}</span>${listArr[i].songList[0].singername}</p>			
						<p>2<span class="text_name">${listArr[i].songList[1].songname}</span>${listArr[i].songList[1].singername}</p>
						<p>3<span class="text_name">${listArr[i].songList[2].songname}</span>${listArr[i].songList[2].singername}</p></div><i class="tite_icon"></i> </div></div></li>`;

	}
	g("get_topic").innerHTML = DataArr;
	music_datax();
}

//排行榜歌单获取
function Ranking(num) {
	var src = "https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=" +
		"json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&tpl=" +
		"3&page=detail&type=top&topid=" + num + "&_=1527833638664";

	xhr.open("GET", src, true);
	xhr.onload = function() {
		var musicList_arr = JSON.parse(this.responseText);
		music_listData(musicList_arr);

	}
	xhr.send();

}

var arrs = new Array();
//处理接收的数据
function music_listData(data_list) {

	var num = data_list;
	var music_datas = num.total_song_num;
	var dataList = num.songlist;
	musicData = "";
	musicData2 = "";
	var sx = "";
	musicData += `排行榜<span class="nums" id="numo">共${music_datas}首</span>`;
	for(var i = 0; i < dataList.length; i++) {
		var nam = i + 1;
		var list = dataList[i].data;
		var name = list.singer[0].name;
		musicData2 += `<li class="music_li"><div class="dy_x"><span class="dy">` + nam + `</span></div>	
				<div class="music_boxc"><div class="box"><h3><span class="musicNamex">${list.songname}</span></h3>		
				<p><span class="names">${name}</span></p>	</div></div></li>`;

	}

	g("data_arr").innerHTML = musicData2;
	g("num_txet").innerHTML = musicData;
	muiscListx();

}

//搜索页面《一》的数据请求发送
function botton_sw2() {
	var src = "https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg?g_tk=5381&uin=0&format" +
		"=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1527290327860";

	xhr.open("GET", src, true);
	xhr.onload = function() {
		var hot_arr = JSON.parse(this.responseText);
		var hot_data = hot_arr.data;
		hotData(hot_data);
	}
	xhr.send();
}

//搜索页面《一》的数据数据处理
function hotData(data) {
	var hotArr = data.hotkey;
	data_arr = "";
	data_arr += `<a href="${data.special_url}" class="tags_a tags_swing">${data.special_key}</a>`;
	for(var i = 0; i < 15; i++) {
		data_arr += `<a href="javascript:;" class="tags_a">${hotArr[i].k}</a>`;
	}
	g("hot_arr").innerHTML = data_arr;
	dataName();
}

//搜索页面《二》的歌手、歌曲数据请求发送
function getHot(name) {
	//	console.log(name);
	var srcx = "https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?g_tk=5381&uin=" +
		"0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=" +
		"h5&needNewCode=1&w=" + name + "&zhidaqu=1&catZhida=1&t=0&flag=1&ie=" +
		"utf-8&sem=1&aggr=0&perpage=20&n=20&p=1&remoteplace=txt.mqq.all&_=1527300400956";
	//	console.log(srcx);
	xhr.open("GET", srcx, true);
	xhr.onload = function() {
		var dataArr = JSON.parse(this.responseText);
		var musicList = dataArr.data;
		List_arr(musicList);

	}
	xhr.send();
}

//搜索页面《二》的歌手、歌曲数据接收处理
function List_arr(arr) {
	music_list = "";
	var arrData = arr.song.list;
	var img = arr.zhida.albummid;
	if(img == undefined) {} else {
		var urs = "https://y.gtimg.cn/music/photo_new/T002R68x68M000" + img + ".jpg?max_age=2592000";
		music_list += `<li class="data_list" id="list_id"><span class="list_sp"><img src="${urs}"  />
					</span><h6 class="list_h6">${arr.zhida.albumname}</h6><p class="list_p">${arr.zhida.singername}</p></li>`;
	}

	for(i in arrData) {
		var imagex = "https://y.gtimg.cn/music/photo_new/T002R68x68M000" + arrData[i].albummid + ".jpg?max_age=2592000";
		music_list += `<li class="data_list" id="list_id"><span class="list_sp"><img src="${imagex}"  />
								</span><h6 class="list_h6">${arrData[i].songname}</h6><p class="list_p">${arrData[i].singer[0].name}</p></li>`;
	}
	g("list_id").innerHTML = music_list;

}

//歌词搜索
function musicLrc(music_name, singer_name) {

	var src2 = "http://songsearch.kugou.com/song_search_v2?callback=jQuery1124018929040221628912_" +
		"1528534467000&keyword=" + music_name + "&page=1&pagesize=30&userid=-1&clientver=&platform" +
		"=WebFilter&tag=em&filter=2&iscorrection=1&privilege_filter=0&_=1528534467012";

	var str = "";
	xhr.open("GET", src2, true);
	xhr.onload = function() {
		var ms = this.responseText;
		var mx = ms.substring(ms.indexOf("(") + 1);
		var arr = mx.split(")");
		for(i in arr) {
			str += arr[i];
		}
		var data_c = JSON.parse(str);
		var listData = data_c.data.lists;
		data_lrc(listData);

	}

	xhr.send();

}

//处理请求回来的歌曲表单数据
function data_lrc(DataArr) {
	var arr2 = new Array();
	var num = 0;
	var mus_name = "";
	var sin_name = "";
	for(i in DataArr) {
		//歌曲名 、歌手名
		var music_FileName = DataArr[i].FileName;
		if(/^[\u4e00-\u9fa5]/.test(music_names)) {
			if(/^[\u4e00-\u9fa5]/.test(singer_names)) {
				console.log("中文匹配成功")
				Chinese();
			}
		} else if(/^[a-zA-Z]/.test(music_names)) {
			if(/^[a-zA-Z]/.test(singer_names)) {
				console.log("英文匹配成功")
				English();
			}
		} else {
			console.log("日韩匹配成功")
			Korea();
		}

	}

	function Korea() {
		//处理歌曲名
		var music = new RegExp(music_names)
		var music_namex = music.exec(music_FileName);
		if(music_namex !== null) {
			mus_name = music_namex[0];
		}

		//处理歌手名
		var singer = new RegExp(singer_names)
		var singer_namex = singer.exec(music_FileName);
		if(singer_namex !== null) {
			sin_name = singer_namex[0];
		}

		console.log("处理的歌曲名：" + mus_name)
		console.log("处理的歌手名：" + sin_name)

		num++;
		//判断匹配
		if(music_names == mus_name) {
			console.log("歌曲名匹配成功----> 《模块一》")

			if(singer_names == sin_name) {
				console.log("歌手名匹配成功----> 《模块二》")
				arr2.push(num);
				if(num == arr2[0]) {
					console.log("匹配第一首成功----> 《模块三》")
					music_url();
				}

			}
		}
	}

	//英文歌曲处理
	function English() {
		//处理歌曲名
		var music = new RegExp(music_names)
		var music_namex = music.exec(music_FileName);
		if(music_namex !== null) {
			mus_name = music_namex[0];
		}

		//处理歌手名
		var singer = new RegExp(singer_names)
		var singer_namex = singer.exec(music_FileName);
		if(singer_namex !== null) {
			sin_name = singer_namex[0];
		}

		console.log("处理的歌曲名：" + mus_name)
		console.log("处理的歌手名：" + sin_name)

		num++;
		//判断匹配
		if(music_names == mus_name) {
			console.log("歌曲名匹配成功----> 《模块一》")

			if(singer_names == sin_name) {
				console.log("歌手名匹配成功----> 《模块二》")
				arr2.push(num);
				if(num == arr2[0]) {
					console.log("匹配第一首成功----> 《模块三》")
					music_url();
				}

			}
		}
	}

	//中文歌曲处理
	function Chinese() {
		//处理歌曲名
		var music = new RegExp(music_names)
		var music_namex = music.exec(music_FileName);

		if(music_namex !== null) {
			mus_name = music_namex[0];
		}

		//处理歌手名
		var singer = new RegExp(singer_names)
		var singer_namex = singer.exec(music_FileName);
		if(singer_namex !== null) {
			sin_name = singer_namex[0];
		}

		//查找伴奏
		var str = new RegExp("伴奏")
		var str_name = str.test(music_FileName);

		console.log("处理的歌曲名：" + mus_name)
		console.log("处理的歌手名：" + sin_name)

		num++;
		//判断匹配
		if(music_names == mus_name) {
			console.log("歌曲名匹配成功----> 《模块一》")

			if(singer_names == sin_name) {
				console.log("歌手名匹配成功----> 《模块二》")

				if(str_name == false) {
					console.log("不等于伴奏成功----> 《模块三》")
					if(num == 1) {
						console.log("匹配第一首成功----> 《模块三》")
						music_url();
					}
				}
			}
		}
	}

	//音乐路径
	function music_url() {
		var musicID = DataArr[i].AlbumID;
		var musicHash = DataArr[i].FileHash;
		lrc_data(musicID, musicHash);

	}

}

function lrc_data(dataID, hash) {

	var src2 = "http://www.kugou.com/yy/index.php?r=play/getdata&hash=" + hash + "&album_id=" + dataID + "&_=1528585196953";
	xhr.open("GET", src2, true);
	xhr.onload = function() {
		var data_id = JSON.parse(this.responseText);
		var data_s = data_id.data;
		g("getImg").src = data_s.img;
		g("singer_img").src = data_s.img;
		g("mask_img").style.backgroundImage = "url(" + data_s.img + ")";
		g("musicDatas").src = data_s.play_url;
		g("musicDatas").autoplay = true;
		if(g("musicDatas").autoplay = true) {
			g("img_id").setAttribute("class", "imgs");
		}

		lrc_id(data_s);

	}
	xhr.send();
}

function lrc_id(lrc) {
	var arr2 = new Array();
	var lrcData = lrc.lyrics;
	//第一次分割
	var lrc_a = lrcData.split("[");
	lrc_data2 = "";
	for(i in lrc_a) {
		//第二次分割
		var lrc_b = lrc_a[i].split("]");
		//获取歌词
		var mus_lrc = lrc_b[1];
		//分割时间
		var timer = lrc_b[0].split(".");
		// 取到分钟和秒
		var stime = timer[0].split(":");
		// 转换成秒数
		var ms = stime[0] * 60 + stime[1] * 1 - 1 + "." + timer[1];
		if(mus_lrc !== undefined) {
			if(ms => 0) {
				arr2.push(ms);
				//将歌词存入容器里面
				lrc_data2 += `<p>${mus_lrc}</p>`;
			}
		}

	}
	g("lrc").innerHTML = lrc_data2;
	music_ms(arr2);
}