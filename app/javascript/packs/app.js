import Vue from 'vue';
const Api = require('./api');

document.addEventListener("DOMContentLoaded", () => {
  var app = new Vue({
    el: '#app',
    data: {
      tasks: [],
      task: {},
      message: '',
      action: 'create'
    },
    components: {
      'task': {
        props: ['task'],
        template: `
                <div class="ui segment task" v-bind:class="task.completed ? 'done' : 'todo'">
                  <div class="ui grid">
                    <div class="left floated twelve wide column">
                      <div class="ui checkbox">
                        <input type="checkbox" name="task" v-on:click="$parent.toggleDone($event, task.id)" :checked="task.completed">
                        <label>{{ task.name }} <span class="description">{{ task.description }}</span></label>
                      </div>
                    </div>
                    <div class="right floated three wide column">
                      <i class="icon pencil blue" alt="Edit" v-on:click="$parent.editTask($event, task.id)"></i>
                      <i class="icon trash red" alt="Delete" v-on:click="$parent.deleteTask($event, task.id)"></i>
                    </div>
                  </div>
                </div>`
      }
    },
    computed: {
      completedTasks: function() {
        return this.tasks.filter( item => item.completed == true );
      },

      todoTasks: function() {
        return this.tasks.filter( item => item.completed == false );
      },
      nextId: function(){
        return (this.tasks.sort(function(a,b){ return a.id - b.id; }))[this.tasks.length - 1].id + 1;
      }
    },
    methods: {
      listTasks: function() {
        Api.listTasks().then(function(response){
          app.tasks = response;
        })
      },
      clear: function(){
        this.task = {};
        this.action = 'create';
        this.message = '';
      },
      toggleDone: function(event, id) {
        event.stopImmediatePropagation();
        let task = this.tasks.find( item => item.id == id );
        if (task) {
          task.completed = !task.completed;
          this.message = `Task ${id} updated.`
        }
      },
      createTask: function(event) {
        if (!this.task.completed){
          this.task.completed = false;
        } else {
          this.task.completed = true;
        }
        let taskId = this.nextId;
        this.task.id = taskId;
        let newTask = Object.assign({}, this.task);
        this.tasks.push(newTask);
        this.clear();
        this.message = `Task ${taskId} created.`
      },
      deleteTask: function(event, id) {
        event.stopImmediatePropagation();
        let taskIndex = this.tasks.findIndex( item => item.id == id );
        if (taskIndex > -1) {
          this.$delete(this.tasks, taskIndex);
          this.message = `Task ${id} deleted.`
        }
      },
      editTask: function(event, id) {
        this.action = 'edit';
        let task = this.tasks.find( item => item.id == id );
        if (task) {
          this.task = { id: id, name: task.name, description: task.description, completed: task.completed };
        }
      },
      updateTask: function(event, id) {
        event.stopImmediatePropagation();
        let task = this.tasks.find( item => item.id == id );
        if (task) {
          task.name = this.task.name;
          task.description = this.task.description;
          task.completed = this.task.completed;
          this.message = `Task ${id} updated.`
        }
      }
    },
    beforeMount() { this.listTasks() }
  })
});  