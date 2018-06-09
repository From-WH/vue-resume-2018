var app = new Vue({
  el: '#page',
  data: {
    editting: false,
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
    }
  }
})