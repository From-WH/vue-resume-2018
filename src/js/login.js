Vue.component('login', {
  data() {
    return {
      login: {
        email: "",
        password: ''
      },
    }
  },
  methods:{
    onLogin(e) {
      AV.User.logIn(this.login.email, this.login.password).then((user) => {
        user = user.toJSON()
        this.$emit('login',user)
      }, (error) => {
        if (error.code === 211) {
          alert('还没有注册喔～快去注册吧')
        } else if (error.code === 210) {
          alert('邮箱和密码不匹配喔')
        }
      });
    },
    onClickSignUp(){
      this.$emit('goToSignUp')  //这里是要加this的  下面html里是不用加this的
    }
  },
  template: `
  <div class="login" v-cloak>
  <form @submit.prevent="onLogin" class="form">
    <h2>登录</h2>
    <button type="button" @click="$emit('close')">退出</button>
    <div class="row">
      <label>邮箱</label>
      <input type="text" v-model="login.email">     
    </div>
    <div class="row">
      <label>密码</label>
      <input type="password" v-model="login.password">
    </div>
    <div class="actions">
      <button type="submit">确定</button>
      <a @click="onClickSignUp" href="#">注册</a>
    </div>
  </form>
</div>
  `
})