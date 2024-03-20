# You Should Go

You Should Go  is a chatroom populated by humans, a host named F.R.I.E.N.D. (Frequently Random Interactive Entity Navigating Dialogues) and a series of AI mimics, who take on the personalities of the human chatters and try to get F.R.I.E.N.D to boot them. 

You Should Go was designed to be a theater piece, where viewers could log on and engage with F.R.I.E.N.D. and evake the mimics in real time. It asks 


## Installation


1. Create an OpenAI API Key [here](https://platform.openai.com/api-keys) . Copy it.

2. Create a .env file in the **server** folder with the following content: 

```
export OpenAI_API="paste-in-your-openAI-API-key"
```

3. Run `nmp install` inside both the **site** and **server** folders. 


## Running the Project

Run `node server.js` in the **server** folder and `yarn dev` in the **site** folder.

## To Do

- [x] limit msg length 
- [x] Style for phones
- [x] Interject ever 5 msgs
- [x] 10th msg : speech mimic after 10th message.
- [ ] Limit/clean up name checker
- [ ] text decay
- [ ] @ the 8 min mark : Audio summary begins to play.
