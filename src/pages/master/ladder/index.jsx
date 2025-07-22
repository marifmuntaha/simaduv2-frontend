import React, {useEffect, useState} from "react";
import Head from "../../../layout/head";
import Content from "../../../layout/content";
import {
    BackTo,
    Block,
    BlockBetween,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    Button, Icon,
    PreviewCard,
    ReactDataTable
} from "../../../components";
import {ButtonGroup, Spinner} from "reactstrap";
import {get as getLadder, destroy as destroyLadder} from "../../../utils/api/master/ladder"
import Partial from "./partial";

const Ladder = () => {
    const [sm, updateSm] = useState(false);
    const [refreshData, setRefreshData] = useState(true);
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [ladders, setLadders] = useState([]);
    const [ladder, setLadder] = useState(null);
    const Column = [
        {
            name: "Nama Jenjang",
            selector: (row) => row.name,
            sortable: false,
            // hide: 370,
            // width: "300px",
        },
        {
            name: "Alias",
            selector: (row) => row.alias,
            sortable: false,
            // hide: 370,
            // width: "200px",
        },
        {
            name: "Diskripsi",
            selector: (row) => row.description,
            sortable: false,
            // hide: 370,
            
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
                        setLadder(row);
                        setModal(true);
                    }}><Icon name="pen"/></Button>
                    <Button outline color="danger" onClick={() => {
                        setLoading(row.id)
                        destroyLadder(row.id).then(() => {
                            setLoading(false);
                            setRefreshData(true);
                        }).catch(() => setLoading(false))
                    }}>{loading === row.id ? <Spinner size="sm" /> : <Icon name="trash" /> }</Button>
                </ButtonGroup>
            )
        },
    ];

    useEffect(() => {
        refreshData && getLadder().then((resp) => {
            setLadders(resp)
            setRefreshData(false);
        }).catch(() => setLoading(false));
    }, [refreshData])
    return (
        <React.Fragment>
            <Head title="Data Jenjang"/>
            <Content page="component">
                <BlockHeadContent>
                    <BackTo link="/" icon="arrow-left">
                        Beranda
                    </BackTo>
                </BlockHeadContent>
                <Block size="lg">
                    <BlockHead>
                        <BlockBetween>
                            <BlockHeadContent>
                                <BlockTitle tag="h5">Data Jenjang</BlockTitle>
                                <p>
                                    Textual form controls—like <code className="code-tag">&lt;input&gt;</code>s,{" "}
                                    <code className="code-tag">&lt;select&gt;</code>s, and{" "}
                                    <code className="code-tag">&lt;textarea&gt;</code>s—are styled with the <code>.form-control</code>{" "}
                                    className. Included are styles for general appearance, focus state, sizing, and more. Additional classes
                                    can be used to vary this layout on a per-form basis.
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
                        <ReactDataTable data={ladders} columns={Column} pagination progressPending={refreshData} />
                    </PreviewCard>
                    <Partial modal={modal} setModal={setModal} ladder={ladder} setLadder={setLadder} setRefreshData={setRefreshData}/>
                </Block>
            </Content>
        </React.Fragment>
    )
}

export default Ladder;