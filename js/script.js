var today = new Date();


// Google Analytics
// (function (i, s, o, g, r, a, m) {
// 	i["GoogleAnalyticsObject"] = r;
// 	i[r] = i[r] || function () {
// 		(i[r].q = i[r].q || []).push(arguments)
// 	}, i[r].l = 1 * new Date();
// 	a = s.createElement(o),
// 		m = s.getElementsByTagName(o)[0];
// 	a.async = 1;
// 	a.src = g;
// 	m.parentNode.insertBefore(a, m)
// })(window, document, "script", "//www.google-analytics.com/analytics.js", "ga");

// ga("create", "", "auto");
// ga("send", "pageview");


// 画面幅がspならtrueを返す
function isSpWidth() {
	if ($(window).outerWidth() <= 767.98) {
		return true;
	}
	return false;
}


// TopページのNewsをnews.htmlから取得
$(window).on("load", function () {
	if ($(".top-page").length) {

		//news.htmlから上から3件を取得し、パースする
		$.ajax({
				type: 'GET',
				url: 'news.html',
				dataType: 'html',
			}).done(function (data) {
				// 取得できた時
				var text = "";
				var $html = $(data).find("#news_group");

				$html.find(".news_item").each(function (i, elm) {
					if (i <= 2) {
						var date = $(elm).find(".time").text().split('/');

						var id = $(elm).prop("id");

						var text_date = date[0] + "年" + date[1] + "月" + date[2] + "日";

						text += "<dl><dt>" + text_date + "</dt><dd><a href='news.html#" + id + "'>" + $(elm).find(".card-header p").first().text() + "</a></dd></dl>";
					}
				});

				$("#news_box").html(text);
			})
			.fail(function () {
				// 取得できなかった時
				$("#news_box").html("<p>読込みに失敗しました. </p>");
			});
	}
});


// update表示
$(function () {

	var date = new Date(document.lastModified);

	// updateした年
	var update_year = date.getFullYear();
	// updateした月
	var update_month = date.getMonth() + 1;
	// updateした日
	var update_day = date.getDate();

	var html = "Last Update: " + update_year + "." + update_month + "." + update_day;

	$("#update").html(html);
});


// copyright表示
$(window).on("load resize", function () {
	// 今日の年
	var year = today.getFullYear();

	// SPかPCかで切り替え
	if (isSpWidth()) {
		var html = "Copyright &copy; 2020 - " + year + " <br>Demo Photography Club.<br>All Rights Reserved.";
	} else {
		var html = "Copyright &copy; 2020 - " + year + " Demo Photography Club. All Rights Reserved.";
	}

	$("#copyright").html(html);
});


// clockのアイコン, new_Labelを表示
$(function () {
	if ($(".clock").length) {
		$(".clock").each(function (i, elm) {
			$(elm).prepend("<i class='far fa-fw fa-clock'></i>");

			var posted_date = new Date($(elm).text());

			// .clockの後に.end_dateで終了日を指定しているか
			if ($(this).next('.end_date')) {
				var specified_date = new Date($(this).next(".end_date").text());
				var deadline = specified_date.setDate(specified_date.getDate() + 1);
			} else {
				// .end_dateがない時は投稿日から14日間
				var deadline = posted_date.setDate(posted_date.getDate() + 15);
			}

			// deadlineは翌日の00:00:00に指定してある
			if (deadline - today.getTime() > 0) {
				$(elm).parent().addClass("new_label");
			}
		});
	}
});

/* **************************************************
	Effect, Animation
************************************************** */

// SP対応のため、":hover"のeffect
$(function () {
	//動的に追加された要素が存在する可能性があるので$(document)~とする
	$(document).on("touchstart mousedown mouseover", "a, button, .card-header", function () {
		$(this).addClass("touch");

	}).on("touchend mouseup mouseout", "a, button, .card-header", function () {
		$(this).removeClass("touch");
	});

});


// ページトップのanimation
$(function () {
	// #のanchorをclickした処理
	$("#pagetop").on("click", function () {
		// scroll speed(mms)
		var speed = 1000;
		// anchorの値取得
		var href = $(this).attr("href");
		// 移動先を取得
		var target = $(href == "#" || href == "" ? "html" : href);
		// 移動先を数値で取得
		var position = target.offset().top;
		// scroll
		$("body, html").animate({
			scrollTop: position
		}, speed, "swing");
		return false;
	});
});


