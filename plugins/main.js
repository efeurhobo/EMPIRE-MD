const config = require('../config');
const { cmd, commands } = require('../command');
const { monospace } = require('../Lib/monospace');
const os = require('os'); // Import the os module

const prefix = config.PREFIX || ".";
const mode = config.MODE || "private";
const botname = "global.botname";



cmd({
    pattern: "file",
    desc: "Get the exact name and location of the command in the repository, so the user can edit it.",
    category: "main",
    filename: __filename,
  },
  async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
      if (!q || q.trim() === "") {
        return reply("*Please provide a command or directory*");
      }

      const commandInfo = commands.find(
        (cmd) => cmd.pattern.toLowerCase() === q.toLowerCase() || (cmd.alias && cmd.alias.includes(q.toLowerCase()))
      );

      if (!commandInfo) {
        return reply("*❌ No such command found.*");
      }

      let output = [];
      output.push(`*🍁 Command:* ${commandInfo.pattern}`);
      if (commandInfo.category) {
        output.push(`*🧩 Category:* ${commandInfo.category}`);
      }
      if (commandInfo.desc) {
        output.push(`*✨ Description:* ${commandInfo.desc}`);
      }
      if (commandInfo.filename) {
        output.push(`*✨ File Name:* ${commandInfo.filename}`);
      }

      return reply(output.join("\n"));
    } catch (e) {
      return reply(`*An error occurred while processing your request.*\n\n_Error:_ ${e.message}`);
    }
  });

cmd({
    pattern: "list",
    desc: "Show all commands and descriptions",
    react: "📜",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, quoted, isCmd, command, args, q, isGroup, sender, pushname, reply }) => {
    try {
        // Format uptime function
        function formatUptime(seconds) {
            const days = Math.floor(seconds / (24 * 60 * 60));
            seconds %= 24 * 60 * 60;
            const hours = Math.floor(seconds / (60 * 60));
            seconds %= 60 * 60;
            const minutes = Math.floor(seconds / 60);
            seconds = Math.floor(seconds % 60);
            return `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }

        // Get current date and time in Nigeria timezone (WAT)
        const now = new Date();
        const date = new Intl.DateTimeFormat('en-GB', {
            timeZone: 'Africa/Lagos',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        }).format(now);

        const time = new Intl.DateTimeFormat('en-GB', {
            timeZone: 'Africa/Lagos',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        }).format(now);

        const uptime = formatUptime(process.uptime());
        const totalCommands = commands.length;

        // Format the command list
        let list = `╭────────────────╮
      𝐄𝐦𝐩𝐢𝐫𝐞_𝐕𝟏
╰────────────────╯

╭────────────────
│ ✭ Prefix: ${monospace(prefix)}
│ ✭ Owner: ${monospace(pushname)}
│ ✭ Commands: ${monospace(totalCommands.toString())}
│ ✭ Uptime: ${monospace(uptime)}
│ ✭ Date: ${monospace(date)}
│ ✭ Time: ${monospace(time)}
╰────────────────
╭────────────────\n`;

        commands.forEach((cmd, index) => {
            if (cmd.pattern) {
                list += `│ ${index + 1} ${monospace(cmd.pattern)}\n`;
            }
        });

        list += `╰────────────────`;

        await conn.sendMessage(from, {
            text: list.trim(),
        }, { quoted: mek });
    } catch (e) {
        console.error(e);
        reply(`${e}`);
    }
});

cmd({
    pattern: "help",
    desc: "Show all commands and descriptions",
    react: "📜",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, quoted, isCmd, command, args, q, isGroup, sender, pushname, reply }) => {
    try {
        // Format uptime function
        function formatUptime(seconds) {
            const days = Math.floor(seconds / (24 * 60 * 60));
            seconds %= 24 * 60 * 60;
            const hours = Math.floor(seconds / (60 * 60));
            seconds %= 60 * 60;
            const minutes = Math.floor(seconds / 60);
            seconds = Math.floor(seconds % 60);
            return `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }

        // Get current date and time in Nigeria timezone (WAT)
        const now = new Date();
        const date = new Intl.DateTimeFormat('en-GB', {
            timeZone: 'Africa/Lagos',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        }).format(now);

        const time = new Intl.DateTimeFormat('en-GB', {
            timeZone: 'Africa/Lagos',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        }).format(now);

        const uptime = formatUptime(process.uptime());
        const totalCommands = commands.length;

        // Format the command list
        let list = `╭────────────────╮
      𝐄𝐦𝐩𝐢𝐫𝐞_𝐕𝟏
╰────────────────╯

╭────────────────
│ ✭ Prefix: ${monospace(prefix)}
│ ✭ Owner: ${monospace(pushname)}
│ ✭ Commands: ${monospace(totalCommands.toString())}
│ ✭ Uptime: ${monospace(uptime)}
│ ✭ Date: ${monospace(date)}
│ ✭ Time: ${monospace(time)}
╰────────────────
╭────────────────\n`;

        commands.forEach((cmd, index) => {
            if (cmd.pattern && cmd.desc) {
                list += `│ ${index + 1} ${monospace(cmd.pattern)}\n│    ${cmd.desc}\n`;
            }
        });

        list += `╰────────────────`;

        await conn.sendMessage(from, {
            text: list.trim(),
        }, { quoted: mek });
    } catch (e) {
        console.error(e);
        reply(`${e}`);
    }
});

