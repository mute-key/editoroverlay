import * as vscode from 'vscode';

class ErrorDecription {
    #configurationSection: string;
    #errorMessage: string;

    constructor(configurationSection: string, errorMessage: string) {
        this.#configurationSection = configurationSection;
        this.#errorMessage = errorMessage;
    }

    get = () => {
        return {
            section: this.#configurationSection,
            message: this.#errorMessage
        };
    };
}

class ErrorHelper {
    protected static errorList: ErrorDecription[] = [];

    protected static configurationSectionList = ((): string[] => {
        return this.errorList.map(error => error.get().section);
    })();

    protected static configurationMessageList = ((): string[] => {
        return this.errorList.map(error => error.get().message);
    })();

    protected static resetConfiguration = () => {
        // vscode.workspace.getConfiguration()
        // update to undefined with every config has been set by the user.
    };
}

abstract class Error extends ErrorHelper {
    static #fixConfiguration = (): boolean => {
        vscode.window.showErrorMessage(
            "Invalid Value(s) in Configuration." + '\n' + this.configurationMessageList.join('\n'),
            ...['Fix Configuration', 'Ignore']
        ).then(selection => {
            if (selection === "Fix Configuration") {
                vscode.commands.executeCommand("workbench.action.openSettings", this.configurationSectionList.join(' '));
            }
        });
        return false;  
    };

    public static check = (): boolean => {
        return this.errorList.length > 0;
    };

    public static register = (configurationSection: string, errorMessage: string): number => {
        return this.errorList.push(new ErrorDecription(configurationSection, errorMessage));
    };

    public static clear = (): void => {
        this.errorList.splice(0);
    };

    public static printError = () => {
        console.log('error print', this.errorList.length);
        this.errorList.forEach(el => {
            console.log(el.get());
        });
    };

    public static notify = (timer: number = 0): void => {
        if (this.check()) {
            setInterval(this.#fixConfiguration, timer);
        }
    };
}

export default Error;