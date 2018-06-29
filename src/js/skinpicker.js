Vue.component('skinpicker',{
  template:`
    <div class="skinPicker"  v-cloak>
    <button class="button1" @click="setTheme('default')">
      默认皮肤
    </button>
    <button class="button2" @click="setTheme('dark')">
      奢华暗黑
    </button>
    <button class="button3" @click="setTheme('white')">
      至尊商务
    </button>
    <svg class="icon" @click="close" aria-hidden="true">
      <use xlink:href="#icon-close"></use>
    </svg>  
  </div>
  `,
  methods:{
    setTheme(name){
      document.body.className = name
    },
    close(){
      root.skinPickerVisible = false
    }
  },
})