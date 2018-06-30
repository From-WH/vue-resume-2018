window.Login={
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
    <h2>Login</h2>
    <router-link to="/"><svg class="icon" aria-hidden="true">
    <use xlink:href="#icon-close"></use>
    </svg></router-link>
    <div class="row">
      <input type="email" required="required" placeholder="邮箱" v-model="login.email">
    </div>
    <div class="row">
      <input type="password" required="required" placeholder="密码" v-model="login.password">
    </div>
    <div class="actions">
      <button class="but1" type="submit">Sign in resume</button>
      <router-link to="/signUp" class="but2">Sign up</router-link>
      </div>
      </form>
</div>
  `
}
Vue.component('login', window.Login)