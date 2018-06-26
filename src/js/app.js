window.App = {
  props: ['displayresume', 'mode', 'resume', 'logoutvisible'],
  template: `
  <div>
    <app-aside v-show="mode === 'edit'" :logoutvisible="true"  @logout="onLogOut" @save="onClickSave" @share="onShare" @print="print" @skin="changeSkin"></app-aside>
    <main id="main">
      <resume :mode="mode" :display-resume="displayResume"></resume>
    </main>
    <button class="exitPreview" @click="mode='edit'" v-if="mode==='preview'">退出预览</button>
  </div>
  `,
  data() {
    return {
      editting: false,
      loginVisible: false,
      logoutvisible: false,
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
      shareLink: '不晓得',
      mode: 'edit' // 'preview'
    }
  },
  methods: {
    hasLogin() {
      return !!root.currentUser.objectId
      console.log(this.currentUser.objectId);
      
    },
    changeSkin() {
        root.skinPickerVisible = true
    },
    onShare() {
      if (root.hasLogin()) {
        root.shareVisible = true
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