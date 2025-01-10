import { GitHubIssuePayload } from "../../interfaces/github-issue.interface";
import { GitHubStarPayload } from "../../interfaces/github-star.interface";


export class GithubService {

    constructor(){}

    onStar(payload: GitHubStarPayload) {

        let message: string = '';

        const {action, sender, repository, starred_at} = payload;

      
        message = `User ${sender.login} ${action} star on ${repository.full_name}`;

        return message;
    }

    onIssue(payload: GitHubIssuePayload) {
        let message: string = '';

        const {action, issue} = payload;

        switch (action) {
            case 'opened':
                message = `An issue was opened with this title ${issue.title}`;
                break;

            case 'closed':
                message = `An issue was closed by ${issue.user.login}`;
                break;

            case 'reopened':
                message = `An issue was reopened by ${issue.user.login}`;
                break;
        
            default:
                message = `Unhandled action for the issue event ${action}`
                break;
        }

        return message;
    }

}