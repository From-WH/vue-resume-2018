Vue.component('editable-span', {
  props: ['value','disabled'],
  template: `
  <span class="editableSpan">      
    <span v-show="!editting">{{value}}</span>
    <input v-show="editting" type="text" v-bind:value="value" v-on:input="triggerEdit">   
    <svg v-if="!disabled" v-on:click="editting = !editting" class="icon" aria-hidden="true">
      <use xlink:href="#icon-plus-edit"></use>
    </svg>
  </span>
  `,
  //input的值就是父集传的value   v-bind:value="value"
  //input如果有输入事件  就触发triggerEdit   v-on:input="triggerEdit
  //所有的都是声明式
  data() {
    return {
      editting: false
    }
  },
  methods: {
    triggerEdit(e) {
      this.$emit('edit', e.target.value)
    },
    onEditing(){
      this.editing = true;
  }
  }
})