# 🎯 Whack Mini Games

A local collection of classic "Whack" mini games running with an open-source self-hosted Flash Player emulator: [Ruffle](https://ruffle.rs/).

This repository is intended to help preserve and run these legacy Flash games on modern systems. Please support the original publisher/creator whenever possible. 🙂

## 🎮 Included Games

1. Don't Whack Your Teacher *(Unlocked)* (published on [BOX10.COM](https://www.box10.com/))
2. Whack the Thief (published on [BOX10.COM](https://www.box10.com/))
3. Whack Your Boss (created by [Tom Winkler](https://doodie.com/))
4. Whack Your Computer (created by [Tom Winkler](https://doodie.com/))
5. Whack Your Ex (created by [Tom Winkler](https://doodie.com/))

## 📒 Note

🔓 The included version of **Don't Whack Your Teacher** has been patched by me to remove the original site lock, allowing access to all original weapons. No gameplay content has been modified.

## ⚙️ Requirements

- Python 3
- A modern web browser

No Adobe Flash Player is required.

## 🚀 Running

Start the local web server:

```bash
python3 run.py
```

The browser will automatically open:

```text
http://127.0.0.1:8000/index.html
```

If it does not open automatically, visit the address above manually.

Enjoy the games! 🎮

You can stop the server anytime by pressing:

```text
Ctrl + C
```

## ➕ Adding More Games

1. Copy the `.swf` file into the `games` directory.
2. Add a new `<option>` entry to the game selector in `index.html`.

Example:

```html
<option value="games/new-game.swf">
    New Game
</option>
```

## ⚖️ Disclaimer

All game content remains the property of its respective copyright holders. No ownership of the original games is claimed. If you are a copyright holder and would like any content removed, please open an issue or contact me.
