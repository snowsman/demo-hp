# DEMOフォトサークルのウェブサイト

## 目次

* 概要
* 備考
	* NEWSページ
	* WELCOMEページ


## 概要

これは、デモウェブサイト( https://snowsman.github.io/demo-hp/ )です。


## 備考

### NEWSページ

news.htmlにある#news_group内に上から追加していくこと。

```html
<div id="news_【番号】>" class="card news_item">
	<div class="card-header">
		<p>【タイトル】</p>
		<p class="time clock">【投稿年/投稿月/投稿日】</p>
		<p class="end_date">【終了年/終了月/終了日】</p>
	</div>

	<div class="card-block collapse">
		<p>【写真展名】を以下の日程で開催します。</p>
		<p><b>日にち</b>: 【日にち】</p>
		<p><b>時間</b>: 【時間】</p>
		<p><b>場所</b>: 【場所】</p>
		<div class="map_box">
			<iframe src="【Google Mapの埋め込みリンク】" width="800" height="400" frameborder="0" style="border:0" allowfullscreen></iframe>
		</div>
		<hr>
		<p>【何かコメント】</p>
		<div class="img_box">
			<a class="swipebox" href="image/news/【画像1ファイル名】"><img src="image/news/【画像1ファイル名】"></a>
			<a class="swipebox" href="image/news/【画像2ファイル名】"><img src="image/news/【画像2ファイル名】"></a>
		</div>
	</div>
</div>
```

* 【番号】: 一意の連番になるように、**半角数字**で、(前回の投稿の番号)+1とする
* 【タイトル】: トップページにも表示される。NEWSのタイトル
* 【投稿年/投稿月/投稿日】: 2020/11/01のように**半角数字**で**スラッシュで区切って**記述する
* 【終了年/終了月/終了日】: 記述形式は投稿年月日と同様であるが、必須ではない。不要な時は**pタグごと**削除する。Newラベルの表示を終了する日。
* 【Google Mapの埋め込みリンク】: 不要な場合は、**.map_boxタグごと**削除する
* 【画像ファイル名】: DMの画像ファイル名。画像はimage/news/のディレクトリに配置すること
* 【番号】、【投稿年月日】や【終了年月日】についてはjsで表示される

### WELCOMEページ

* 毎年3/1になるとjsにより、勝手にnavbarに新歓ページへのリンクとトップページのバナーが追加され、6/1になると消える仕様である。
