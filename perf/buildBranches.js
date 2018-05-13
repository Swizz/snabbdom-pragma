const execSync = require('child_process').execSync
const fs = require('fs');
const simpleGit = require('simple-git')();

const baseBranch = 'develop'

function buildSnabbdom(suffix) {
  execSync('npm run build', {stdio: [0, 1, 2]});
  fs.writeFileSync(`perf/snnabdom-${suffix}.js`, fs.readFileSync('dist/index.js', 'utf-8'), 'utf-8')
}

simpleGit.status((err, status) => {
  if (err) {
    console.error('Error getting status')
  } else {
    const currentBranch = status.current
    if (currentBranch === baseBranch) {
      console.warn('Current branch is already ' + baseBranch)
    } else {
      buildSnabbdom('new')
      simpleGit.checkout(baseBranch, (err, data) => {
        if (err) {
          console.error('Error checkout ' + baseBranch)
        } else {
          buildSnabbdom('base')          
        }
        simpleGit.checkout(currentBranch)
      })
    }  
  }
})