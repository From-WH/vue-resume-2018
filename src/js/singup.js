window.SignUp={
  data(){
    return{
      signUp: {
        email: '',
        password: '',
      },
    }
  },
  methods:{
    onSignUp(e) {
      const user = new AV.User();
      // 设置用户名
      user.setUsername(this.signUp.email);
      // 设置密码
      user.setPassword(this.signUp.password);
      // 设置邮箱
      user.setEmail(this.signUp.email);
      user.signUp().then((user) => {
        user = user.toJSON()
        this.$emit('singUp',user)
        alert('注册成功，开始编辑你的简历吧')
      }, function (error) {
        alert('注册失败！')
      });
    },
    onClickLogin(e){
      this.$emit('goToLogin ')
    }
  },
  template:`
    <div class="signUp" v-cloak>
    <form class="form" @submit.prevent="onSignUp">
      <!-- .prevent 事件修饰符 -->
      <h2>Sign up</h2>
      <router-link to="/"><svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-close"></use>
      </svg></router-link>
      <!-- 不加type会出现aleat内容-->
      <div class="row">
        <input type="email" required="required" placeholder="设置登录邮箱" v-model="signUp.email">
      </div>
      <div class="row">
        <input type="password" required="required" placeholder="设置登录密码" v-model="signUp.password">
      </div>
      <div class="actions">
        <button class="but1" type="submit">submit</button>
        <router-link class="but2" to="/login">login</router-link>
      </div>
    </form>
  </div>
  `
}
Vue.component('signup',window.signUp)