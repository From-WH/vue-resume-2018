Vue.component('resume',{
  props:['mode','displayResume'],
  data(){
    return{

    }
  },
  methods:{
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
  },
  template:`
        <div class="resume">
        <section>
          <h1>
            <editable-span :disabled="mode ==='preview'" v-bind:value="displayResume.name" v-on:edit="onEdit('name' , $event)"></editable-span>
          </h1>
          <p>应聘职位：
            <editable-span :disabled="mode ==='preview'" v-bind:value="displayResume.jobTitle" v-on:edit="onEdit('jobTitle' , $event)"></editable-span>
          </p>
          <p class="profile">生日：
            <editable-span :disabled="mode ==='preview'" v-bind:value="displayResume.birthday" v-on:edit="onEdit('birthday' , $event)"></editable-span>
            ||性别：
            <editable-span :disabled="mode ==='preview'" v-bind:value="displayResume.gender" v-on:edit="onEdit('gender' , $event)"></editable-span>
            ||Email：
            <editable-span :disabled="mode ==='preview'" v-bind:value="displayResume.emal" v-on:edit="onEdit('emal' , $event)"></editable-span>
            ||Phone：
            <editable-span :disabled="mode ==='preview'" v-bind:value="displayResume.phone" v-on:edit="onEdit('phone' , $event)"></editable-span>
          </p>
        </section>
        <section class="skills">
          <h2>技能</h2>
          <ul>
            <li class="skillSet" v-for="skill,index in displayResume.skills">
              <editable-span class="name" :disabled="mode ==='preview'" :value="skill.name" @edit="onEdit('skills['+index+'].name',$event)"></editable-span>
              <div class="description">
                <editable-span :disabled="mode ==='preview'" :value="skill.description" @edit="onEdit('skills['+index+'].description',$event)"></editable-span>
              </div>
              <button id="remove" class="remove" v-if="index>=4 && mode==='edit'" @click="delateSkill(index)">X</button>
            </li>
            <li class="addAndRemove" v-if="mode==='edit'">
              <button @click="addSkill">添加技能</button>
              <button @click="delateSkill">删除上一个</button>
            </li>
          </ul>
        </section>
        <section class="projects">
          <h2>项目经历</h2>
          <ol>
            <li v-for="project,index in displayResume.projects">
              <header>
                <div class="start">
                  <h3 class="name">
                    <editable-span :disabled="mode ==='preview'" :value="project.name" @edit="onEdit('projects['+index+'].name', $event)"></editable-span>
                  </h3>
                  <span class="link">
                    <editable-span :disabled="mode ==='preview'" :value="project.link" @edit="onEdit('projects['+index+'].link' , $event)"></editable-span>
                  </span>
                </div>
                <div class="end">
                  <li class="keywords">
                    <editable-span :disabled="mode ==='preview'" :value="project.keywords" @edit="onEdit('projects['+index+'].keywords' , $event)"></editable-span>
                  </li>
                </div>
              </header>
              <p class="description">
                <editable-span :disabled="mode ==='preview'" :value="project.description" @edit="onEdit('projects['+index+'].description', $event)"></editable-span>
              </p>
              <button class="remove" v-if="index>=2 && mode==='edit'" @click="delateProject">删除</button>
            </li>
            <li class="addAndRemove" v-if="mode==='edit'">
              <button class="add" @click="addProject">添加项目</button>
              <button class="removeTwo" @click="delateProject">删除项目</button>
            </li>
          </ol>
        </section>
      </div>
  `
})