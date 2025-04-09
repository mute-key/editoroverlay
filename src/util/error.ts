import { error } from 'console';
import * as vscode from 'vscode';
import { SYSTEM_MESSAGE } from '../constant/config/enum';

class ErrorDecription {
    #configurationSection: string;
    #errorMessage: string;

    constructor(configurationSection: string, errorMessage: string) {
        this.#configurationSection = configurationSection;
        this.#errorMessage = errorMessage;
    }

    get(): { section: string, message: string } {
        return {
            section: this.#configurationSection,
            message: this.#errorMessage
        };
    };
}

class ErrorHelper {
    protected static ignored: boolean = false;
    protected static notified: boolean = false;
    protected static packageName: string;
    protected static errorList: ErrorDecription[] = [];

    protected static configurationSectionList() {
        return this.errorList.map(error => error.get().section);
    };

    protected static ifExtensionName(section: string) {
        if (section.indexOf(this.packageName) !== -1 && section.split('.').length > 2) {
            return section.replace(this.packageName + '.', '');
        } else {
            return section;
        }
    };

    protected static pushErrorMessage() {
        return vscode.window.showErrorMessage(
            SYSTEM_MESSAGE.CONFIGURATION_ERROR, ...['Fix Configuration', 'Ignore']
        );
    };

    protected static userSelect(configurationList: string) {
        return function (selected: string | undefined): boolean {
            if (selected === "Fix Configuration") {
                vscode.commands.executeCommand("workbench.action.openSettings", configurationList);
                return false;
            } else if (selected === "Ignore") {
                return true;
            }
            return true;
        };
    };

    protected static fixConfiguration() {
        return async () => {
            this.ignored = await this.pushErrorMessage().then(this.userSelect(this.configurationSectionList().join(' ')));
        };
    }

    protected static pushMessage(message: string) {
        return () => vscode.window.showInformationMessage(message)?.then(() => {});
    }
}

export default abstract class Error extends ErrorHelper {
    public static configurationUpdated() {
        this.notified = false;
        this.ignored = false;
    }

    public static setPackageName(packageName: string): void {
        this.packageName = packageName;
    };

    public static check(): boolean {
        return this.errorList.length > 0;
    };

    public static register(configurationSection: string, errorMessage: string) {
        return this.errorList.push(new ErrorDecription(configurationSection, errorMessage));
    };

    public static clear(): void {
        this.errorList.splice(0);
    };

    public static notify(timer: number = 0): void {
        if (this.check() && !this.notified && !this.ignored) {
            this.notified = true;
            setTimeout(this.fixConfiguration(), timer);
            return;
        }
        setTimeout(this.pushMessage(SYSTEM_MESSAGE.CONFIURATION_RELOADED), timer);
    };
}