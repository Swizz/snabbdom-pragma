/* eslint unicorn/no-process-exit: 0 */

const execSync = require('child_process').execSync
const fs = require('fs')
const simpleGit = require('simple-git')()

const baseBranch = process.argv[2] || 'develop'

function buildSnabbdom(suffix) {
  execSync('npm run build', { stdio: [0, 1, 2] })
  fs.writeFileSync(`perf/snnabdom-${suffix}.js`, fs.readFileSync('dist/index.js', 'utf-8'), 'utf-8')
}

simpleGit.status((err, status) => {
  if (err) {
    console.error('Error getting status')
    process.exit(1)
  } else {
    const currentBranch = status.current
    if (currentBranch === baseBranch) {
      console.error('Current branch is already ' + baseBranch)
      process.exit(1)
    } else {
      console.log('Building ' + currentBranch + ' branch')
      buildSnabbdom('new')
      simpleGit.checkout(baseBranch, (err) => {
        if (err) {
          console.error('Error checkout ' + baseBranch)
        } else {
          console.log('Building ' + baseBranch + ' branch')
          buildSnabbdom('base')
        }
        simpleGit.checkout(currentBranch)
        if (err) {
          process.exit(1)
        }
      })
    }
  }
})
