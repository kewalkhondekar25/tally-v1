import { AtSign, 
    Calendar, 
    CheckCheck, 
    ChevronDown, 
    CircleCheckBig, 
    Clock, 
    Hash, 
    Link, Pencil, 
    PenTool, 
    Phone, 
    SquareCheckBig, 
    Star, 
    Upload 
} from "lucide-react";

export const blocks = [
    {
        id: 1,
        name: "short answer",
        icon: Pencil
    },
    {
        id: 2,
        name: "long answer",
        icon: PenTool
    },
    // {
    //     id: 3,
    //     name: "multiple choice",
    //     icon: CircleCheckBig
    // },
    {
        id: 4,
        name: "checkboxes",
        icon: SquareCheckBig
    },
    {
        id: 5,
        name: "dropdown",
        icon: ChevronDown
    },
    // {
    //     id: 6,
    //     name: "multi-select",
    //     icon: CheckCheck
    // },
    {
        id: 7,
        name: "number",
        icon: Hash
    },
    {
        id: 8,
        name: "email",
        icon:AtSign
    },
    // {
    //     id: 9,
    //     name: "dropdown",
    //     icon: ChevronDown
    // },
    {
        id: 10,
        name: "phone",
        icon: Phone
    },
    {
        id: 11,
        name: "link",
        icon: Link
    },
    {
        id: 12,
        name: "file upload",
        icon: Upload
    },
    {
        id: 13,
        name: "date",
        icon: Calendar
    },
    {
        id: 14,
        name: "time",
        icon: Clock
    },
    // {
    //     id: 15,
    //     name: "ratings",
    //     icon: Star
    // },
]