import * as vscode from 'vscode';

class ErrorDecription {
    #configurationSection: string;
    #errorMessage: string;
    // #betterConfigurationSectionName: string;

    constructor(configurationSection: string, errorMessage: string) {
        this.#configurationSection = configurationSection;
        this.#errorMessage = errorMessage;
        // this.#betterSectionName(configurationSection);
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
    protected static packageName: string;

    protected static configurationSectionList = (): string[] => {
        return this.errorList.map(error => error.get().section);
    };

    // protected static configurationMessageList = (): string[] => {
    //     return this.errorList.map(error => error.get().message);
    // };

    protected static ifExtensionName = (section: string): string => {
        if (section.indexOf(this.packageName) && section.split('.').length > 2) {
            return section.replace(this.packageName + '.', '');
        } else {
            return section;
        }
    };
}

export default abstract class Error extends ErrorHelper {
    static #ignored: boolean = false;
    static #notified: boolean = false;

    static #fixConfiguration = (): void => {
        vscode.window.showErrorMessage(
            "Please fix invalid values in configuration.", ...['Fix Configuration', 'Ignore']
        ).then(this.userSelect);
    };
    static userSelect = (selected) => {
        if (selected === "Fix Configuration") {
            vscode.commands.executeCommand("workbench.action.openSettings", this.configurationSectionList().join(' '));
        } else if (selected === "Ignore") {
            this.#ignored = true;
        }
    };

    public static setPackageName = (packageName: string): void => {
        this.packageName = packageName;
    };

    public static check = (): boolean => {
        return this.errorList.length > 0;
    };

    public static register = (configurationSection: string, errorMessage: string) => {
        return this.errorList.push(new ErrorDecription(configurationSection, errorMessage));
    };

    public static clear = (): void => {
        this.errorList.splice(0);
    };

    public static notify = (timer: number = 0): void => {
        if (this.check() && !this.#ignored && !this.#notified) {
            this.#notified = true;
            this.#fixConfiguration();
        }
    };
}