const command = {
  name: 'edit',
  run: async (toolbox) => {
    const { print, filesystem, prompt } = toolbox

    const read = filesystem.read(filesystem.cwd() + '/tasks.json', 'json')
    const { tasks } = read
    const projects = tasks.map((item) => item.project)

    const askProject = {
      type: 'select',
      name: 'project',
      message: 'What project should we edit?',
      choices: await projects.filter(
        (item, index, self) => self.indexOf(item) === index
      ),
    }

    const { project } = await prompt.ask(askProject)

    const askDescription = {
      type: 'select',
      name: 'description',
      message: 'What task should we edit?',
      choices: await tasks
        .filter((item) => item.project === project)
        .map((x) => x.description),
    }

    const { description } = await prompt.ask(askDescription)

    const task = tasks.find(
      (item) => item.description === description && item.project === project
    )

    const askChange = {
      type: 'select',
      name: 'change',
      message: 'What should we edit?',
      choices: Object.keys(await task),
    }

    const { change } = await prompt.ask(askChange)

    const askUpdate = {
      type: 'input',
      name: 'update',
      message: 'What should we change it to?',
    }

    const { update } = await prompt.ask(askUpdate)

    task[change] = await update

    const newTasks = await tasks.filter(
      (item) => item.project !== project && item.description !== description
    )

    await newTasks.push(task)
    read.tasks = await newTasks
    filesystem.write(filesystem.cwd() + '/tasks.json', read)
    print.success('Task successfully updated!')
  },
}

module.exports = command
