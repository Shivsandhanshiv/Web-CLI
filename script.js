let fs = { '/': {} };
let currentPath = ['/'];

function getCurrentDir() {
  let dir = fs['/'];
  for (let i = 1; i < currentPath.length; i++) {
    dir = dir[currentPath[i]];
  }
  return dir;
}

function handleCommand(input) {
  const parts = input.trim().split(' ');
  const cmd = parts[0];
  const args = parts.slice(1);
  const currentDir = getCurrentDir();

  switch (cmd) {
    case 'ls':
      return Object.keys(currentDir).join('  ');
    case 'mkdir':
      if (!args[0]) return "Usage: mkdir <dirname>";
      currentDir[args[0]] = {};
      return "";
    case 'touch':
      if (!args[0]) return "Usage: touch <filename>";
      currentDir[args[0]] = "file";
      return "";
    case 'cd':
      if (!args[0]) return "Usage: cd <dirname>";
      if (args[0] === '..') {
        if (currentPath.length > 1) currentPath.pop();
      } else if (currentDir[args[0]] && typeof currentDir[args[0]] === 'object') {
        currentPath.push(args[0]);
      } else {
        return "Directory not found";
      }
      return "";
    case 'clear':
      document.getElementById('terminal').innerHTML = '';
      return "";
    default:
      return "Command not recognized";
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const input = document.getElementById('cliInput');
  const terminal = document.getElementById('terminal');
  
  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      const command = input.value;
      if (!command.trim()) return;
      
      const output = handleCommand(command);
      const path = '/' + currentPath.slice(1).join('/');
      
      terminal.innerHTML += `
        <div class="command">user@web-cli:${path}$ ${command}</div>
        <div class="output">${output}</div>
      `;
      
      input.value = '';
      terminal.scrollTop = terminal.scrollHeight;
    }
  });
  
  input.focus();
});