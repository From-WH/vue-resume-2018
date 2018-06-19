window.App = {
  template: `
  <div>
    <app-aside v-show="mode === 'edit'" :logout-visible="true"  @logout="onLogOut" @save="onClickSave"></app-aside>
    <main>
      <resume :mode="mode" :display-resume="displayResume"></resume>
    </main>
    <button class="exitPreview" @click="mode='edit'" v-if="mode==='preview'">退出预览</button>
  </div>
  `,
  data() {
    return {
      editting: false,
      loginVisible: false,
      signUpVisible: false,
      shareVisible: false,
      skinPickerVisible: false,
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
      shareLink: '不晓得',
      mode: 'edit' // 'preview'
    }
  },
  methods: {
    onShare() {
      if (this.hasLogin()) {
        this.shareVisible = true
      } else {
        alert('请先登录～')
      }
    },
    onLogin(user) {
      this.currentUser.id = user.id
      this.currentUser.email = user.email
      this.loginVisible = false
      window.location.reload()
    },
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

    hasLogin() {
      return !!this.currentUser.objectId
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
    print() {
      window.print()
    },

  },
  computed: {
    displayResume() {
      return this.mode === 'preview' ? this.previewResume : this.resume
    }
  },
}
Vue.component('app', App)