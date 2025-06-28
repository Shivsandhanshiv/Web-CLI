# Web CLI – Browser-Based Command Line Emulator

A simple in-browser CLI emulator that supports basic Unix-style commands using a simulated in-memory file system.

## Supported Commands

- `mkdir <dir>` – Create directory
- `touch <file>` – Create file
- `cd <dir>` – Change directory
- `ls` – List contents
- `rm <file>` – Delete file
- `rmdir <dir>` – Remove directory
- `mv <src> <dest>` – Rename/move
- `cp <src> <dest>` – Copy
- `curl <url>` – Simulate API fetch
- Invalid commands return: `Command not recognized.`

## How to Run

1. Clone or download the repo
2. Open `index.html` in any modern browser
3. Start typing commands in the CLI input

##  Built With

- HTML, CSS, JavaScript
- Simulated file system in-memory

