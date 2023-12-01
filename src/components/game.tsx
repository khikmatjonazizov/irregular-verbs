import React, {useCallback, useEffect, useMemo, useState} from "react";
import data from '../i-verbs.json'
import {IrregularVerbQuiz, VerbForms} from "./lib/game";
import {Alert, Button, Form, Input, Space} from "antd";

interface GameProps {
    page: string;
    onChange: (correctAnswersCount: number, incorrectAnswersCount: number) => void;
}

const page1 = data[0]
const page2 = data[1]
const all = [...data[0], ...data[1]]

const getData = (page: string): VerbForms[] => {
    switch (page) {
        case "page2":
            return page2 as VerbForms[];
        case "all":
            return all as VerbForms[];
        case "page1":
        default:
            return page1 as VerbForms[]
    }
}

export const Game: React.FC<GameProps> = ({page, onChange}) => {
    const verbs: VerbForms[] = [["go", "went", "gone"], ["take", "took", "taken"], ["do", "did", "done"], ["abide", "abided/abode", "abided/abode"] /* test */];
    // const verbs: VerbForms[] = getData(page);
    const [isFinished, setIsFinished] = useState(false)
    const quiz = useMemo(() => new IrregularVerbQuiz(verbs), [page, isFinished])
    const [form] = Form.useForm();

    const [currentQuestion, setCurrentQuestion] =
        useState<ReturnType<typeof quiz.getNextQuestion> | null>(null)

    const [isPending, setIsPending] = useState(false)

    const [alert, setAlert] = useState({
        isVisible: false,
        message: ''
    })

    const carryOnGame = () => {
        const nextQuestion = quiz.getNextQuestion()

        if (nextQuestion) {
            setCurrentQuestion(nextQuestion)
            form.resetFields()
            return
        }

        setIsFinished(true)
    }

    const handleAnswerSubmit = ({userAnswer}: { userAnswer: string }): void => {
        if (isPending || isFinished) return;

        if (currentQuestion) {
            const {
                isCorrect,
                correctAnswersCount,
                incorrectAnswersCount
            } = quiz.submitAnswer(userAnswer, currentQuestion.hiddenForm)
            onChange(correctAnswersCount, incorrectAnswersCount)

            if (!isCorrect) {
                setAlert({
                    isVisible: true,
                    message: `Your answer: "${userAnswer}", correct answer: "${currentQuestion.hiddenForm}"`
                })
                setIsPending(true)

                setTimeout(() => {
                    setAlert({isVisible: false, message: ''})
                    setIsPending(false)

                    carryOnGame()
                }, 4000)
                return;
            }

            carryOnGame()
        }
    };

    const resetGame = () => {
        onChange(0, 0)
        setIsFinished(false)
        setCurrentQuestion(quiz.getNextQuestion())
        form.resetFields()
    }

    useEffect(() => {
        if(currentQuestion) {
            resetGame()
        } else {
            setCurrentQuestion(quiz.getNextQuestion())
        }
    }, [page]);

    return (
        <div>
            {
                currentQuestion && <p>{currentQuestion.displayed.join(' ')}</p>
            }

            <Form
                name="game"
                layout="vertical"
                autoComplete="off"
                onFinish={handleAnswerSubmit}
                disabled={isFinished}
                form={form}
            >
                <Form.Item name="userAnswer" label="Answer" rules={[{required: true}]}>
                    <Input autoFocus/>
                </Form.Item>
                <Form.Item>
                    <Space>
                        <Button htmlType="submit">Submit</Button>
                    </Space>
                </Form.Item>
            </Form>
            {
                alert.isVisible && <Alert message={alert.message} type="error"/>
            }
            {
                isFinished && <h1>Game over <Button onClick={resetGame}>Reset</Button></h1>
            }
        </div>
    );
}
