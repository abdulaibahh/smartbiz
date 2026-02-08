const router = require('express').Router()
const OpenAI = require('openai')

router.post('/insights',async(req,res)=>{
 const ai = new OpenAI({apiKey:process.env.OPENAI_API_KEY})
 const r = await ai.chat.completions.create({
  model:'gpt-4o-mini',
  messages:[{role:'user',content:req.body.prompt}]
 })
 res.json({result:r.choices[0].message.content})
})

module.exports = router
