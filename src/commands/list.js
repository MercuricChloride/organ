const command = {
  name: 'list',
  run: async (toolbox) => {
    const { print, filesystem, prompt } = toolbox

    const tasks = await filesystem.read(filesystem.cwd()+"/tasks.json",'json').tasks;

    const todo = await tasks.filter(item => item.done != "y")

    todo.map(item => print.info("- [ ] " + item.description) )


    for(let i=0; i<todo.length; i++){
    }
  },
}

module.exports = command
