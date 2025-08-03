import React from "react";
import {Col, Row, RSelect} from "../../components";

const FormParent = ({formData, setFormData, methods, ...props}) => {
    const { register, handleSubmit, formState: { errors } } = methods;
    const statusParent = [
        {value: 1, label: "Masih Hidup"},
        {value: 2, label: "Meninggal"},
        {value: 3, label: "Lainnya"},
    ]
    const onInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const onSubmit = () => {
        props.next()
    }
    return (
        <React.Fragment>
            <form className="content clearfix" onSubmit={handleSubmit(onSubmit)}>
                <Row className="gy-4">
                    <Col md="6">
                        <div className="form-group">
                            <label className="form-label" htmlFor="statusFather">Jenis Kelamin</label>
                            <div className="form-control-wrap">
                                <RSelect
                                    id="statusFather"
                                    options={statusParent}
                                    value={statusParent?.find((e) => e.value === formData.statusFather)}
                                    onChange={(val) => {
                                        setFormData({...formData, statusFather: val.value})
                                    }}
                                    placeholder="Pilih Status Ayah"
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md="6">
                        <div className="form-group">
                            <label className="form-label" htmlFor="statusMother">Jenis Kelamin</label>
                            <div className="form-control-wrap">
                                <RSelect
                                    id="statusMother"
                                    options={statusParent}
                                    value={statusParent?.find((e) => e.value === formData.statusMother)}
                                    onChange={(val) => {
                                        setFormData({...formData, statusMother: val.value})
                                    }}
                                    placeholder="Pilih Status Ibu"
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md="6">
                        <div className="form-group">
                            <label className="form-label" htmlFor="name">
                                Nama Lengkap
                            </label>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    id="name"
                                    className="form-control"
                                    placeholder="Ex. Achmad Wikramawardhana"
                                    {...register('name', { required: true })}
                                    onChange={(e) => onInputChange(e)}
                                />
                                {errors.name && <span className="invalid">Kolom tidak boleh kosong</span>}
                            </div>
                        </div>
                    </Col>
                    <Col md="6">
                        <div className="form-group">
                            <label className="form-label" htmlFor="name">
                                Nama Lengkap
                            </label>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    id="name"
                                    className="form-control"
                                    placeholder="Ex. Achmad Wikramawardhana"
                                    {...register('name', { required: true })}
                                    onChange={(e) => onInputChange(e)}
                                />
                                {errors.name && <span className="invalid">Kolom tidak boleh kosong</span>}
                            </div>
                        </div>
                    </Col>
                </Row>
            </form>
        </React.Fragment>
    )
}

export default FormParent;