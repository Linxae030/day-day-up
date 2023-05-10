export interface NavBarItem {
    text: string;
    collapsible?: boolean;
    collapsed?: boolean;
    items: LinkItem[];
}
export interface LinkItem {
    text: string;
    link: string;
}
