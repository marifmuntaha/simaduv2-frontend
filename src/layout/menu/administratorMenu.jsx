const administratorMenu = [
    {
        icon: "monitor",
        text: "Dashboard",
        link: "/",
    },
    {
        icon: "archived",
        text: "Master Data",
        active: false,
        subMenu: [
            {
                text: "Jenjang",
                link: "/master-data/jenjang",
            },
            {
                text: "Tingkat",
                link: "/master-data/tingkat",
            },
            {
                text: "Jurusan",
                link: "/master-data/jurusan",
            },
            {
                text: "Tahun Pelajaran",
                link: "/master-data/tahun-pelajaran",
            },
        ],
    },
    {
        icon: "building",
        text: "Data Lembaga",
        link: "/data-lembaga",
    },
    {
        icon: "users",
        text: "Data Pengguna",
        link: "/data-pengguna",
    },
]

export default administratorMenu;