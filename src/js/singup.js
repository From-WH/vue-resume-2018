Vue.component('signup',{
  data(){
    return{
      signUp: {
        email: '',
        password: ''
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
      <h2>注册</h2>
      <button type="button" @click="signUpVisible = false">退出</button>
      <!-- 不加type会出现aleat内容-->
      <div class="row">
        <label>注册邮箱</label>
        <input type="text" v-model="signUp.email">
      </div>
      <div class="row">
        <label>密码</label>
        <input type="password" v-model="signUp.password">
      </div>
      <div class="actions">
        <button type="submit">提交</button>
        <a @click="onClickLogin" href="#">登录</a>
      </div>
    </form>
  </div>
  `
})