let app = new Vue({
  el: '#page',
  data: {
    editting: false,
    loginVisible:false,
    signUpVisible:false,
    resume: {
      name: '王航',
      jobTitle: '前端开发工程师',
      birthday: '1992年10月',
      gender: '男',
      emal: 'from-wh@hotmail.com',
      phone: '1234556789',
    },

  },
  methods: {
    onEdit(key, value) {
      this.resume[key] = value  //console.log(this === app)
    },
    onClickSave() {
      var currentUser = AV.User.current();
      if (!currentUser) {
         this.showLogin()
      }
      else {
        saveResume()
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
    showLogin(){
      this.loginVisible = true
    },
    showsignUp(){
      this.signUpVisible = true
    },
    saveResume(){

    },
  }
})