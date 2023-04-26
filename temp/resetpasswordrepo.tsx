export default class ResetPasswordRepo {
    static tokenMap = new Map();
    static emailMap = new Map();
    static populateMap() {
        this.emailMap.set('brandon', 'blui@wpi.edu');
        this.emailMap.set('blui', 'blui@wpi.edu');
    }
}
