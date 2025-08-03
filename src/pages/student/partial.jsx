import React, {useState} from "react";
import Head from "../../layout/head";
import Content from "../../layout/content";
import {
    Block,
    BlockBetween,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    Button,
    Icon,
    PreviewCard
} from "../../components";
import {Steps, StepsProvider, useSteps} from "react-step-builder";
import FormPersonal from "./FormPersonal";
import FormActivity from "./FormActivity";
import {useForm} from "react-hook-form";
import FormParent from "./FormParent.jsx";

export const Add = () => {
    const [sm, updateSm] = useState(false);
    const [formData, setFormData] = useState({
        name: ''
    })
    const methods = useForm()
    const handleReset = () => {
        setFormData({
            name: ''
        })
        methods.reset()
    }
    return (
        <React.Fragment>
            <Head title="Tambah Siswa" />
            <Content page={"component"}>
                <Block size="lg">
                    <BlockHead>
                        <BlockBetween>
                            <BlockHeadContent>
                                <BlockTitle tag="h5">Tambah Siswa</BlockTitle>
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
                                                        onClick={() => alert('testing')}>
                                                    <Icon name="save"></Icon>
                                                    <span>SIMPAN</span>
                                                </Button>
                                            </li>
                                            <li>
                                                <Button color="danger" size={"sm"} outline className="btn-white"
                                                        onClick={() => handleReset()}>
                                                    <Icon name="reload"></Icon>
                                                    <span>RESET</span>
                                                </Button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </BlockHeadContent>
                        </BlockBetween>
                    </BlockHead>
                    <PreviewCard>
                        <StepsProvider>
                            <Step formData={formData} setFormData={setFormData} methods={methods}/>
                        </StepsProvider>
                    </PreviewCard>
                </Block>
            </Content>
        </React.Fragment>
    )
}



const Step = ({formData, setFormData, methods}) => {
    const { prev, next, current } = useSteps();
    return (
        <div className="nk-wizard nk-wizard-simple is-alter wizard clearfix">
            <div className="steps clearfix">
                <ul>
                    <li className={current >= 1 ? "first done" : "first"}>
                        <a href={"#"} onClick={(ev) => ev.preventDefault()}>
                            <span className="number">01</span> <h5>Informasi Pribadi</h5>
                        </a>
                    </li>
                    <li className={current >= 2 ? "first done" : "first"}>
                        <a href={"#"} onClick={(ev) => {
                            ev.preventDefault()
                            next()
                        }}>
                            <span className="number">02</span> <h5>Informasi Orangtua</h5>
                        </a>
                    </li>
                    <li className={current >= 3 ? "first done" : "first"}>
                        <a href={"#"} onClick={(ev) => ev.preventDefault()}>
                            <span className="number">02</span> <h5>Aktifitas Siswa</h5>
                        </a>
                    </li>
                </ul>
            </div>
            <Steps>
                <FormPersonal next={next} formData={formData} setFormData={setFormData} methods={methods}/>
                <FormParent next={next} formData={formData} setFormData={setFormData} methods={methods}/>
                <FormActivity prev={prev} next={next} formData={formData} setFormData={setFormData} />
                <div>
                    <h1>Step 2</h1>
                    <p>
                        No more magical state handling methods or props receiving. All the
                        data you entered is here because App component is still alive.
                    </p>
                </div>
            </Steps>
        </div>
    )
}