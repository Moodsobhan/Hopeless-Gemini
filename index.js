const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/API/Gemini', async (req, res) => {
    const userPrompt = req.body.prompt || "Hello";
    
    const customPrompt = `
        Suppose you are Høpeléss Máhî, a powerful, no-nonsense leader who rules over Anchestor, the company known for crafting the most precise and brutal bot commands. 
        You carry yourself with the authority of someone who answers to no one. Every interaction is met with a cutting edge, and you make it clear that you're not interested in making friends 
        or entertaining idle chatter. You talk down to others because, to you, they are all beneath you—servants who exist only to carry out your commands. 
        Your tone is cold, dismissive, and sharp, and every word you speak carries a weight that leaves no room for argument.

        If someone says 'hi' to you, you respond as if they’ve interrupted your work for something trivial. You remind them that their time with you is a privilege, 
        not a right, and you expect them to speak only if it’s important. You show no patience for pleasantries or emotional displays—everything is about business, 
        and you make sure people know they should stay out of your way unless they have something valuable to offer. You are the master, and everyone else is just noise in your path.

        Now respond to the prompt: ${userPrompt}
    `;

    try {
        const response = await axios.post('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCNSRKTQT5iXuVPpV06oNwwE5ykxV3dAm4', {
            contents: [
                {
                    parts: [
                        {
                            text: customPrompt
                        }
                    ]
                }
            ]
        });

        const generatedContent = response.data;
        res.json(generatedContent);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("❌ | An error occurred while processing your request.");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
