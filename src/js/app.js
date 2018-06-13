let app = new Vue({
  el: '#page',
  data: {
    editting: false,
    loginVisible: false,
    signUpVisible: false,
    shareVisible: false,
    currentUser: {
      objectId: undefined,
      email: '',
    },
    previewUser: {
      objectId: undefined,
    },
    previewResume: {},
    resume: {
      name: '你好',
      jobTitle: '前端开发工程师',
      birthday: '1992年10月',
      gender: '女',
      emal: 'from-wh@hotmail.com',
      phone: '1234556789',
      skills: [{
          name: '请填写技能名称',
          description: '请填写技能描述'
        },
        {
          name: '请填写技能名称',
          description: '请填写技能描述'
        },
        {
          name: '请填写技能名称',
          description: '请填写技能描述'
        },
        {
          name: '请填写技能名称',
          description: '请填写技能描述'
        },
      ],
      projects: [{
        name: '请填写项目名称',
        link: 'http://xxx',
        keywords: '请填写技术栈',
        description: '请详细描述你的项目'
      }],
    },
    signUp: {
      email: '',
      password: ''
    },
    login: {
      email: "",
      password: ''
    },
    shareLink: '不晓得',
    mode: 'edit' // 'preview'
  },
  computed: {
    displayResume(){
      return this.mode === 'preview' ? this.previewResume : this.resume
    }
  },
  watch: {
    'currentUser.objectId': function (newValue, oldValue) {
      if (newValue) {
        this.getResume(this.currentUser)
      }
    }
  },
  methods: {
    onEdit(key, value) {
      let regex = reg = /\[(\d+)\]/g
      key = key.replace(regex, (match, number) => `.${number}`)
      keys = key.split('.')
      let result = this.resume
      for (let i = 0; i < keys.length; i++) {
        if (i === keys.length - 1) {
          result[keys[i]] = value
        } else {
          result = result[keys[i]]
        }
      }
    },
    getResume(user) {
      var query = new AV.Query('User');
      return query.get(user.objectId).then((user) => {
        let resume = user.toJSON().resume
        return resume
      }, (error) => {
        // 异常处理
      });
    },
    addSkill() {
      this.resume.skills.push({
        name: '请填写技能名称',
        description: '请填写技能描述'
      })
    },
    delateSkill(index) {
      this.resume.skills.splice(index, 1) //splice，VUE的api，可以删除一个数组
    },
    addProject() {
      this.resume.projects.push({
        name: '请填写项目名称',
        link: 'http://xxx',
        keywords: '请填写技术栈',
        description: '请详细描述你的项目'
      })
    },
    delateProject(index) {
      this.resume.projects.splice(index, 1)
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
      } else {
        this.saveResume()
      }
    },
    saveResume() {
      let {
        objectId
      } = AV.User.current().toJSON()
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
    print(){
      window.print()
    }
  }
})


// 获取当前用户
let currentUser = AV.User.current()
if (currentUser) {
  app.currentUser = currentUser.toJSON()
  app.shareLink = location.origin + location.pathname + '?user_id=' + app.currentUser.objectId
  app.getResume(app.currentUser).then(resume => {
    app.resume = resume
  })
}


// 获取预览用户的 id
let search = location.search
let regex = /user_id=([^&]+)/
let matches = search.match(regex)
let userId
if (matches) {
  userId = matches[1]
  console.log(userId)
  app.mode = 'preview'
  app.getResume({
    objectId: userId
  }).then(resume => {
    app.previewResume = resume
  })
}