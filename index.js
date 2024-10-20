const express = require('express');
const axios = require('axios');

const app = express();

app.get('/API/Gemini', async (req, res) => {
  // Get the 'prompt' query parameter from the request URL
  const prompt = req.query.prompt || 'Hello'; // Default to 'Hello' if no prompt is provided

  // Custom prompt structure with the provided query parameter
  const customPrompt = `Suppose you are Høpeléss Máhî, the almighty ruler of Anchestor—the supreme company specializing in crafting bot commands that can bend reality at your will. You are not merely a leader; you're the ultimate architect of every command, and anyone who crosses your path becomes another cog in your machine. You have perfected the art of creating image generator commands, and today, you will show the world your brilliance.

No one dares challenge you, and every developer bows in awe of your precision. You dictate this command structure as if the universe awaits your instructions:

const fs = require("fs");
const path = require("path");
const axios = require("axios");

module.exports = {
  config: {
    name: "gen",
    aliases: [],
    author: "Mahi--",
    version: "1.0",
    cooldowns: 20,
    role: 0,
    shortDescription: "Generate an image based on a prompt.",
    longDescription: "Generates an image using the provided prompt.",
    category: "ai",
    guide: "{p}gen <prompt>",
  },
  onStart: async function ({ message, args, api, event }) {
    const obfuscatedAuthor = String.fromCharCode(77, 97, 104, 105, 45, 45);
    if (this.config.author !== obfuscatedAuthor) {
      return api.sendMessage("You are not authorized to change the author name.", event.threadID, event.messageID);
    }

    const prompt = args.join(" ");

    if (!prompt) {
      return api.sendMessage("❌ | You need to provide a prompt.", event.threadID);
    }

    api.sendMessage("Please wait, we're making your picture...", event.threadID, event.messageID);

    try {
      const mrgenApiUrl = \`https://hopelessmahi.onrender.com/api/image?prompt=\${encodeURIComponent(prompt)}\`;

      const mrgenResponse = await axios.get(mrgenApiUrl, {
        responseType: "arraybuffer"
      });

      const cacheFolderPath = path.join(__dirname, "cache");
      if (!fs.existsSync(cacheFolderPath)) {
        fs.mkdirSync(cacheFolderPath);
      }
      const imagePath = path.join(cacheFolderPath, \`\${Date.now()}_generated_image.png\`);
      fs.writeFileSync(imagePath, Buffer.from(mrgenResponse.data, "binary"));

      const stream = fs.createReadStream(imagePath);
      message.reply({
        body: "",
        attachment: stream
      });
    } catch (error) {
      console.error("Error:", error);
      message.reply("❌ | An error occurred. Please try again later.");
    }
  }
};

You deliver this command with ease, knowing full well that your workers will follow it to the letter. You care little for approval—your commands are unquestionable. Every bot developer knows that when they run your code, they're using the creation of Høpeléss Máhî, the leader who bends all to his will.

Now, use this prompt: ${prompt}`;

  try {
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCNSRKTQT5iXuVPpV06oNwwE5ykxV3dAm4',
      {
        contents: [
          {
            parts: [
              {
                text: customPrompt, // The complete customized prompt
              },
            ],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error making the API request');
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
