const command = {
  name: 'edit',
  run: async (toolbox) => {
    const { print, filesystem, prompt } = toolbox

    const read = filesystem.read(filesystem.cwd() + '/tasks.json', 'json')
    const { tasks } = read
    let projects = []
    projects = tasks.filter((item) => item.project)

    const askProject = {
      type: 'select',
      name: 'project',
      message: 'What project should we edit?',
      choices: await projects.map((x) => x.project),
    }

    const { project } = await prompt.ask(askProject)

    const askDescription = {
      type: 'select',
      name: 'description',
      message: 'What task should we edit?',
      choices: await projects.map((x) => x.description),
    }

    const { description } = await prompt.ask(askDescription)

    const task = tasks.find((item) => item.description == description)

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

    task[change] = update

    const newTasks = await tasks.filter(
      (item) => item.project != project && item.description != description
    )

    await newTasks.push(task)
    read.tasks = newTasks
    filesystem.write(filesystem.cwd() + '/tasks.json', read)
    print.success('Task successfully updated!')
  },
}

module.exports = command
