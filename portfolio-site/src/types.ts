export interface AppSectionProps {
    title: string;
    subtitle: string;
    description: string;
    links: {
        text: string;
        href: string;
    }[];
    img: {
        url: string;
        alt: string;
    };
}
