window.App = {
  props: ['displayresume', 'mode', 'resume', 'logoutvisible'],
  template: `
  <div>
    <app-aside v-show="mode === 'edit'" :logoutvisible="logoutvisible"  @logout="onLogOut" @save="onClickSave" @share="onShare" @print="print" @skin="changeSkin"></app-aside>
    <main id="main">
      <resume :mode="mode" :displayresume="displayresume" :resume="resume"></resume>
    </main>
    <button class="exitPreview" @click="goHome" v-if="mode==='preview'">回到首页</button>
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
      shareLink: '不晓得',
      mode: 'edit' // 'preview'
    }
  },
  methods: {
    goHome() {
      window.location.href = location.origin + location.pathname;
    },
    hasLogin() {
      return !!root.currentUser.objectId
    },
    changeSkin() {
      root.skinPickerVisible = !root.skinPickerVisible
      root.shareVisible = false
    },
    onShare() {
      if (root.hasLogin()) {
        root.shareVisible = !root.shareVisible
        root.skinPickerVisible = false
      } else {
        alert('请先登录～')
      }
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
      console.log(currentUser);
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
      console.log(this.resume);
      
      user.set('resume', this.resume)
      user.save().then(() => {
        alert('保存成功')
      }, () => {

        alert('保存失败')
      })
    },
    onLogOut() {if(root.shareVisible = true){
      root.skinPickerVisible = false
    }else if(root.skinPickerVisible = true){
      root.shareVisible = false
    }
      AV.User.logOut();
      alert('注销成功')
      window.location.reload()
    },
    print() {
      window.print()
    },
  },
}
Vue.component('app', App)


