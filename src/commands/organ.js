const command = {
  name: 'organ',
  run: async (toolbox) => {
    const { print, hello } = toolbox

    hello(69)
  },
}

module.exports = command
