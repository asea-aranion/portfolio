export interface AppLinkProps {
    text: string;
    href: string;
    external: boolean;
}

export interface AppSectionProps {
    title: string;
    subtitle: string;
    description: string;
    links: AppLinkProps[];
    img: {
        url: string;
        alt: string;
    };
}
