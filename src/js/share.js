Vue.component('share',{
  props:['sharelink'],
  template:`
  <div class="share" v-cloak>
    <h3>分享链接</h3>
    <textarea readonly>{{sharelink}}</textarea>
  </div>
  `
})