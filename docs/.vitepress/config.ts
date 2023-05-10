import { tinybookItems, interviewItems, articlesItems } from "../notes";
import { tc } from "../code";
const nav = [
    { text: "代码", link: "/code/" },
    {
        text: "笔记",
        link: "/notes/",
        // items: [
        //     { text: "Item A", link: "/item-1" },
        //     { text: "Item B", link: "/item-2" },
        //     { text: "Item C", link: "/item-3" }
        // ]
    },
];

const sidebar = {
    "/code/": [
        {
            text: "code 导航",
            items: [{ text: "目录", link: "/code/" }],
        },
        {
            text: tc.title,
            collapsible: true,
            collapsed: false,
            items: tc.items,
        },
        {
            text: "JavaScript",
            collapsible: true,
            collapsed: false,
            items: [
                {
                    text: "手写手写",
                    collapsible: true,
                    collapsed: true,
                    items: [],
                },
                { text: "面试题", collapsible: true, collapsed: true, items: [] },
            ],
        },
        {
            text: "CSS",
            collapsible: true,
            collapsed: false,
            items: [
                { text: "Introduction", link: "/code/interview" },
                { text: "Getting Started", link: "/code/tinybook/tinybook" },
            ],
        },
    ],
    "/notes/": [
        {
            text: "notes 导航",
            items: [{ text: "目录", link: "/notes/" }],
        },
        {
            text: "掘金小册学习之路",
            collapsible: true,
            collapsed: false,
            items: tinybookItems,
        },
        {
            text: "闲着没事写的文章",
            collapsible: true,
            collapsed: false,
            items: articlesItems,
        },
        {
            text: "面试题收集",
            collapsible: true,
            collapsed: false,
            items: interviewItems,
        },
    ],
};

const socialLinks = [
    {
        icon: "github",
        link: "https://github.com/Linxaee",
    },
];
export default {
    base: "/day-day-up/",
    title: "Linxae 的学习小站",
    themeConfig: {
        logo: "/logo.jpg",
        nav,
        sidebar,
        socialLinks,
        editLink: {
            pattern: "https://github.com/Linxaee/day-day-up/tree/master/docs/:path",
            text: "在 GitHub 上查看此页面 🔎",
        },
    },
    lastUpdated: true,
};
