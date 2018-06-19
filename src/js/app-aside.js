Vue.component('app-aside',{
  props:['logoutVisible'],
  template:`
  <aside>
  <div class="upper">
    <ul>
      <li>
        <button class="buttonTop" v-on:click="$emit('save')">保存</button>
      </li>
      <li>
        <button class="buttonTop" @click="$emit('share')">分享</button>
      </li>
      <li>
        <button class="buttonTop" @click="$emit('changeTheme')">换肤</button>
      </li>
      <li>
        <button class="buttonTop" @click="$emit('print')">打印</button>
      </li>
    </ul>
  </div>
  <div class="down">
    <button class="buttonDown" @click="$emit('logout')" v-show="logoutVisible">注销</button>
  </div>
</aside>
  `
})