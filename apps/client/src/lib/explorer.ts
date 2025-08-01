export type explorerType = {
    id: number;
    name: string;
    isFolder: boolean;
    items: {
        id: number;
        name: string;
        isFolder: boolean;
        items: {
            id: number;
            name: string;
            isFolder: boolean;
            items: {
                id: number;
                name: string;
                isFolder: boolean;
                items: never[];
            }[];
        }[];
    }[];
};

const explorer: explorerType = {
    id: 1,
    name: "root",
    isFolder: true,
    items: [
        {
            id: 2,
            name: "public",
            isFolder: true,
            items: [
                {
                    id: 3,
                    name: "assets",
                    isFolder: true,
                    items: [
                        {
                            id: 4,
                            name: "image.png",
                            isFolder: false,
                            items: []
                        }
                    ]

                }
            ]
        },
        {
            id: 5,
            name: "src",
            isFolder: true,
            items: [
                {
                    id: 6,
                    name: "app.tsx",
                    isFolder: false,
                    items: []
                },
                {
                    id: 7,
                    name: "main.tsx",
                    isFolder: false,
                    items: []
                }
            ]
        }
    ]
};

export default explorer;