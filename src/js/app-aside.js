Vue.component('app-aside',{
  props:['logoutvisible'],
  template:`
  <aside>
  <div class="upper">
    <ul>
      <li>
        <button class="buttonTop" @click="$emit('save')">保存</button>
      </li>
      <li>
        <button class="buttonTop" @click="$emit('share')">分享</button>
      </li>
      <li>
        <button class="buttonTop" @click="$emit('skin')" >换肤</button>
      </li>
      <li>
        <button class="buttonTop" @click="$emit('print')">打印</button>
      </li>
    </ul>
  </div>
  <div class="down">
    <button class="buttonDown" @click="$emit('logout')" v-show="logoutVisible = true">注销</button>
  </div>
</aside>
  `,
  methods:{
    gotoLogin(){
        this.$router.push('/login')
    },
    gotoSignUp(){
        this.$router.push('/signUp')
    }
},
})