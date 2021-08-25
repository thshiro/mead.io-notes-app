import chalk from "chalk"

const doneMsg = () => {
    const msgDone = chalk.green.inverse.bold('Done!')
    console.log(msgDone)
}

export {
    doneMsg
}