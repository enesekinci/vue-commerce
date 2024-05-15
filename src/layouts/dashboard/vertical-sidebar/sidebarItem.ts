export interface menu {
    header?: string;
    title?: string;
    icon?: string;
    to?: string;
    divider?: boolean;
    chip?: string;
    chipColor?: string;
    chipVariant?: string;
    chipIcon?: string;
    children?: menu[];
    disabled?: boolean;
    type?: string;
    subCaption?: string;
}

const sidebarItem: menu[] = [
    {header: 'Panel'},
    {
        title: 'Panel',
        icon: 'custom-sample',
        to: '/'
    },
    {header: 'Modüller'},
    {
        title: 'Marka',
        icon: 'custom-info-circle',
        to: '/brands',
        chipVariant: 'outlined'
    },
    {
        title: 'Menu levels',
        icon: 'custom-level-1',
        to: '#',
        children: [
            {
                title: 'Level 1',
                to: ''
            },
            {
                title: 'Level 1',
                to: '',
                children: [
                    {
                        title: 'Level 2',
                        to: ''
                    },
                    {
                        title: 'Level 2',
                        to: '/2.2level',
                        children: [
                            {
                                title: 'Level 3',
                                to: ''
                            }
                        ]
                    }
                ]
            }
        ]
    },
];

export default sidebarItem;
