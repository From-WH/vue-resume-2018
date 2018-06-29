Vue.component('share',{
  props:['sharelink'],
  template:`
  <div class="share" v-cloak>
    <textarea readonly>{{sharelink}}</textarea>
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