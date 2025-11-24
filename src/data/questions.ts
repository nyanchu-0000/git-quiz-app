import type { QuestionType } from "../types/quiz";

export const quizQuestions: QuestionType[] = [
  {
    id: 1,
    question: "ローカルリポジトリに変更を記録（保存）するために使用するコマンドは？",
    choices: [
      { id: 1, text: "git status" },
      { id: 2, text: "git commit" },
      { id: 3, text: "git add" },
      { id: 4, text: "git push" },
    ],
    correctChoiceId: 2,
    explanation: "変更を確定させるには `git commit` を使用します。その前に `git add` でステージングエリアに追加する必要があります。",
  },
  {
    id: 2,
    question: "現在のワーキングツリーとステージングエリアの状態を確認するコマンドは？",
    choices: [
      { id: 1, text: "git log" },
      { id: 2, text: "git diff" },
      { id: 3, text: "git status" },
      { id: 4, text: "git init" },
    ],
    correctChoiceId: 3,
    explanation: "`git status` は、どのファイルが変更され、ステージングされているか、いないかを表示します。",
  },
  {
    id: 3,
    question: "『コミット』とは、Gitにおいてどのような意味を持つか？",
    choices: [
      { id: 1, text: "リモートリポジトリに変更を送ること" },
      { id: 2, text: "変更履歴の永続的なスナップショット" },
      { id: 3, text: "新しいリポジトリを作成すること" },
      { id: 4, text: "ブランチをマージすること" },
    ],
    correctChoiceId: 2,
    explanation: "コミットは、プロジェクトの特定の時点の完全なスナップショット（変更履歴）を記録する行為です。",
  },
  {
    id: 4,
    question: "ステージングエリア（インデックス）に変更を追加するためのコマンドは？",
    choices: [
      { id: 1, text: "git save" },
      { id: 2, text: "git checkout" },
      { id: 3, text: "git stage" },
      { id: 4, text: "git add" },
    ],
    correctChoiceId: 4,
    explanation: "ファイル名やパスを指定して `git add` を実行することで、ワーキングツリーの変更をステージングエリアに移動させます。",
  },
  {
    id: 5,
    question: "リモートリポジトリから最新の変更を取得するが、ローカルのブランチにはマージしないコマンドは？",
    choices: [
      { id: 1, text: "git fetch" },
      { id: 2, text: "git pull" },
      { id: 3, text: "git clone" },
      { id: 4, text: "git merge" },
    ],
    correctChoiceId: 1,
    explanation: "`git fetch` は変更を取得するだけで、ローカルブランチに統合はしません。`git pull` は取得と統合（マージ）を同時に行います。",
  },
];