cmd({
    pattern: "menu",
    desc: "Get command list",
    react: "🪀",
    category: "main",
    filename: __filename
}, async (conn, mek, m, { from, quoted, sender, pushname, reply }) => {
    try {
        // Utility functions
        function formatUptime(seconds) {
            const days = Math.floor(seconds / (24 * 60 * 60));
            seconds %= 24 * 60 * 60;
            const hours = Math.floor(seconds / (60 * 60));
            seconds %= 60 * 60;
            const minutes = Math.floor(seconds / 60);
            seconds = Math.floor(seconds % 60);
            return `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }

        function formatMemory(bytes) {
            return (bytes / (1024 ** 3)).toFixed(2) + " GB";
        }

        // Time and Date
        const now = new Date();
        const timeZone = 'Africa/Lagos';
        const options = { timeZone, hour12: true };
        const time = now.toLocaleTimeString('en-US', options);
        const date = now.toLocaleDateString('en-US', options);
        const dayOfWeek = now.toLocaleDateString('en-US', { timeZone, weekday: 'long' });

        // System Info
        const uptime = formatUptime(process.uptime());
        const totalMemory = os.totalmem();
        const usedMemory = totalMemory - os.freemem();

        // Bot Info
        const prefix = ".";
        const totalCommands = commands.length;
        const version = "1.3.0";

        // Header
        const header = `${monospace(`
╭─── ${botname} ────
│ Oᴡɴᴇʀ: αѕтяσχ11		
│ Pʀᴇꜰɪx: ${prefix}
│ Pʟᴜɢɪɴꜱ: ${totalCommands}
│ Mᴏᴅᴇ: ᴘᴜʙʟɪᴄ
│ Uᴘᴛɪᴍᴇ: ${uptime}
│ Pʟᴀᴛꜰᴏʀᴍ: ʟɪɴᴜx
│ Mᴇᴍᴏʀʏ: ${formatMemory(usedMemory)}
│ Dᴀʏ: ${dayOfWeek}
│ Dᴀᴛᴇ: ${date}
│ Tɪᴍᴇ: ${time}
│ Vᴇʀꜱɪᴏɴ: ${version}
╰─────────────`)}`;

        // Categorized Commands
        const categorized = commands.reduce((acc, cmd) => {
            if (cmd.pattern && !cmd.dontAddCommandList) {
                if (!acc[cmd.category]) acc[cmd.category] = [];
                acc[cmd.category].push(cmd.pattern);
            }
            return acc;
        }, {});

        const formatCategory = (category, cmds) => {
            const title = `${monospace(`╭──── ${category.toUpperCase()} ────`)}\n`;
            const body = cmds.map((cmd, idx) => `│ ${idx + 1}· ${monospace(prefix + cmd)}`).join('\n');
            const footer = `${monospace("╰────────────")}\n`;
            return `${title}${body}\n${footer}`;
        };

        // Generate Menu
        let menu = `${header}\n\n`;
        for (const [category, cmds] of Object.entries(categorized)) {
            menu += formatCategory(category, cmds);
        }

        // Send Menu
        await conn.sendMessage(from, { text: menu.trim() }, { quoted: mek });
    } catch (err) {
        console.error(err);
        reply(`An error occurred: ${err.message}`);
    }
});

cmd({
    pattern: "category",
    desc: "Show all commands and their categories",
    react: "📜",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, quoted, isCmd, command, args, q, isGroup, sender, pushname, reply }) => {
    try {
        // Format uptime function
        function formatUptime(seconds) {
            const days = Math.floor(seconds / (24 * 60 * 60));
            seconds %= 24 * 60 * 60;
            const hours = Math.floor(seconds / (60 * 60));
            seconds %= 60 * 60;
            const minutes = Math.floor(seconds / 60);
            seconds = Math.floor(seconds % 60);
            return `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }

        // Get current date and time in Nigeria timezone (WAT)
        const now = new Date();
        const date = new Intl.DateTimeFormat('en-GB', {
            timeZone: 'Africa/Lagos',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        }).format(now);

        const time = new Intl.DateTimeFormat('en-GB', {
            timeZone: 'Africa/Lagos',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        }).format(now);

        const uptime = formatUptime(process.uptime());
        const totalCommands = commands.length;

        // Format the command list
        let list = `╭────────────────╮
      𝐄𝐦𝐩𝐢𝐫𝐞_𝐕𝟏
╰────────────────╯

╭────────────────
│ ✭ Prefix: ${monospace(prefix)}
│ ✭ Owner: ${monospace(pushname)}
│ ✭ Commands: ${monospace(totalCommands.toString())}
│ ✭ Uptime: ${monospace(uptime)}
│ ✭ Date: ${monospace(date)}
│ ✭ Time: ${monospace(time)}
╰────────────────
╭────────────────\n`;

        commands.forEach((cmd, index) => {
            if (cmd.pattern && cmd.category) {
                list += `│ ${index + 1} ${monospace(cmd.pattern)}\n│    Category: ${cmd.category}\n`;
            }
        });

        list += `╰────────────────`;

        await conn.sendMessage(from, {
            text: list.trim(),
        }, { quoted: mek });
    } catch (e) {
        console.error(e);
        reply(`${e}`);
    }
});
