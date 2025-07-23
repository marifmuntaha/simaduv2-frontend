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
        active: false,
        subMenu: [
            {
                text: "Daftar Lembaga",
                link: "/data-lembaga",
            },
            {
                text: "Program",
                link: "/data-lembaga/program",
            },
        ],
    },
    {
        icon: "user-list",
        text: "Data Siswa",
        active: false,
        subMenu: [
            {
                text: "Data Siswa",
                link: "/data-siswa",
            },
            {
                text: "Mutasi",
                active: false,
                subMenu: [
                    {
                        text: "Mutasi Keluar",
                        link: "/data-siswa/mutasi/mutasi-keluar",
                    },
                    {
                        text: "Mutasi Masuk",
                        link: "/data-siswa/mutasi/mutasi-masuk",
                    }
                ]
            },
            {
                text: "Akademik",
                active: false,
                subMenu: [
                    {
                        text: "Kenaikan Kelas",
                        link: "/data-siswa/akademik/kenaikan-kelas",
                    },
                    {
                        text: "Kelulusan",
                        link: "/data-siswa/akademik/kelulusan",
                    },
                    {
                        text: "Daftar Alumni",
                        link: "/data-siswa/akademik/daftar-alumni",
                    }
                ]
            }
        ],
    },
    {
        icon: "article",
        text: "Rombongan Belajar",
        link: "/rombongan-belajar",
    },
    {
        icon: "list",
        text: "Data Guru",
        link: "/data-guru",
    },
    {
        icon: "users",
        text: "Data Pengguna",
        link: "/data-pengguna",
    },
]

export default administratorMenu;