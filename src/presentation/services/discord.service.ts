
export class DiscordService {

    private readonly discordWebHookUrl: string;

    constructor(){
        this.discordWebHookUrl = process.env.DISCORD_WEBHOOK_URL!;
    }

    async notify(message: string){
        
        const body = {
            content: message,
            embeds: [
                {
                    image: {
                        url: 'https://media.giphy.com/media/fUQ4rhUZJYiQsas6WD/giphy.gif?cid=790b7611ttz6q3syrhimgkhccjfrapbtjylr1a6ng5tm3rls&ep=v1_gifs_trending&rid=giphy.gif&ct=g'
                    }
                }
            ]
        }

        const response = await fetch(this.discordWebHookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })

        if(!response.ok){
            console.log('Error sending message to discord');
            return false;
        }

        return true;

    }



}