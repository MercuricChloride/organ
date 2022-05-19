const command = {
  name: 'add',
  run: async (toolbox) => {
    const { print, filesystem, prompt } = toolbox

    const askProject = { type: 'input', name: 'project', message: 'What project is this task for?' }
    const askDescription = { type: 'input', name: 'description', message: 'Provide a description for the task' }
    const askDone = { type: 'input', name: 'done', message: 'Is the task done?' }

    const questions = [askProject, askDescription, askDone]

    const { project, description, done } = await prompt.ask(questions)

    const todo = {
        project: project,
        description: description,
        done: done
    }

    const tasks = filesystem.read(filesystem.cwd()+"/tasks.json",'json');
    tasks.tasks.push(todo);
    filesystem.write(filesystem.cwd()+"/tasks.json", tasks);
    print.success("Task successfully added!");
  },
}

module.exports = command
