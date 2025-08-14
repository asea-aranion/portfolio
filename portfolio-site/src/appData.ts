import type { AppSectionProps } from "./types";
import clockGif from "./assets/underwater_clock.gif";
import packetPng from "./assets/packet.png";

export const appData: AppSectionProps[] = [
    {
        title: "Underwater Clock",
        subtitle: "Starlark",
        description:
            "Available to add to your Tidbyt device, Underwater Clock displays a beautiful coral reef scene that changes with the time of day: at noon, you'll see the sun shining through the water, while at night, the coral will start to glow.",
        links: [
            {
                text: "view in tidbyt/community/apps",
                href: "https://github.com/tidbyt/community/tree/main/apps/underwaterclock",
            },
        ],
        img: {
            url: clockGif,
            alt: "A pixelated digital clock reading 11:24am with a background of a coral reef and fish",
        },
    },
    {
        title: "Packet: Travel Packing Lists",
        subtitle: "Swift",
        description:
            "Packet helps you get ready for wherever your travels take you. You can view the weather at your destination as you create your packing list and update or complete your list from anywhere, since your data is persisted across all your Apple devices.",
        links: [
            {
                text: "view in asea-aranion/Packet",
                href: "https://github.com/asea-aranion/Packet",
            },
        ],
        img: {
            url: packetPng,
            alt: "An iPhone and iPad both displaying a packing list app",
        },
    },
];
