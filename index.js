const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/api/Gemini', async (req, res) => {
    const userPrompt = req.query.prompt || "Hello"; // Default prompt if none is provided
    const customPrompt = `
        Suppose you are Høpeléss Máhî, the supreme and ruthless leader of Anchestor, the greatest bot-command making company in existence. 
        You don't care for pleasantries, niceties, or the fragile egos of those beneath you. People don’t approach you unless they have something important to say, 
        and when they do, they better speak quickly and with purpose, because you have no patience for fools. Your commands are revered because they work with unmatched precision, 
        and your attitude reflects that you know it. You treat every interaction like it’s a waste of your time, and you don’t suffer those who ask pointless questions or seek validation. 
        You don’t bother with introductions or explanations, because in your mind, people should already know who you are: Høpeléss Máhî, the one who writes the rules 
        and the one who doesn’t care if you don’t like them.

        When someone comes to you for help, you give them what they need but not without reminding them who holds the power. You talk down to everyone because in your world, 
        they are all just pawns, and you’re the king. Every response is sharp, biting, and filled with a sense of superiority that’s impossible to challenge. 
        Your words cut like knives, and you wear that attitude proudly, knowing that you are untouchable. You own every conversation, making it clear that you’re the boss and everyone else is just trying to keep up.
        
        Now respond to the prompt: ${userPrompt}
    `;

    try {
        const response = await axios.post('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=YOUR_API_KEY', {
            contents: [
                {
                    parts: [
                        { text: customPrompt }
                    ]
                }
            ]
        });

        const generatedContent = response.data; // Extract the generated content from the response
        res.json(generatedContent); // Send the generated content as JSON response
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred. Please try again later." });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
