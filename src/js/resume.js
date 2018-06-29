Vue.component('resume', {
  props: ['mode', 'displayresume', 'resume'],
  data() {
    return {}
  },
  methods: {
    addSkill() {
      console.log(root.resume);
      root.resume.skills.push({
        name: '请填写技能名称',
        description: '请填写技能描述'
      })
    },
    delateSkill(index) {
      root.resume.skills.splice(index, 1) //splice，VUE的api，可以删除一个数组
    },
    addProject() {
      root.resume.projects.push({
        name: '请填写项目名称',
        link: 'http://xxx',
        keywords: '请填写技术栈',
        description: '请详细描述你的项目'
      })
    },
    delateProject(index) {
      root.resume.projects.splice(index, 1)
    },
    onEdit(key, value) {
      // this.resume[key] = value;
      let regex = /\[(\d+)\]/g
      key = key.replace(regex, (match, number) => `.${number}`)
      let keys = key.split('.');
      let result = root.resume;
      for (let i = 0; i < keys.length; i++) {
        if (i === keys.length - 1) {
          result[keys[i]] = value;
        } else {
          result = result[keys[i]];
        }
        //result = this.resume
        //keys = ['skills', '0', 'name']
        //i=0 result === result['skills'] === this.resume.skills
        //i=1 result === result['0'] === this.resume.skills.0
        //i=2 result === result['name'] === this.resume.skills.0.name
        //result === this.resume['skills']['0']['name']
      }
    },
  },
  template: `
        <div class="resume">
        <section class="header">
          <h1>
            <editable-span :disabled="mode ==='preview'" v-bind:value="displayresume.name" v-on:edit="onEdit('name' , $event)"></editable-span>
          </h1>
          <p>应聘职位：
            <editable-span :disabled="mode ==='preview'" v-bind:value="displayresume.jobTitle" v-on:edit="onEdit('jobTitle' , $event)"></editable-span>
          </p>
          <p class="profile">生日：
            <editable-span :disabled="mode ==='preview'" v-bind:value="displayresume.birthday" v-on:edit="onEdit('birthday' , $event)"></editable-span>
            ||性别：
            <editable-span :disabled="mode ==='preview'" v-bind:value="displayresume.gender" v-on:edit="onEdit('gender' , $event)"></editable-span>
            ||Email：
            <editable-span :disabled="mode ==='preview'" v-bind:value="displayresume.emal" v-on:edit="onEdit('emal' , $event)"></editable-span>
            ||Phone：
            <editable-span :disabled="mode ==='preview'" v-bind:value="displayresume.phone" v-on:edit="onEdit('phone' , $event)"></editable-span>
          </p>
        </section>
        <section class="skills">
          <h2>技能</h2>
          <ul>
            <li class="skillSet" v-for="skill,index in displayresume.skills">
              <editable-span class="name" :disabled="mode ==='preview'" :value="skill.name" @edit="onEdit('skills['+index+'].name',$event)"></editable-span>
              <div class="description">
                <editable-span :disabled="mode ==='preview'" :value="skill.description" @edit="onEdit('skills['+index+'].description',$event)"></editable-span>
              </div>
              <svg id="remove" class="remove" v-if="index>=4 && mode==='edit'" @click="delateSkill(index)" aria-hidden="true">
              <use xlink:href="#icon-shanchu"></use>
            </svg>
            </li>
            <li class="addAndRemove" v-if="mode==='edit'">
              <svg class="icon" @click="addSkill" aria-hidden="true">
              <use xlink:href="#icon-zengjia"></use>
            </svg>
              <svg class="icon" @click="delateSkill" aria-hidden="true">
              <use xlink:href="#icon-jianqu"></use>
            </svg>
            </li>
          </ul>
        </section>
        <section class="projects">
          <h2>项目经历</h2>
          <ol>
            <li v-for="project,index in displayresume.projects">
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
              <svg class="remove" v-if="index>=2 && mode==='edit'" @click="delateProject(index)" aria-hidden="true">
                <use xlink:href="#icon-shanchu"></use>
              </svg>
            </li>
            <li class="addAndRemove" v-if="mode==='edit'">
              <svg class="icon" @click="addProject" aria-hidden="true">
                <use xlink:href="#icon-zengjia"></use>
              </svg>
              <svg class="icon" @click="delateProject" aria-hidden="true">
                <use xlink:href="#icon-jianqu"></use>
              </svg>
            </li>
          </ol>
        </section>
      </div>
  `,
  
})