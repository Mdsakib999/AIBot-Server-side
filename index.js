import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';
import cors from 'cors';



dotenv.config();

const configuration = new Configuration({
    apiKey:process.env.OPENAI_KEY,
});


const openAi = new OpenAIApi(configuration);

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'AI Bot server is running!!!'
  })
});


app.post('/', async (req, res) => {
    try {
      const prompt = req.body.prompt;
  
      const response = await openAi.createCompletion({
        model: "text-davinci-003",
        prompt: `${prompt}`,
        temperature: 0, 
        max_tokens: 3000, 
        top_p: 1, 
        frequency_penalty: 0.6, 
        presence_penalty: 0, 
      });
  
      res.status(200).send({
        bot: response.data.choices[0].text
      });
  
    } catch (error) {
      console.error(error)
      res.status(500).send(error || 'Something is wrong');
    }
  })
  
  app.listen(5000, () => console.log('AI server started on http://localhost:5000'));