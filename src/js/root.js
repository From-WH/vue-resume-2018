const routes = [{
    path: '/',
    component: window.App
  },
  {
    path: '/login',
    component: window.Login
  },
  {
    path: '/signup',
    component: window.SignUp
  },
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
const root = new Vue({
  router,
  data() {
    return {
      previewResume: {
      },
      currentUser: {},
      skinPickerVisible: false,
      shareVisible: false,
      shareLink: '不晓得',
      logoutVisible: false,
      mode: 'edit', //  'preview'
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
      currentUser: {
        objectId: undefined,
        email: '',
      },
      previewUser: {
        objectId: undefined,
      },
    }
  },
  methods: {
    hasLogin() {
      return !!this.currentUser.objectId
    },
    onLogin(user) {
      this.currentUser.objectId = user.objectId;
      this.currentUser.email = user.email;
      this.shareLink = location.origin + location.pathname + '?user_id=' + this.currentUser.objectId
      this.getResume(this.currentUser).then((resume) => {
        this.resume = resume
      })
      alert('登陆成功')
      this.$router.push('/')
      root.logoutVisible = true;
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
        this.$emit('singUp', user)
        alert('注册成功，开始编辑你的简历吧')
      }, function (error) {
        alert('注册失败！')
      });
    },
    onClickSave() {
      let currentUser = AV.User.current();
      if (!currentUser) {
        this.$router.push('./login')
      } else {
        this.saveResume()
      }
    },
    saveResume() {
      let {
        objectId
      } = AV.User.current().toJSON()
      let user = AV.Object.createWithoutData('User', objectId)
      console.log(user);
      
      console.log(this.resume);
      
      user.set('resume', root.resume)
      user.save().then(() => {
        alert('保存成功')
      }, () => {

        alert('保存失败')
      })
    },
    changeSkin() {
      if (root.skinPickerVisible === false) {
        root.skinPickerVisible = true
      } else {
        root.skinPickerVisible = false
      }
    },
    onLogOut() {
      AV.User.logOut();
      alert('注销成功')
      window.location.reload()
    },
    getResume(user) {
      let query = new AV.Query('User');
      return query.get(user.objectId).then((user) => {
        let resume = user.toJSON().resume
        return resume;
      }, (error) => {
        // 异常处理
      });
    },
  },
  computed: {
    displayresume() {
      return this.mode === 'preview' ? this.previewResume : this.resume
    }
  },
  watch: { //牛逼，监听
    'currentUser.objectId': function (newValue) {
      if (newValue) {
        this.getResume(this.currentUser).then((resume) => {
          this.resume = resume
        })
        this.shareLink = location.origin + location.pathname + '?user_id=' + this.currentUser.objectId
      }
    }
  },

}).$mount('#root')

console.log(root.previewResume);
console.log(root.resume);
// 获取当前用户
let currentUser = AV.User.current()
if (currentUser) {
  root.currentUser = currentUser.toJSON()
  root.shareLink = location.origin + location.pathname + '?user_id=' + root.currentUser.objectId
  root.getResume(root.currentUser).then(resume => {
    
    root.resume = resume
  })
}

// 获取预览用户的 id
let search = location.search
let regex = /user_id=([^&]+)/
let matches = search.match(regex)
let userId
if (matches) {
  userId = matches[1]
  root.mode = 'preview'
  root.getResume({
    objectId: userId
  }).then(resume => {
    root.previewResume = resume
  })
}

if(!!currentUser){
  root.logoutVisible = true;
}else{
  root.logoutVisible = false;
}



