module.exports = {
    types: [
        { value: "💻coding", name: "💻coding 练习代码" },
        { value: "📔notes", name: "📔notes 做笔记" },
        { value: "🐛fix", name: "🐛fix 改bug" },
        { value: "📝docs", name: "📝docs: 更新文档" },
        { value: "🛠️utils", name: "🛠️utils: 添加全局工具" },
        { value: "♻️refactor", name: "♻️refactor: 代码重构，注意和特性、修复区分开" },
        { value: "✅test", name: "✅test: 添加一个测试" },
        { value: "🔧chore", name: "🔧chore: 开发工具变动(构建、脚手架工具等)" },
        { value: "🚬init", name: "🚬init: 模块初始化" },
        { value: "⚙config", name: "⚙config: 配置文件" },
        { value: "🚧WIP", name: "🚧WIP: 功能开发" },
    ],
    scopes: [],
    // it needs to match the value for field type. Eg.: 'fix'
    scopeOverrides: {
        "💻coding": [
            { name: "JavaScript" },
            { name: "TypeScript" },
            { name: "CSS" },
            { name: "Vue" },
            { name: "React" },
        ],
        "📔notes": [
            { name: "tinybook" },
            { name: "interview" },
            { name: "articles" },
            { name: "type-challenge" },
        ],
        "📝docs": [{ name: "tinybook" }, { name: "interview" }, { name: "articles" }],
        "🛠️utils": [{ name: "tinybook" }, { name: "interview" }, { name: "articles" }],
    },
    // override the messages, defaults are as follows
    messages: {
        type: "选择一种你的提交类型:",
        scope: "选择一个scope (可选):",
        // used if allowCustomScopes is true
        customScope: "Denote the SCOPE of this change:",
        subject: "短说明:\n",
        body: '长说明，使用"|"换行(可选)：\n',
        breaking: "非兼容性说明 (可选):\n",
        footer: "关联关闭的issue，例如：#31, #34(可选):\n",
        confirmCommit: "确定提交说明?",
    },
    allowCustomScopes: true,
    allowBreakingChanges: ["feature", "fix"],
    // limit subject length
    subjectLimit: 100,
};
