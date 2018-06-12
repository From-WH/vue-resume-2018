let app = new Vue({
  el: '#page',
  data: {
    editting: false,
    loginVisible: false,
    signUpVisible: false,
    currentUser: {
      objectId: undefined,
      email: '',
    },
    resume: {
      name: '王航',
      jobTitle: '前端开发工程师',
      birthday: '1992年10月',
      gender: '男',
      emal: 'from-wh@hotmail.com',
      phone: '1234556789',
    },
    signUp: {
      email: '',
      password: ''
    },
    login: {
      email: "",
      password: ''
    }
  },
  methods: {
    onEdit(key, value) {
      this.resume[key] = value  //console.log(this === app)
    },
    getresume(){
      var query = new AV.Query('User');
      query.get(this.currentUser.objectId).then((user)=> {
        let resume = user.toJSON().resume  
        this.resume = resume
      },  (error)=> {
        // 异常处理
      });
    },
    hasLogin() {
      return !!this.currentUser.objectId
    },
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
        this.currentUser.objectId = user.objectId
        this.currentUser.email = user.email
        this.loginVisible = false
        this.signUpVisible = false
        alert('注册成功，开始编辑你的简历吧')
      }, function (error) {
        alert('注册失败！')
      });
    },
    onLogin(e) {
      AV.User.logIn(this.login.email, this.login.password).then((user) => {
        user = user.toJSON()
        this.currentUser.objectId = user.objectId
        this.currentUser.email = user.email
        this.loginVisible = false
      }, (error) => {
        if (error.code === 211) {
          alert('还没有注册喔～快去注册吧')
        } else if (error.code === 210) {
          alert('邮箱和密码不匹配喔')
        }
      });
    },
    onClickSave() {
      let currentUser = AV.User.current();
      if (!currentUser) {
        this.loginVisible = true
      }
      else {
        this.saveResume()
      }
    },
    saveResume(){
      let {objectId} = AV.User.current().toJSON()
      let user = AV.Object.createWithoutData('User', objectId)
      user.set('resume', this.resume)
      user.save().then(() => {
        alert('保存成功')
      }, () => {
        alert('保存失败')
      })
    },
    onLogOut() {
      AV.User.logOut();
      alert('注销成功')
      window.location.reload()
    },
  }
})

let currentUser = AV.User.current()
if (currentUser) {
  app.currentUser = currentUser.toJSON()
  app.getresume()
}