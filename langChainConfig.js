const { OpenAI } = require('langchain/llms/openai');

const lc = new OpenAI({
  
  openAIApiKey: 'sk-'
  
});

module.exports = lc;

