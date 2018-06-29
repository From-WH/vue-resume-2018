Vue.component('share',{
  props:['sharelink'],
  template:`
  <div class="share" v-cloak>
    <textarea readonly id="foo" value="https://github.com/zenorocha/clipboard.js.git">{{sharelink}}</textarea>
    <button class="btn" data-clipboard-target="#foo">
      点击复制链接
    </button>
    <svg class="icon" @click="close" aria-hidden="true">
        <use xlink:href="#icon-close"></use>
    </svg>
  </div>
  `,
  methods:{
    close(){
      root.shareVisible = false
    }
  }
})

var clipboard = new ClipboardJS('.btn');
//成功回调
clipboard.on('success', function(e) {
    console.info('Action:', e.action);
    console.info('Text:', e.text);
    console.info('Trigger:', e.trigger);  
    e.clearSelection();
    root.shareVisible = false
    alert('已复制到剪切板')
});
//失败回调
clipboard.on('error', function(e) {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
});

