Vue.component('skinpicker',{
  template:`
    <div class="skinPicker"  v-cloak>
    <button @click="setTheme('default')">
      默认皮肤
    </button>
    <button @click="setTheme('dark')">
      奢华暗黑
    </button>
    <button @click="setTheme('white')">
      至尊商务
    </button>
    <span @click="close">关闭</span>  
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