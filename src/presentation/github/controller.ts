import { Request, Response } from "express";
import { GithubService } from "../services/github.service";
import { GitHubStarPayload } from "../../interfaces/github-star.interface";
import { GitHubIssuePayload } from "../../interfaces/github-issue.interface";
import { DiscordService } from "../services/discord.service";

export class GithubController {

    constructor(
        private readonly githubService = new GithubService(),
        private readonly discordService = new DiscordService()
    ){}

    webhookHandler = (req: Request, res: Response) => {
        
        const githubEvent = req.header('x-github-event') ?? 'unknown';
        const signature = req.header('x-hub-signature-256') ?? 'unknown'; // Firma
        const payload = req.body;
        let message: string = '';

        
        switch (githubEvent) {
            case 'star':
                message = this.githubService.onStar(payload as GitHubStarPayload);
                break;
            
            case 'issues':
                message = this.githubService.onIssue(payload as GitHubIssuePayload);
                break;

            default:
                message = 'Unknown event ' + githubEvent;
                break;
        }

        this.discordService.notify(message)
            .then((resp) => {
                if(resp === true){
                    res.status(201).send('Accepted');
                }else {
                    res.status(500).send('Error sending notification');
                }
            })
            .catch(() => res.status(500).send('Internal server error'));

        

    }

}