// navが開いた時のanimationについて
$(function () {
	$("#nav_btn").on("click", function () {
		var change_i = $(this).children("i");

		if (change_i.hasClass("fa-bars")) {
			var remove = "fa-bars";
			var add = "fa-times";

			btn_anime(change_i, remove, add, false);
		} else {
			var removeitem = "fa-times";
			var additem = "fa-bars";

			btn_anime(change_i, removeitem, additem, true);
		}
	});

	// 回転させながらアイコンを変更するanimation
	function btn_anime(tar, re, ad, inv) {
		tar.fadeOut(300);
		$({
			deg: 0
		}).animate({
			deg: inv ? -360 : 360
		}, {
			duration: 1000,
			// 途中
			progress: function () {
				$(tar).css({
					transform: "rotate(" + this.deg + "deg)"
				});
			}
		});
		setTimeout(function () {
			tar.removeClass(re).addClass(ad).fadeIn(300);
		}, 300);
	}
});


// footerのアイコンのeffect
$(function () {
	$("footer").find("i").on("touchstart mousedown mouseover", function () {
		$(this).addClass("fa-spin");
	}).on("touchend mouseup mouseout", function () {
		$(this).removeClass("fa-spin");
	});
});


// hoverで暗くするeffect
$(function () {
	$("#dark").on("touchstart mousedown mouseover", function () {
		$("#" + $(this).attr("date-target")).css({
			"background": "rgba(0, 0, 0, 0.7)",
			"transition": "0.5s all"
		});
	}).on("touchend mouseup mouseout", function () {
		$("#" + $(this).attr("date-target")).css({
			"background": "",
		});
	});
});


// Topページparallaxのanimation
$(window).on("load resize", function () {
	if ($(".top-page").length && isSpWidth()) {
		var window_h = $(window).height();
		var timer;

		$(window).on("scroll", function () {

			//debounceで、処理回数を減らす
			clearTimeout(timer);

			timer = setTimeout(function () {

				var scroll = $(this).scrollTop() - $("#parax").offset().top;

				$("head").find("style").html(".top-page::before { background-position: center " + parseInt(window_h * 0.03 + (scroll + window_h) * 0.1) + "px" +
					", center " + parseInt(window_h * 0.33 + (scroll + window_h) * 0.15) + "px" +
					", center " + parseInt(window_h * 0.63 + (scroll + window_h) * 0.2) + "px }");

			}, 10);
		});
	}
});


/* **************************************************
	新歓関係
************************************************** */

$(function () {
	// 3月から5月
	if (today.getMonth() + 1 >= 3 && today.getMonth() + 1 <= 5) {
		// topページのバナー
		if ($(".top-page").length) {
			$("#top").removeClass("hidden");
		}

		// navbarにWelcomeを追加
		if (!$(".welcome-page").length) {
			$(".navbar-nav").append("<a href='welcome.html'><li>WELCOME</li></a>");
		}
	}
});


/* **************************************************
	Others
************************************************** */


// Newsページのtoggle関係
$(window).on("load resize", function () {
	if ($(".news-page").length) {
		$("#news_group .card-header").on("click", function () {
			// sp用 (PCはCSSで全て開く)
			if (isSpWidth()) {
				// クリック時に開くように
				$(this).next().collapse("toggle");
			} else {
				$(this).next().collapse({
					"toggle": false
				});
			}
		});
	}
});

// NewsページでURLにIDがある時、toggleを開く
$(window).on("load", function () {

	if ($(".news-page").length) {
		var hash = $(location).prop('hash');
		if (hash) {
			// IDの要素を開く
			$(hash).find(".card-block").collapse("show");

			// 読み込み後、navbar分だけ下へscrollさせる
			$("body, html").animate({
				scrollTop: $(hash).offset().top - 70,
				duration: 0.2,
			});
		}
	}
});


// Linkページのform表示
$(function () {
	$("#toggleform").on("click", function () {
		$("#memberform").removeClass("invisible");
	});
});
