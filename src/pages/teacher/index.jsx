import React, {useEffect, useState} from "react";
import Head from "../../layout/head";
import Content from "../../layout/content";
import {
    Block,
    BlockBetween,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    Button, Icon,
    PreviewCard,
    ReactDataTable
} from "../../components";
import {Badge, ButtonGroup, Spinner} from "reactstrap";
import {get as getTeacher, destroy as destoryTeacher} from "../../utils/api/teacher"
import Partial from "./partial";
import moment from "moment";
import 'moment/locale/id'

const Teacher = () => {
    const [sm, updateSm] = useState(false);
    const [refreshData, setRefreshData] = useState(true);
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [teachers, setTeachers] = useState([]);
    const [teacher, setTeacher] = useState(null);
    const Column = [
        {
            name: "Lembaga",
            selector: (row) => row.institution,
            sortable: false,
            // hide: 370,
            cell: (row) => {
                return row.institution.map((item) => {
                    return item.alias + ' | '
                });
            }

        },
        {
            name: "PegID",
            selector: (row) => row.pegId,
            sortable: false,
            // hide: 370,

        },
        {
            name: "Nama",
            selector: (row) => row.fullName,
            sortable: false,
            // hide: 370,
            // width: "300px",
        },
        {
            name: "Tempat, Tanggal Lahir",
            selector: (row) => row.birthplace + ', ' + moment(row.birthdate, 'YYYY-MM-DD').locale('id').format('DD MMMM YYYY'),
            sortable: false,
            // hide: 370,
            // width: "300px",
        },
        {
            name: "Jenis Kelamin",
            selector: (row) => row.gender,
            sortable: false,
            // hide: 370,
            // width: "300px",
            cell: (row) => {
                return row.gender === 'L' ? 'Laki-laki' : 'Perempuan'
            }
        },
        {
            name: "Aktif",
            selector: (row) => row.active,
            sortable: false,
            // hide: 370,
            cell: (row) => (
                <Badge pill color={row.active ? 'success' : 'danger'}> {row.active ? 'Ya' : 'Tidak'}</Badge>
            )

        },
        {
            name: "Aksi",
            selector: (row) => row.id,
            sortable: false,
            // hide: "md",
            width: "150px",
            cell: (row) => (
                <ButtonGroup size="sm">
                    <Button outline color="warning" onClick={() => {
                        setTeacher(row);
                        setModal(true);
                    }}><Icon name="pen"/></Button>
                    <Button outline color="danger" onClick={() => {
                        setLoading(row.id)
                        destoryTeacher(row.id).then(() => {
                            setLoading(false);
                            setRefreshData(true);
                        }).catch(() => setLoading(false))
                    }}>{loading === row.id ? <Spinner size="sm"/> : <Icon name="trash"/>}</Button>
                </ButtonGroup>
            )
        },
    ];

    useEffect(() => {
        refreshData && getTeacher().then((resp) => {
            setTeachers(resp)
            setRefreshData(false);
        }).catch(() => setLoading(false));
    }, [refreshData])
    return (
        <React.Fragment>
            <Head title="Data Guru"/>
            <Content>
                <Block size="lg">
                    <BlockHead>
                        <BlockBetween>
                            <BlockHeadContent>
                                <BlockTitle tag="h5">Data Guru</BlockTitle>
                                <p>
                                    Textual form controls—like <code className="code-tag">&lt;input&gt;</code>s,{" "}
                                    <code className="code-tag">&lt;select&gt;</code>s, and{" "}
                                </p>
                            </BlockHeadContent>
                            <BlockHeadContent>
                                <div className="toggle-wrap nk-block-tools-toggle">
                                    <Button
                                        className={`btn-icon btn-trigger toggle-expand me-n1 ${sm ? "active" : ""}`}
                                        onClick={() => updateSm(!sm)}
                                    >
                                        <Icon name="menu-alt-r"></Icon>
                                    </Button>
                                    <div className="toggle-expand-content" style={{display: sm ? "block" : "none"}}>
                                        <ul className="nk-block-tools g-3">
                                            <li>
                                                <Button color="primary" size={"sm"} outline className="btn-white"
                                                        onClick={() => setModal(true)}>
                                                    <Icon name="plus"></Icon>
                                                    <span>TAMBAH</span>
                                                </Button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </BlockHeadContent>
                        </BlockBetween>
                    </BlockHead>
                    <PreviewCard>
                        <ReactDataTable data={teachers} columns={Column} pagination progressPending={refreshData}/>
                    </PreviewCard>
                    <Partial modal={modal} setModal={setModal} teacher={teacher} setTeacher={setTeacher}
                             setRefreshData={setRefreshData}/>
                </Block>
            </Content>
        </React.Fragment>
    )
}

export default Teacher;