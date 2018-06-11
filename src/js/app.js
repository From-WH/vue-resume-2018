let app = new Vue({
  el: '#page',
  data: {
    editting: false,
    loginVisible: false,
    signUpVisible: false,
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
    onSignUp(e) {
      console.log(this.signUp)
      const user = new AV.User();
      // 设置用户名
      user.setUsername(this.signUp.email);
      // 设置密码
      user.setPassword(this.signUp.password);
      // 设置邮箱
      user.setEmail(this.signUp.email);
      user.signUp().then(function (users) {
        console.log(users);
      }, function (error) {
      });
    },
    onLogin(e) {
      AV.User.logIn(this.login.email, this.login.password).then(function (users) {
        console.log(users);
      }, function (error) {
        if (error.code = 211) {
          alert('还没有注册喔～快去注册吧')
        }else if(error.code === 210){
          alert('邮箱和密码不匹配喔')
        }
      });
    },
    onClickSave() {
      var currentUser = AV.User.current();
      if (!currentUser) {
        this.showLogin()
      }
      else {
        this.saveResume()
      }
      // // 声明类型
      // let User = AV.Object.extend('User')
      // // 新建对象
      // let user = new User()
      // // 设置名称
      // user.set('name', '工作')
      // // 设置优先级
      // user.set('priority', 1)
      // user.save().then(function (todo) {
      //   console.log('objectId is ' + todo.id);
      // }, function (error) {
      //   console.error(error)
      // })
    },
    saveResume() {
      // 第一个参数是 className，第二个参数是 objectId
      let {id} = AV.User.current()
      var user = AV.Object.createWithoutData('User', id)
      // 修改属性
      user.set('resume', this.resume)
      // 保存到云端
      user.save()
    },
  }
})