export type VerbForms = [string, string, string];

export class IrregularVerbQuiz {
    private readonly verbs: VerbForms[];
    private currentIndex: number;
    public correctAnswersCount: number;
    public incorrectAnswersCount: number;

    constructor(verbs: VerbForms[]) {
        this.verbs = [...verbs];
        this.currentIndex = 0;
        this.correctAnswersCount = 0;
        this.incorrectAnswersCount = 0;
    }

    public getNextQuestion() {
        console.log(`currentIndex: ${this.currentIndex}`, `length: ${this.verbs.length}`)
        if (this.currentIndex >= this.verbs.length) {
            return null; // Все глаголы использованы
        }

        const verb = this.verbs[this.currentIndex];
        this.currentIndex++;

        const hiddenIndex = Math.floor(Math.random() * verb.length);
        const displayed = [...verb];
        const hiddenForm = displayed.splice(hiddenIndex, 1)[0];
        displayed.splice(hiddenIndex, 0, '...');

        return {displayed, hiddenForm};
    }

    public submitAnswer(userAnswer: string, hiddenForm: string) {
        let isCorrect = false;
        const standardUserAnswer = userAnswer.toLowerCase().trim()
        const standardHiddenForm = hiddenForm.toLowerCase().trim()

        if (hiddenForm.includes('/')) {
            isCorrect = standardUserAnswer === standardHiddenForm ||
                standardUserAnswer.includes(standardHiddenForm.split('/')[0]) ||
                standardUserAnswer.includes(standardHiddenForm.split('/')[1]) ||
                standardUserAnswer.includes(standardHiddenForm.split('/')[2])

        } else {
            isCorrect = standardUserAnswer === standardHiddenForm
        }
        if (isCorrect) {
            this.correctAnswersCount++
        } else {
            this.incorrectAnswersCount++
        }

        return {
            isCorrect,
            incorrectAnswersCount: this.incorrectAnswersCount,
            correctAnswersCount: this.correctAnswersCount
        };
    }
}
