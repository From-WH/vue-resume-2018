Vue.component('skinpicker',{
  methods:{
    setTheme(name){
      document.body.className = name
    }
  },
  template:`
    <div class="skinPicker" v-cloak>
    <button @click="setTheme('default')">
      默认皮肤
    </button>
    <button @click="setTheme('dark')">
      奢华暗黑
    </button>
    <button @click="setTheme('white')">
      至尊商务
    </button>
  </div>
  `
})