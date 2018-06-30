//alert样式美化
(function () {
  window.alert = function (text) {
      //解析alert内容中的换行符
      text = text.toString().replace(/\\/g, '\\').replace(/\n/g, '<br />').replace(/\r/g, '<br />');
      // 自定义DIV弹窗
      var alertdiv = '<div id="alertdiv" style="position:absolute; display:none ; font-size:1.3em; overflow:hidden;padding:30px 30px; top: 50%; left: 50%; color: white;   border-radius: 6px; text-align:center; line-height:22px; background: #292931; border:1px solid #ccc">' + text + '<br /><input type="submit" name="button" id="button" value="OK" style="border-radius: 4px; font-size:16px; margin-top:10px; " onclick="$(this).parent().remove(); " /></div>';
      $(document.body).append(alertdiv);
      // 设置偏移数值，实现垂直和水平居中
      $("#alertdiv").css({
          "margin-left": $("#alertdiv").width() / 2 * (-1),
          "margin-top": $("#alertdiv").height() / 2 * (-1)-80
      });
      // 显示
      $("#alertdiv").show();
  };
})();