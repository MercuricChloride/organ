const command = {
  name: 'list',
  run: async (toolbox) => {
    const { print, filesystem, prompt } = toolbox

    const { tasks } = await filesystem.read(
      filesystem.cwd() + '/tasks.json',
      'json'
    )

    const todo = await tasks.filter((item) => item.done != 'y')
    const projects = todo
      .map((item) => item.project)
      .filter((item, index, self) => self.indexOf(item) === index)

    projects.map((item, index) => {
      if (index == 0) print.highlight(item)
      else print.highlight('\n' + item)
      todo
        .filter((x) => x.project === item)
        .map((y) => print.info('\n' + '- [ ] ' + y.description))
    })
  },
}

module.exports = command
