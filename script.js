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
  const parts = input.trim().split(' ').filter(Boolean);
  const cmd = parts[0];
  const args = parts.slice(1);
  const currentDir = getCurrentDir();

  switch (cmd) {
    case 'ls':
      return Object.keys(currentDir).join('  ');

    case 'mkdir':
      if (!args[0]) return "Usage: mkdir <dirname>";
      if (currentDir[args[0]]) return "Directory already exists";
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

    case 'rm':
      if (!args[0]) return "Usage: rm <filename>";
      if (currentDir[args[0]] === "file") {
        delete currentDir[args[0]];
        return "";
      } else {
        return "File not found";
      }

    case 'rmdir':
      if (!args[0]) return "Usage: rmdir <dirname>";
      if (currentDir[args[0]] && typeof currentDir[args[0]] === 'object') {
        if (Object.keys(currentDir[args[0]]).length === 0) {
          delete currentDir[args[0]];
          return "";
        } else {
          return "Directory not empty";
        }
      } else {
        return "Directory not found";
      }

    case 'mv':
      if (args.length < 2) return "Usage: mv <src> <dest>";
      const [src, dest] = args;
      if (currentDir[src]) {
        currentDir[dest] = currentDir[src];
        delete currentDir[src];
        return "";
      } else {
        return "Source not found";
      }

    case 'cp':
      if (args.length < 2) return "Usage: cp <src> <dest>";
      const [srcCp, destCp] = args;
      const srcItem = currentDir[srcCp];
      if (!srcItem) return "Source not found";
      currentDir[destCp] = JSON.parse(JSON.stringify(srcItem));
      return "";

    case 'curl':
      if (!args[0]) return "Usage: curl <url>";
      return `Fetched from ${args[0]}:\n{\n  "message": "Hello from ${args[0]}"\n}`;

    case 'clear':
      document.getElementById('terminal').innerHTML = '';
      return "";

    default:
      return "Command not recognized";
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const input = document.getElementById('cliInput');
  const terminal = document.getElementById('terminal');

  input.addEventListener('keydown', function (e) {
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
