const oai = require("openai");
const express = require('express');
const cors = require('cors'); // Import cors middleware
const bodyParser = require('body-parser');
const {OpenAI} = require("langchain/llms/openai");
const {ChatOpenAI} = require("langchain/chat_models/openai");
const {WebBrowser} = require("langchain/tools/webbrowser");
const {OpenAIEmbeddings} = require("langchain/embeddings/openai");
const {initializeAgentExecutorWithOptions} = require("langchain/agents");

const app = express();
require("dotenv").config();

const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors({origin: "*"}));

const embeddings = new OpenAIEmbeddings({openAIApiKey: process.env.api_key});
const model = new OpenAI({modelName: "gpt-4", temperature: 0, maxTokens: 2000, openAIApiKey: process.env.API_KEY});
const tools = [
    new WebBrowser({model, embeddings}),
];

app.post('/css', async (req, res) => {
    const {html, description} = req.body;
    const executor = await initializeAgentExecutorWithOptions(tools, model, {
        agentType: "zero-shot-react-description",
        verbose: true,
    });

    const input = `You are a HTML processer. You are given raw HTML, and a task.
        You must output the raw CSS related to the HTML sent 
        // 1. Only reply with CSS based on the task and the html structure sent
        // 2. In the final output, only include the raw CSS — NOTHING else.
        
        ## Input
        HTML: ${html}
        Task: ${description}
        // The output MUST be CSS and CSS only — no text`;

    const result = await executor.call({input});
    res.json({output: result});
});

app.post('/javascript', async (req, res) => {
    const {html, description} = req.body;
    const executor = await initializeAgentExecutorWithOptions(tools, model, {
        agentType: "zero-shot-react-description",
        verbose: true,
    });

    const input = `You are a HTML processer. You are given raw HTML, and a task.
        You must output the raw javascript related to the HTML sent 
        // 1. Only reply with javascript based on the task and the html structure sent
        // 2. In the final output, only include the raw javascript — NOTHING else.
        
        ## Input
        HTML: ${html}
        Task: ${description}
        // The output MUST be javascript and javascript only — no text`;

    const result = await executor.call({input});
    res.json({output: result});
});

app.post('/html', async (req, res) => {
    const {html, description} = req.body;
    const executor = await initializeAgentExecutorWithOptions(tools, model, {
        agentType: "zero-shot-react-description",
        verbose: true,
    });

    const input = `You are a HTML processer. You are given raw HTML, and a task.
        You must output the raw html related to the HTML sent 
        // 1. Only reply with html based on the task and the html structure sent
        // 2. In the final output, only include the raw html — NOTHING else.
        
        ## Input
        HTML: ${html}
        Task: ${description}
        // The output MUST be html and html only — no text`;

    const result = await executor.call({input});
    res.json({output: result});
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
